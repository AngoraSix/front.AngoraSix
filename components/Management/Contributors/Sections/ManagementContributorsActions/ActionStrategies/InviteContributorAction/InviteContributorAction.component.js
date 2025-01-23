import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import InviteContributorActionInputDialog from './InviteContributorActionInputDialog.component';

const InviteContributorAction = ({
    inviteContributorActionData,
    formData,
    openedDialog,
    updateDialogOpened,
    onSubmit,
    onFormChange,
    wasSubmitted,
}) => {
    const { t } = useTranslation('management.contributors');

    return (
        <React.Fragment>
            <Box className="InviteContributorAction InviteContributorAction__Container">
                <Button
                    onClick={(event) => {
                        event.preventDefault();
                        updateDialogOpened(true);
                    }}
                    color="primary"
                    variant="contained">
                    {t('management.contributors.actions.invite.button')}
                </Button>
            </Box>
            <InviteContributorActionInputDialog
                open={openedDialog}
                actionInputs={inviteContributorActionData.template?.fields}
                handleDialogClose={() => updateDialogOpened(false)}
                actionData={formData}
                onActionInputChange={onFormChange}
                onSubmit={onSubmit}
                wasSubmitted={wasSubmitted}
            />
        </React.Fragment>
    );
};

InviteContributorAction.defaultProps = {
};

InviteContributorAction.propTypes = {
    inviteContributorActionData: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    openedDialog: PropTypes.bool.isRequired,
    updateDialogOpened: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onFormChange: PropTypes.func.isRequired,
    wasSubmitted: PropTypes.bool.isRequired,
};

export default InviteContributorAction;
