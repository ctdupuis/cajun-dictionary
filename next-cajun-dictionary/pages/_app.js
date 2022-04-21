import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ModalProvider } from '../context/ModalContext';
import { TermProvider } from '../context/TermContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <TermProvider>
          <Layout>
            <Head>
              <title>Cajun Dictionary</title>
              <meta name='description' content='Cajun Dictionary' />
              <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </TermProvider>
      </ModalProvider>
    </AuthProvider>
  )
}

export default MyApp
