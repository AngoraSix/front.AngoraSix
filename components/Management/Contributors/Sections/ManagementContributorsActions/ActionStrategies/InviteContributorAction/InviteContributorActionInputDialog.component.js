import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Zoom,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FieldMaker from 'react-mui-fieldmaker';
import { isValidEmail } from '../../../../../../../utils/commons/fieldValidations';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const InviteContributorActionInputDialog = ({
  actionInputs,
  open,
  handleDialogClose,
  actionData,
  onActionInputChange,
  titleKey,
  onSubmit,
  wasSubmitted,
}) => {
  const { t } = useTranslation('management.contributors');

  const [isProcessing, setIsProcessing] = useState(false);

  const isValidField = (key, value) => {
    return key !== 'email' || isValidEmail(value);
  }

  const onDialogSubmit = (e) => {
    setIsProcessing(true);
    e.preventDefault();
    onSubmit();
  }

  const onDialogFieldChange = (key) => (e) => {
    setIsProcessing(false);
    return onActionInputChange(key)(e);
  }

  return (
    <Dialog
      className="ManagementContributorsActions__Dialog__Container"
      open={!!open}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <form onSubmit={onDialogSubmit}>
        <DialogTitle>{t(titleKey)}</DialogTitle>
        <DialogContent
          className='ManagementContributorsActions__Dialog__Content'>
          {open &&
            actionInputs.map((action) => {
              const fieldValue = actionData[action.key];
              const showError = wasSubmitted && (fieldValue == null || fieldValue == '' || !isValidField(action.key, fieldValue))
              return (<FieldMaker
                className={`ManagementContributorsActions__Dialog__Field`}
                key={action.key}
                label={t(`management.contributors.actions.dialog.inputs.${action.key}.label`, { defaultValue: action.key })}
                value={fieldValue}
                error={showError}
                helperText={
                  showError
                    ? t(`management.contributors.actions.dialog.inputs.${action.key}.error`, { defaultValue: t('management.contributors.actions.dialog.inputs.default.error') })
                    : ""
                }
                fullWidth={true}
                type={action.type}
                options={action.options}
                onChange={onDialogFieldChange(action.key)}
              />)
            }
            )}
        </DialogContent>
        <DialogActions>
          <Button
            className="Dialog__Button__Cancel"
            onClick={handleDialogClose}
            sx={{ color: 'primary.light' }}
          >
            {t('management.contributors.actions.dialog.commands.cancel')}
          </Button>
          <Button
            type="submit"
            className="Dialog__Button__Save"
            sx={{ color: 'primary.dark' }}
            disabled={isProcessing}
          >
            {t('management.contributors.actions.dialog.commands.done')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

InviteContributorActionInputDialog.defaultProps = {
  open: false,
  actionInputs: [],
  actionData: {},
  titleKey: 'management.contributors.actions.dialog.title',
};

InviteContributorActionInputDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  actionInputs: PropTypes.array,
  actionData: PropTypes.object,
  onActionInputChange: PropTypes.func.isRequired,
  titleKey: PropTypes.string,
};

export default InviteContributorActionInputDialog;
