// @flow
import _ from 'lodash'
import { Observable } from 'rxjs'
import type { Action } from 'common/types'
import { appActions } from 'common/features/app/actions'

export const intlActions = {
  SET_CURRENT_LOCALE: 'SET_CURRENT_LOCALE',
}

export const setCurrentLocale = (locale: string): Action => ({
  type: intlActions.SET_CURRENT_LOCALE,
  payload: { locale },
})

let messages = { }

export const getLocalizedText = (key: string, ...params: any): string => {
  //
  // sprintf like function that can subsitute %1$s or %1$d with the corresponding argument.
  // e.g. "%1$02d:%2$02d".format(6, 12) would give 06:12
  //
  const subsitute = (str: string): string => {
    // match e.g. %1$s
    const pattern1 = /\%(\d+)\$s/g // eslint-disable-line
    // match e.g. %1$03d
    const pattern2 = /\%(\d+)\$(\d*)d/g // eslint-disable-line
    const s = str.replace(pattern1, (match, number) => typeof params[number - 1] !== 'undefined' ? params[number - 1] : match)
    return s.replace(pattern2, (match, number, number2) => {
      const param = params[number - 1]
      if (typeof param !== 'undefined') {
        const width = (number2.length > 1 ? number2.substring(1) : number2)
        const paddingChar = (number2.length > 1 ? number2.substring(0, 1) : ' ')
        if (isNaN(parseInt(width, 10))) {
          return param
        }
        let withPadding = `${param}`
        for (; withPadding.length < width;) {
          withPadding = `${paddingChar}${withPadding}`
        }
        return withPadding
      }
      return match
    })
  }
  if (_.isObject(messages) && messages.hasOwnProperty(key)) { // eslint-disable-line
    if (params.length > 0) {
      return subsitute(messages[key])
    }
    return messages[key]
  }
  return key
}

export const intlEpicUpdate = (action$: any, store: Store) =>
action$.ofType(intlActions.SET_CURRENT_LOCALE, appActions.APP_STARTED)
  .mergeMap(() => {
    // pick up the latest intl state
    const intl = store.getState().intl
    if (intl && intl.messages) {
      messages = intl.messages
    }
    return Observable.from([])
  },
  )

export const intlEpics = [
  intlEpicUpdate,
]
