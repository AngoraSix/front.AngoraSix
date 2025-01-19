import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { CONTRIBUTORS_ACTIONS_SUPPORTED_KEYS } from './ManagementContributorsActions.properties';

const ManagementContributorsActions = ({ contributorsClubActions }) => {
    console.log("YESS?")
    console.log(contributorsClubActions)

    const CONTRIBUTORS_ACTIONS = {
        [CONTRIBUTORS_ACTIONS_SUPPORTED_KEYS.INVITE_CONTRIBUTOR]: (props) =>
            <Button {...props}
                onClick={(event) => {
                    event.preventDefault();
                }}
                color="primary"
                variant="contained">
                INVITE
            </Button>,
    };

    return (
        <Box className="ManagementContributorsActions ManagementContributorsActions__Container">
            {Object.entries(contributorsClubActions)
                .map(([actionKey, actionData = {}]) => {
                    const ActionComponent = CONTRIBUTORS_ACTIONS[actionKey];
                    console.log("ATRONE");
                    console.log(actionKey);
                    console.log(actionData.template?.method); //DIALOG HERE!
                    return ActionComponent ? (
                        <ActionComponent
                            key={actionKey}
                            {...actionData}
                        />
                    ) : null;
                }).filter((x) => x)}
        </Box>
    );
};

ManagementContributorsActions.defaultProps = {
};

ManagementContributorsActions.propTypes = {
    contributorsClubActions: PropTypes.object.isRequired,
};

export default ManagementContributorsActions;
