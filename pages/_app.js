import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/landing-page/landingPageStyle.scss'
import '../components/error-page/errorPageStyle.scss'
import '../components/register-page/registerPageStyle.scss'
import '../components/game-list/gameListPageStyle.scss'
import '../components/pdf-integration/pdf-integration-component-style.scss'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
