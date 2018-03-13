// @flow
import type { Action, State } from './types'
import app from './features/app/reducer'
import config from './features/config/reducer'
import device from './features/device/reducer'
import intl from './features/intl/reducer'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'

// stackoverflow.com/q/35622588/233902

const configureReducer = (platformReducers: Object, initialState: Object) => {
  let reducer = combineReducers({
// NOTE: if you add an entry here, you might want to add one to State type in common/types.js
    ...platformReducers,
    app,
    config,
    device,
    form,
    intl,
    router,
  })
  return reducer
}

export default configureReducer
