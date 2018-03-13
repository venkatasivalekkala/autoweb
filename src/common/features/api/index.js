// @flow
import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import { AjaxRequest, AjaxResponse } from 'rxjs/observable/dom/AjaxObservable'

export type RequestOptions = {
  settings: AjaxRequest,
  resultObservable?: ?(result: AjaxResponse) => Observable<Action>,
  successCodes?: number[],
  successObservable?: (result: AjaxResponse) => Observable<Action>,
  failureAction: (Error) => Action,
}

const getTokenHeader = (state: State): ?string => {
  const token = state && state.auth.response ? state.auth.response.cred.token : null
  if (!token) return null
  return `TOKEN token="${token}"`
}

const prepareAjaxSettings = (options: AjaxRequest, state?: State): AjaxRequest => {
  const settings: AjaxRequest = {
    method: 'GET',
    ...options,
    crossDomain: true,
    responseType: 'json',
  }

  const domain = 'https://localhost:3000'
  const tokenHeader = getTokenHeader(state)
  settings.headers = options.headers || (
    tokenHeader ? {
      'X-CV-Authorization': tokenHeader,
      'X-CV-API-VER': '2.2.1',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
    } : {}
  )
  const storedSvcPoint = state && state.auth.response ? state.auth.response.svcpoint : null
  const svcpoint = storedSvcPoint || domain
  const flag = false
  if (flag) {
    settings.url = `${svcpoint}/svc/feature`
    settings.method = 'GET'
  } else if (!settings.url.startsWith('http')) {
    settings.url = `${svcpoint}${settings.url}`
  }

  return settings
}

export const observableRequest = (options: RequestOptions, state?: State): Observable<Action> =>
  ajax(prepareAjaxSettings(options.settings, state))
    .flatMap((result) => {
      if (options.resultObservable) return options.resultObservable(result)

      if (result.response._hdr) {
        const rc = result.response._hdr.rc
        const successCodes = [0].concat(options.successCodes)
        if (successCodes.includes(rc) && options.successObservable) {
          return options.successObservable(result)
        }
        return Observable.of(options.failureAction(new Error(result.response._hdr.errorinfo)))
      }
      return Observable.of(options.failureAction(new Error(result.response.error)))
    })
    .catch(error => Observable.of(options.failureAction(error)))
