import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SourceSyncUsersMatchDialog = ({ isOpen, closeDialog, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      className="SourceSyncUsersMatchDialog__Dialog"
      open={isOpen}
      TransitionComponent={SlideTransition}
      onClose={closeDialog}
      maxWidth="md"
      // fullScreen={isMobile}
      fullWidth
    >
      {children}
    </Dialog>
  );
};

SourceSyncUsersMatchDialog.defaultProps = {};

SourceSyncUsersMatchDialog.propTypes = {
};

export default SourceSyncUsersMatchDialog;
