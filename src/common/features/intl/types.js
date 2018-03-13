// @flow
import { intlActions } from './actions'

export type IntlState = {
  currentLocale: string,
  defaultLocale: string,
  initialNow: boolean,
  locales: ?Array<string>,
  messages: any,
}

export type IntlAction =
  | { type: intlActions.SET_CURRENT_LOCALE, payload: { locale: string } }
