// @flow
import { appActions } from './actions'
import type { Action, AppState } from 'common/types'

const initialState = {
  baselineShown: false,
  currentTheme: 'defaultTheme',
  error: null,
  menuShown: false,
  online: false,
  started: false,
}

const reducer = (state: AppState = initialState, action: Action): AppState => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (action.type.endsWith('_FAILURE')) {
    // $FlowFixMe
    state = { ...state, error: action.payload && action.payload.error }
  }

  switch (action.type) {
    case appActions.APP_ERROR:
      return { ...state, error: action.payload.error }

    case appActions.APP_ONLINE:
      return { ...state, online: action.payload.online }

    case appActions.APP_STARTED:
      return { ...state, started: true }

    default:
      return state

  }
}

export default reducer
