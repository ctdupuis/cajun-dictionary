import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { AppWrapper } from '../store/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>

      <Layout>
        <Head>
          <title>Cajun Dictionary</title>
          <meta name='description' content='Cajun Dictionary' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
    // </AlertContextProvider> 
  )
}

export default MyApp
