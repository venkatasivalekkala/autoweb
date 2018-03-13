// @flow
import configureMiddleware from './configureMiddleware'
import configureReducer from './configureReducer'
import { applyMiddleware, createStore } from 'redux'
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'

type Options = {
  initialState: Object,
  platformDeps?: Object,
  platformReducers?: Object,
  platformMiddleware?: Array<Function>,
  platformStoreEnhancers?: Array<Function>,
}

const configureStore = (options: Options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
    platformReducers = {},
    platformStoreEnhancers = [],
  } = options

  const reducer = configureReducer(platformReducers, initialState)

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  )

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware),
      autoRehydrate(),
      ...platformStoreEnhancers,
    ),
  )

  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer').default

        store.replaceReducer(configureReducer(platformReducers, initialState))
      })
  }

  return store
}

export default configureStore
