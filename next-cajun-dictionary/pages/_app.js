import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>

      <Layout>
        <Head>
          <title>Cajun Dictionary</title>
          <meta name='description' content='Cajun Dictionary' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <Component {...pageProps} />
      </Layout>
      </ModalProvider>
    </AuthProvider>
  )
}

export default MyApp
