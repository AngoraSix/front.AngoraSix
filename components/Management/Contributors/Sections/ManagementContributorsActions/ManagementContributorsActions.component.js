import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import InviteContributorAction from './ActionStrategies/InviteContributorAction';
import { CONTRIBUTORS_ACTIONS_SUPPORTED_KEYS } from './ManagementContributorsActions.properties';

const CONTRIBUTORS_ACTIONS = {
    [CONTRIBUTORS_ACTIONS_SUPPORTED_KEYS.INVITE_CONTRIBUTOR]: InviteContributorAction
};

const ManagementContributorsActions = ({ contributorsClubActions, clubId }) => {
    return (
        <Box className="ManagementContributorsActions ManagementContributorsActions__Container">
            {Object.entries(contributorsClubActions)
                .map(([actionKey, actionData = {}]) => {
                    const ActionComponent = CONTRIBUTORS_ACTIONS[actionKey];
                    return ActionComponent ? (
                        <ActionComponent
                            key={actionKey}
                            clubId={clubId}
                            actionData={actionData}
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
    clubId: PropTypes.string.isRequired,
};

export default ManagementContributorsActions;
