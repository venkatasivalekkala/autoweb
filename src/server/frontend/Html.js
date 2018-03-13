// @flow
/* eslint-disable react/no-danger */
import React from 'react'

type GoogleAnalyticsProps = {
  id: string,
}

const GoogleAnalytics = ({ id }: GoogleAnalyticsProps) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=ri[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date()a=s.createElement(o),
        m=s.getElementsByTagName(o)[0]a.async=1a.src=gm.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga')
      ga('create', '${id}', 'auto') ga('send', 'pageview')`,
    }}
  />
)

type Props = {
  appCssFilename: string,
  bodyCss: string,
  bodyHtml: string,
  googleAnalyticsId: string,
  helmet: Object,
  isProduction: boolean,
}

const Html = (
  {
    appCssFilename,
    bodyCss,
    bodyHtml,
    helmet,
    isProduction,
  }: Props,
) => (
  <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.base.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.script.toComponent()}
      {isProduction &&
        null
      }
      {appCssFilename && <link href={appCssFilename} rel="stylesheet" />}
      <style dangerouslySetInnerHTML={{ __html: bodyCss }} id="stylesheet" />
    </head>
    <body dangerouslySetInnerHTML={{ __html: bodyHtml }} />
  </html>
)

export default Html
