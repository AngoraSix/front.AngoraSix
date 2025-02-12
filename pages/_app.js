import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import api from '../api';
import A6App from '../components/App';
import config from '../config';
import reducers from '../store/reducers';
import '../styles/App.css';
import '../styles/ClubInvitations.css';
import '../styles/Commons.css';
import '../styles/IntegrationSourceSync.css';
import '../styles/Layouts.css';
import '../styles/ManagementContributorsList.css';
import '../styles/ManagementIntegrationList.css';
import '../styles/Navbar.css';
import '../styles/Notifications.css';
import '../styles/ProjectManagementForm.css';
import '../styles/ProjectManagementView.css';
import '../styles/globals.css';
import { getPublicEnv, removeSecrets } from '../utils/env';
global.EventSource = require('eventsource');

const AngoraSixWebApp = ({ Component, pageProps, preloadedState, env }) => {
  const store = createStore(reducers, preloadedState);

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session} refetchInterval={1 * 30}>
        <A6App>
          <Component {...pageProps} />
        </A6App>
      </NextAuthProvider>
    </ReduxProvider>
  );
};

AngoraSixWebApp.defaultProps = {
  pageProps: {},
  preloadedState: {},
  env: {},
};

AngoraSixWebApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  preloadedState: PropTypes.object,
  env: PropTypes.object,
};

AngoraSixWebApp.getInitialProps = async () => {
  const env = getPublicEnv();

  config.applyEnvConfig(env);
  api.applyEnvConfig(env);

  const store = createStore(reducers);

  const preloadedState = store.getState();

  return {
    preloadedState,
    env: removeSecrets(env), // Just for a double-check before passing to front, there should be no AN_PUBLIC_APP_ keys at this point
  };
};

export default appWithTranslation(AngoraSixWebApp);
