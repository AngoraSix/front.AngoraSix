import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { THIRD_PARTY } from '../../../../constants/constants';
import IntegrationActions from './IntegrationActions';

const ManagementIntegrationList = ({ projectManagementId, managementIntegrations, updateSourceSync }) => {

  const { t } = useTranslation('management.integration.list');
  const managementIntegrationsList = Object.values(managementIntegrations);

  return (
    <Box className="ManagementIntegrationList ManagementIntegrationList__Container">
      <Typography
        align="center"
        variant="h6"
        component="h2"
        color="primary"
      >
        {t('management.integration.list.title')}
      </Typography>
      <List className="ManagementIntegrationList__Listing" dense>
        {!managementIntegrationsList.length && (
          <Typography>{t('management.integration.list.empty-message')}</Typography>
        )}
        {managementIntegrationsList.map((sourceSync) => {
          const actions = { ...sourceSync.sourceSync?.actions, ...sourceSync.actions };
          return (
            <React.Fragment key={sourceSync.id}>
              <ListItem
                className="ManagementIntegration__Listing__Item"
                key={sourceSync.id}
              >
                <ListItemAvatar className="ManagementIntegration__Listing__Item__Image">
                  <Avatar variant="rounded" sx={{ bgcolor: THIRD_PARTY[sourceSync.source].color }}>
                    <SvgIcon sx={{ fontSize: 22 }} component={THIRD_PARTY[sourceSync.source].logo} viewBox="0 0 24 24" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="ManagementIntegration__Listing__Title"
                  primary={THIRD_PARTY[sourceSync.source].name}
                />
                {actions && (
                  <IntegrationActions
                    sourceSyncId={sourceSync.id}
                    sourceKey={sourceSync.source}
                    projectManagementId={projectManagementId}
                    actions={actions}
                    updateSourceSync={updateSourceSync}
                  />
                )}
              </ListItem>

              <Divider variant="middle" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

ManagementIntegrationList.defaultProps = {
  managementIntegrations: {}
};

ManagementIntegrationList.propTypes = {
  managementIntegrations: PropTypes.object,
  projectManagementId: PropTypes.string.isRequired,
  updateSourceSync: PropTypes.func.isRequired
};

export default ManagementIntegrationList;
