// @flow
import type { Action, IntlState } from 'common/types'
import * as intl from 'react-intl'
import { intlActions } from './actions'

const messages = require('assets/languages/en.json')

const initialState : IntlState = {
  currentLocale: 'en',
  defaultLocale: 'en',
  initialNow: false, // what is this?
  locales: null, // what is this?
  messages,
}

const localesLoaded = ['en']
const fetchData = (locale) => {
    return require(`react-intl/locale-data/${locale}`)
}

const reducer = (
  state: IntlState = initialState,
  action?: Action,
): IntlState => {
  // Because it's called from the createInitialState.
  if (!action) return state

  switch (action.type) {
    case intlActions.SET_CURRENT_LOCALE: {
      const locale = action.payload.locale
      let tmp = null
      if (localesLoaded.indexOf(locale) < 0) {
        // load locale data needed by react-intl
        const data = fetchData(locale)
        intl.addLocaleData(data)
        localesLoaded.push(locale)
      }
     // react-native does not allow dynamic path in require()
      tmp = require(`assets/languages/${locale}.json`)
      const messages = tmp
      return { ...state, currentLocale: locale, messages }
    }

    default:
      return state

  }
}

export default reducer
