import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/landing-page/landingPageStyle.scss'
import '../components/headerStyle.scss'
import '../components/played-dummy/playedDummyStyle.scss'
import '../components/error-page/errorPageStyle.scss'
import '../components/register-page/registerPageStyle.scss'
import '../components/game-list/gameListPageStyle.scss'
import '../components/pdf-integration/pdf-integration-component-style.scss'
import { nextStore, store } from '../redux/index'
import { Provider } from 'react-redux'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return(
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  ) 
}

export default nextStore.withRedux(MyApp)