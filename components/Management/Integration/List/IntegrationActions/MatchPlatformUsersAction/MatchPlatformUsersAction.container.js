import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SourceSyncUsersMatch from '../../../SourceSync/SourceSyncUsersMatch';
import MatchPlatformUsersAction from './MatchPlatformUsersAction.component';

const MatchPlatformUsersActionContainer = ({
  sourceKey, projectManagementId, sourceSyncId, integrationId, onMatchPlatformUsers }) => {
  const { t } = useTranslation('management.integration.list');
  const router = useRouter();

  const [dialogOpened, setDialogOpened] = useState(false);

  const onTriggerMatchPlatformUsers = async () => {
    // onMatchPlatformUsers(true);
    setDialogOpened(true);
  }

  const onDialogClose = () => {
    onMatchPlatformUsers(false);
    setDialogOpened(false);
  }

  return (
    <>
      <MatchPlatformUsersAction
        sourceKey={sourceKey}
        sourceSyncId={sourceSyncId}
        integrationId={integrationId}
        onTriggerMatchPlatformUsers={onTriggerMatchPlatformUsers} />
      <SourceSyncUsersMatch
        // initialUsersMatchingFieldSpecs={matchUsersData.initialUsersMatchingFieldSpecs}
        // contributorsResponse={matchUsersData.contributorsResponse}
        sourceSyncId={sourceSyncId}
        projectManagementId={projectManagementId}
        isTriggeredAction={true}
        isDialogOpen={dialogOpened}
        onDialogClose={onDialogClose}
        sourceKey={sourceKey}
      />
    </>
  );
};

MatchPlatformUsersActionContainer.propTypes = {
  actionData: PropTypes.object.isRequired,
  onMatchPlatformUsers: PropTypes.func.isRequired,
  integrationId: PropTypes.string.isRequired,
  projectManagementId: PropTypes.string.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
  sourceKey: PropTypes.string.isRequired,
};

export default MatchPlatformUsersActionContainer;
