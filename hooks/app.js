import { useDispatch, useSelector } from 'react-redux';
import { appIsLoading } from '../store/app';
import { useSnackbar } from 'notistack';

export const useLoading = () => {
  const reduxDispath = useDispatch();
  const { isLoading } = useSelector(({ app }) => app);

  const doLoad = (isLoading = !isLoading) => {
    reduxDispath(appIsLoading(isLoading));
  };

  return {
    doLoad,
    isLoading,
  };
};

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message, options = {}) => {
    enqueueSnackbar(message, options);
  };

  const onSuccess = (message, options = {}) => {
    enqueueSnackbar(message, { ...options, variant: 'success' });
  };

  const onError = (message, options = {}) => {
    enqueueSnackbar(message, { ...options, variant: 'error' });
  };

  return {
    notify,
    onSuccess,
    onError,
  };
};
