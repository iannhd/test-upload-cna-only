import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/error-page/errorPageStyle.scss'
import '../components/register-page/registerPageStyle.scss'
import '../components/pdf-integration/pdf-integration-component-style.scss'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
