import { Dialog } from '@mui/material';
import Slide from '@mui/material/Slide';
import React from 'react';

const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SourceSyncUsersMatchDialog = ({ isOpen, closeDialog, children }) => {
  return (
    <Dialog
      className="SourceSyncUsersMatchDialog__Dialog"
      open={isOpen}
      TransitionComponent={SlideTransition}
      onClose={closeDialog}
      maxWidth="md"
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
