import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import api from '../api'
import A6App from '../components/App'
import config from '../config'
import reducers from '../store/reducers'
import '../styles/About.css'
import '../styles/App.css'
import '../styles/AuthSignin.css'
import '../styles/ClubInvitations.css'
import '../styles/Commons.css'
import '../styles/CountdownTimer.css'
import '../styles/globals.css'
import '../styles/IntegrationSourceSync.css'
import '../styles/Layouts.css'
import '../styles/Services.css'
import '../styles/ManagementCapsSection.css'
import '../styles/ManagementContributorsList.css'
import '../styles/ManagementDashboard.css'
import '../styles/ManagementDecisions.css'
import '../styles/ManagementFinancial.css'
import '../styles/ManagementIntegrationList.css'
import '../styles/MethodologyGuide.css'
import '../styles/MethodologyOverview.css'
import '../styles/Navbar.css'
import '../styles/NewProjectManagement.css'
import '../styles/Notifications.css'
import '../styles/PostRegistration.css'
import '../styles/Pricing.css'
import '../styles/Projects.css'
import '../styles/ProjectManagementForm.css'
import '../styles/ProjectManagementView.css'
import '../styles/WelcomeContributor.css'
import '../styles/WelcomeCooperative.css'
import '../styles/WelcomeLanding.css'
import '../styles/WelcomeIdeas.css'
import '../styles/WelcomeManager.css'
import '../styles/WelcomeTeam.css'
import { trackPageView } from '../utils/analytics'
import { getPublicEnv, removeSecrets } from '../utils/env'
global.EventSource = require('eventsource')

const AngoraSixWebApp = ({ Component, pageProps, preloadedState, env }) => {
  const store = createStore(reducers, preloadedState)

  config.applyEnvConfig(env)
  api.applyEnvConfig(env)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView(url)
    }

    // Track initial page load
    trackPageView(router.asPath)

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, router.asPath])

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session} refetchInterval={1 * 30}>
        <A6App>
          <Component {...pageProps} />
        </A6App>
      </NextAuthProvider>
    </ReduxProvider>
  )
}

AngoraSixWebApp.defaultProps = {
  pageProps: {},
  preloadedState: {},
  env: {},
}

AngoraSixWebApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  preloadedState: PropTypes.object,
  env: PropTypes.object,
}

AngoraSixWebApp.getInitialProps = async () => {
  const env = getPublicEnv()

  config.applyEnvConfig(env)
  api.applyEnvConfig(env)

  const store = createStore(reducers)

  const preloadedState = store.getState()

  return {
    preloadedState,
    env: removeSecrets(env), // Just for a double-check before passing to front, there should be no AN_PUBLIC_APP_ keys at this point
  }
}

export default appWithTranslation(AngoraSixWebApp)
