import Footer from '@/components/Footer';
import Layout from '@/components/layout';
import '@/styles/globals.css'
import Head from "next/head";
import Script from "next/script";


function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="https://touchablephotos.com.com/images/logo-circle.png"/>
      </Head>

      {/* required for modal (popup forms) to work until transtion to full tailwindcss */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;