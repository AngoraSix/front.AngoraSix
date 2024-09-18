import AddCircleIconContained from '@mui/icons-material/AddCircle';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { Button, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../../../../config';
import { resolveRoute } from '../../../../../../utils/api/apiHelper';

const RedirectAuthorizationRegistrationAction = ({ sourceKey, actionKey, actionData, onRedirectAuthorization }) => {
  const authorizationUrlTemplate = actionData.href;

  const { t } = useTranslation('management.integration.list');
  const redirectUrl = config.integrations.registration.actions.redirectAuthorization.registrationUrlTemplate.replace(':source', sourceKey);
  const authorizationUrl = resolveRoute(authorizationUrlTemplate, redirectUrl);

  return (
    <Tooltip title={t('management.integration.list.actions.register.tooltip.template').replace(':source', sourceKey)}>
      <React.Fragment>
        <Button
          className={`IntegrationItem__Actions__Button RedirectAuthorizationRegistrationAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<AddCircleIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() => onRedirectAuthorization(sourceKey, authorizationUrl)}
        >
          {t('management.integration.list.actions.register.text')}
        </Button>
        <IconButton
          aria-label="register"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => onRedirectAuthorization(sourceKey, authorizationUrl)}
        >
          <AddCircleIconContained />
        </IconButton>
      </React.Fragment>
    </Tooltip >
  );
};

RedirectAuthorizationRegistrationAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onRedirectAuthorization: PropTypes.func.isRequired,
};

export default RedirectAuthorizationRegistrationAction;
