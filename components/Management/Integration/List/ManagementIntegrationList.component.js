import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

const ManagementIntegrationList = ({ managementIntegrations, managementIntegrationsActions, isLoading }) => {

  const { t } = useTranslation('management.integration.list');

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
      <List className="AdministeredProjects__Listing" dense>
        {!isLoading && !managementIntegrations.length && (
          <Typography>SINCRONIZR loco</Typography>
        )}
        {managementIntegrations.map((integration) => {
          return (
            <React.Fragment key={integration.id}>
              <ListItem
                className="AdministeredProjects__Listing__Item"
                key={integration.id}
              >
                <ListItemText
                  className="AdministeredProjects__Listing__Title"
                  primary={integration.source}
                />
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
  isAdmin: false,
  projectManagementActions: {},
  managementIntegrations: []
};

ManagementIntegrationList.propTypes = {
  managementIntegrations: PropTypes.array,
  projectManagementActions: PropTypes.object,
};

export default ManagementIntegrationList;
