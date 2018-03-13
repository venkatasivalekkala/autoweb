// @flow
import type { ConfigState } from 'common/types'

const initialState = {
  appName: 'autoweb',
  appVersion: '',
}

const reducer = (state: ConfigState = initialState): ConfigState => state

export default reducer
