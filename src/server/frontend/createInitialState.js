// @flow
import config from '../config'

const createInitialState = () => ({
  config: {
    appName: config.appName,
    appVersion: config.appVersion,
  },
})

export default createInitialState
