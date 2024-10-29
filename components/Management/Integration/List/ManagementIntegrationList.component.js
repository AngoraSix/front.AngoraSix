import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { THIRD_PARTY } from '../../../../constants/constants';
import IntegrationActions from './IntegrationActions';

const ManagementIntegrationList = ({ projectManagementId, managementIntegrations, updateIntegration }) => {

  const { t } = useTranslation('management.integration.list');
  const managementIntegrationsList = Object.values(managementIntegrations);

  return (
    <Box className="ManagementIntegrationList ManagementIntegrationList__Container">
      <Typography
        align="center"
        variant="h6"
        component="h2"
        color="primary.main"
      >
        {t('management.integration.list.title')}
      </Typography>
      <List className="ManagementIntegrationList__Listing" dense>
        {!managementIntegrationsList.length && (
          <Typography>{t('management.integration.list.empty-message')}</Typography>
        )}
        {managementIntegrationsList.map((integration) => {
          return (
            <React.Fragment key={integration.id}>
              <ListItem
                className="ManagementIntegration__Listing__Item"
                key={integration.id}
              >
                <ListItemAvatar className="ManagementIntegration__Listing__Item__Image">
                  <Avatar variant="rounded" sx={{ bgcolor: THIRD_PARTY[integration.source].color }}>
                    <SvgIcon sx={{ fontSize: 22 }} component={THIRD_PARTY[integration.source].logo} inheritViewBox />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className="ManagementIntegration__Listing__Title"
                  primary={THIRD_PARTY[integration.source].name}
                />
                {integration.actions && (
                  <IntegrationActions
                    integrationId={integration.id}
                    sourceKey={integration.source}
                    projectManagementId={projectManagementId}
                    actions={integration.actions}
                    updateIntegration={updateIntegration}
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
  updateIntegration: PropTypes.func.isRequired
};

export default ManagementIntegrationList;
