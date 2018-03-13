// @flow
import configureEpics from './configureEpics'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'

// Like redux-thunk, but with just one argument for dependencies.
const injectMiddleware = () =>
  ({ dispatch, getState }: any) =>
    (next: any) =>
      (action: any) =>
        next(
          typeof action === 'function'
            ? action({ dispatch, getState })
            : action,
        )

const configureMiddleware = (
  initialState: any,
  platformDeps: any,
  platformMiddleware: any,
) => {
  const rootEpic = configureEpics()
  const epicMiddleware = createEpicMiddleware(rootEpic)

  const middleware = [
    injectMiddleware(),
    epicMiddleware,
    ...platformMiddleware,
  ]


    const logger = createLogger({
      collapsed: true,
    })
    middleware.push(logger)

  if (module.hot && typeof module.hot.accept === 'function') {
      module.hot.accept('./configureEpics', () => {
        const configureEpics = require('./configureEpics').default

        epicMiddleware.replaceEpic(configureEpics())
      })
  }

  return middleware
}

export default configureMiddleware
