// @flow
import type { Action } from 'common/types'

export const appActions = {
  APP_STARTED: 'APP_STARTED',
  APP_ERROR: 'APP_ERROR',
  APP_ONLINE: 'APP_ONLINE',
}

// Get Actions
export const appStarted = (): Action => ({
  type: appActions.APP_STARTED,
  payload: { },
})

export const appError = (error: Error): Action => ({
  type: appActions.APP_ERROR,
  payload: { error },
})

export const appOnline = (online: boolean): Action => ({
  type: appActions.APP_ONLINE,
  payload: { online },
})
