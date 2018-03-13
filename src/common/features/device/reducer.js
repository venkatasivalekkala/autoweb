// @flow
import type { DeviceState } from 'common/types'

const initialState = {
  host: '',
}

const reducer = (state: DeviceState = initialState): DeviceState => state

export default reducer
