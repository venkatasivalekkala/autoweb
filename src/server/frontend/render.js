// @flow
import Helmet from 'react-helmet'
import Html from './Html'
import React from 'react'
import App from '../../web/app/App'
import BaseRoot from '../../web/app/BaseRoot'
import config from '../config'
import configureStore from '../../common/configureStore'
import createInitialState from './createInitialState'
import serialize from 'serialize-javascript'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

// createInitialState loads files, so it must be called once.
const initialState = createInitialState()

const getHost = req =>
  `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`

const getLocale = req =>
  process.env.IS_SERVERLESS
    ? config.defaultLocale
    : req.acceptsLanguages(config.locales) || config.defaultLocale

const createStore = (req): Object =>
  configureStore({
    initialState: {
      ...initialState,
      device: {
        ...initialState.device,
        host: getHost(req),
      },

    },
  })

const renderBody = (store) => {
  const html = renderToString(
    <BaseRoot store={store}>
      <App />
    </BaseRoot>,
  )
  const helmet = Helmet.rewind()
  return { html, helmet }
}

const renderScripts = (
  state,
  appJsFilename,
  // github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
) =>
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)}
    </script>
    <script src="${appJsFilename}"></script>
    `

const renderHtml = (state, body) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets()
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh()
  }
  const scripts = renderScripts(state, appJsFilename)
  const html = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyHtml={`<div id="app">${body.html}</div>${scripts}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={body.helmet}
      isProduction={config.isProduction}
    />,
  )
  return `<!DOCTYPE html>${html}`
}

const render = async (req: Object, res: Object, next: Function) => {
  const store = createStore(req)

  try {
    const body = renderBody(store)
    const html = renderHtml(store.getState(), body)
    res.status(200).send(html)
  } catch (error) {
    if (error && next) {
      next(error)
    }
  }
}

export default render
