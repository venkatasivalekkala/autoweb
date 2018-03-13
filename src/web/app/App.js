// @flow
import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Container from './Container'
import { appRoutes } from './routes'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory, createMemoryHistory } from 'history'

type AppProps = {
  currentLocale: string,
  started: boolean,
  isLoggedIn: boolean,
}

export const history = process.env.IS_BROWSER ? createBrowserHistory() : createMemoryHistory()

const App = (
  {
    currentLocale,
    started,
  }: AppProps,
) => (
  <div>
    <Helmet
      htmlAttributes={{ lang: currentLocale }}
      meta={[
        // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      ]}
      title="autoweb"
      titleTemplate="%s"
    />
    <Container>
      {started &&
        <ConnectedRouter history={history}>
          {appRoutes}
        </ConnectedRouter>
      }
    </Container>
  </div>
)

export default connect((state: State) => ({
  currentLocale: state.intl.currentLocale,
  started: state.app.started,
}))(App)
