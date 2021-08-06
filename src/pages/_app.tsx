import React from 'react'
import { AppProps } from 'next/app'
import getSiteLayout from 'layouts/core/DefaultLayout'
import Head from 'next/head'
import '@nexys/styles/vars.scss'
import '@nexys/styles/global.scss'
import useNProgress from '@nexys/hooks/useNProgress/useNProgress'
import useRefreshStyle from '@nexys/hooks/useRefreshStyle/useRefreshStyle'
// import useLoadingPage from 'hooks/useLoadingPage/useLoadingPage'
const title = 'Riki Rhino'
const description = 'Riki Rhino'
const metaURL = 'https://sharaikios.com'
const metaImage = '/static/logo.png'
const webIconURL = '/static/favicon.ico'

function App(props: AppProps) {
  useNProgress()
  useRefreshStyle()
  // const loading = useLoadingPage()
  const siteLayout = getSiteLayout(props)
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href={webIconURL} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaURL} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
        {/* <script type="application/ld+json"> */}
        {/*  {JSON.stringify(schemaORG)} */}
        {/* </script> */}
      </Head>
      {/* {loading} */}
      {siteLayout}
    </React.Fragment>
  )
}

export default App
