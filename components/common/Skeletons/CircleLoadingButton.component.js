import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

const CircleLoadingButton = ({
  className,
  loading,
  sxDisplay,
  onClick,
  children,
}) => {
  return (
    <LoadingButton
      className={`${className} LoadingButton--circle`}
      variant="contained"
      loading={loading}
      sx={{
        display: sxDisplay,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
      onClick={onClick}
    >{children}</LoadingButton>
  );
};

CircleLoadingButton.defaultProps = {
  sxDisplay: { xs: 'flex', sm: 'none' },
  loading: true,
};

CircleLoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default CircleLoadingButton;
