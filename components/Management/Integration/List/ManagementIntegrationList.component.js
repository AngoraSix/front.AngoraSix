import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Snackbar, SvgIcon, Typography, Alert, TextField } from '@mui/material';
import PanToolIcon from '@mui/icons-material/PanTool';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { THIRD_PARTY } from '../../../../constants/constants';
import IntegrationActions from './IntegrationActions';

const PM_INTEREST_KEYS = ['asana', 'jira', 'clickup', 'notion', 'github'];

const ManagementIntegrationList = ({
  projectManagementId,
  managementIntegrations,
  updateSourceSync,
  onExpressInterest,
  interestNotice,
  isInterestOpen,
  onCloseInterest,
  interestSeverity,
  customToolValue,
  onCustomToolChange,
  onCustomToolSubmit,
  isExpressingInterest,
  isCustomSubmitting
}) => {

  const { t } = useTranslation('management.integration.list');
  const managementIntegrationsList = Object.values(managementIntegrations);

  const existingSources = new Set(Object.keys(managementIntegrations));
  const interestOptions = PM_INTEREST_KEYS
    .filter((key) => !existingSources.has(key))
    .filter((key) => THIRD_PARTY[key]);

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

      {/* {(interestOptions.length > 0 || onCustomToolSubmit) && (
        <Box className="ManagementIntegrationList__Interest" sx={{ mt: 3 }}>
          <Typography
            align="center"
            variant="subtitle1"
            component="h3"
            color="textSecondary"
            sx={{ mb: 1 }}
          >
            {t('management.integration.list.interest.title')}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            component="p"
            color="textSecondary"
            sx={{ mb: 2 }}
          >
            {t('management.integration.list.interest.subtitle')}
          </Typography>
          {interestOptions.length > 0 && (
            <List className="ManagementIntegrationList__Interest__Listing" dense>
              {interestOptions.map((key) => (
                <React.Fragment key={`interest-${key}`}>
                  <ListItem className="ManagementIntegration__Listing__Item">
                    <ListItemAvatar className="ManagementIntegration__Listing__Item__Image">
                      <Avatar variant="rounded" sx={{ bgcolor: THIRD_PARTY[key].color }}>
                        <SvgIcon sx={{ fontSize: 22 }} component={THIRD_PARTY[key].logo} viewBox="0 0 24 24" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className="ManagementIntegration__Listing__Title"
                      primary={THIRD_PARTY[key].name}
                    />
                    <Button
                      className="IntegrationItem__Actions__Button"
                      color="primary"
                      variant="outlined"
                      size="small"
                      startIcon={<PanToolIcon fontSize="small" />}
                      disabled={isExpressingInterest}
                      onClick={() => onExpressInterest && onExpressInterest(key, THIRD_PARTY[key].name)}
                    >
                      {t('management.integration.list.interest.button')}
                    </Button>
                  </ListItem>
                  <Divider variant="middle" />
                </React.Fragment>
              ))}
            </List>
          )}
          {onCustomToolSubmit && (
            <Box
              className="ManagementIntegrationList__Interest__Custom"
              sx={{ mt: interestOptions.length > 0 ? 2 : 0 }}
            >
              <Typography
                variant="body2"
                component="p"
                color="textSecondary"
                sx={{ mb: 1, textAlign: 'center' }}
              >
                {t('management.integration.list.interest.custom.title')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  value={customToolValue}
                  onChange={(event) => onCustomToolChange && onCustomToolChange(event.target.value)}
                  placeholder={t('management.integration.list.interest.custom.placeholder')}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      onCustomToolSubmit();
                    }
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  startIcon={<PanToolIcon fontSize="small" />}
                  disabled={
                    isCustomSubmitting ||
                    isExpressingInterest ||
                    !(customToolValue && customToolValue.trim())
                  }
                  onClick={onCustomToolSubmit}
                >
                  {t('management.integration.list.interest.custom.button')}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )} */}

      <Snackbar
        open={Boolean(isInterestOpen)}
        autoHideDuration={4000}
        onClose={onCloseInterest}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={onCloseInterest} severity={interestSeverity || 'info'} sx={{ width: '100%' }}>
          {interestNotice}
        </Alert>
      </Snackbar>
    </Box>
  );
};

ManagementIntegrationList.defaultProps = {
  managementIntegrations: {},
  onExpressInterest: null,
  interestNotice: '',
  isInterestOpen: false,
  onCloseInterest: null,
  interestSeverity: 'info',
  customToolValue: '',
  onCustomToolChange: null,
  onCustomToolSubmit: null,
  isExpressingInterest: false,
  isCustomSubmitting: false,
};

ManagementIntegrationList.propTypes = {
  managementIntegrations: PropTypes.object,
  projectManagementId: PropTypes.string.isRequired,
  updateSourceSync: PropTypes.func.isRequired,
  onExpressInterest: PropTypes.func,
  interestNotice: PropTypes.string,
  isInterestOpen: PropTypes.bool,
  onCloseInterest: PropTypes.func,
  interestSeverity: PropTypes.string,
  customToolValue: PropTypes.string,
  onCustomToolChange: PropTypes.func,
  onCustomToolSubmit: PropTypes.func,
  isExpressingInterest: PropTypes.bool,
  isCustomSubmitting: PropTypes.bool,
};

export default ManagementIntegrationList;
