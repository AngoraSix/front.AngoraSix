import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '../../hooks/app';
import App from './App.component';
import { useAndCheckActiveToken } from '../../hooks/oauth';

const AppContainer = (props) => {
  const reduxDispatch = useDispatch();
  const router = useRouter();
  const { isLoading, doLoad } = useLoading();

  useAndCheckActiveToken();

  useEffect(() => {
    const startLoading = () => {
      doLoad(true);
    };
    const finishLoading = () => {
      doLoad(false);
    };

    router.events.on('beforeHistoryChange', startLoading);
    router.events.on('routeChangeStart', startLoading);

    router.events.on('routeChangeComplete', finishLoading);
    router.events.on('routeChangeError', finishLoading);

    return () => {
      router.events.off('beforeHistoryChange', startLoading);
      router.events.off('routeChangeStart', startLoading);

      router.events.off('routeChangeComplete', finishLoading);
      router.events.off('routeChangeError', finishLoading);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <App isLoading={isLoading} {...props} />;
};

export default AppContainer;
