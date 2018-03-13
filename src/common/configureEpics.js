// @flow
import 'rxjs'
import { combineEpics } from 'redux-observable'
import { intlEpics } from './features/intl/actions'


const epics = [
  ...intlEpics,
]

const configureEpics = () =>
  (action$: any, { getState }: any) =>
    combineEpics(...epics)(action$, { getState })

export default configureEpics
