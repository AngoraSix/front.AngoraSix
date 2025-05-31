import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../../../../api';
import config from '../../../../../config';
import { ROUTES } from '../../../../../constants/constants';
import { useLoading, useNotifications } from '../../../../../hooks/app';
import Contributor from '../../../../../models/Contributor';
import InlineFieldSpec from '../../../../../models/InlineFieldSpec';
import { resolveRoute } from '../../../../../utils/api/apiHelper';
import { toType } from '../../../../../utils/helpers';
import logger from '../../../../../utils/logger';
import { mapToHateoasCollectionDto } from '../../../../../utils/rest/hateoas/hateoasUtils';
import { INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import SourceSyncUsersMatchDialog from './Dialog';
import SourceSyncUsersMatch from './SourceSyncUsersMatch.component';
import SourceSyncUsersMatchReducer, {
  INITIAL_STATE,
  setupState,
  updateContributorMatchAction
} from './SourceSyncUsersMatch.reducer';

const SourceSyncUsersMatchContainer = ({
  initialUsersMatchingResponse,
  contributorsResponse,
  projectManagementId,
  sourceSyncId,
  sourceKey,
  isTriggeredAction,
  isDialogOpen,
  onDialogClose,
}) => {
  const { t } = useTranslation('management.integration.sourcesync.users');
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const router = useRouter();

  const [formState, dispatch] = useReducer(SourceSyncUsersMatchReducer, INITIAL_STATE);

  useEffect(() => {
    const initializeUserMatching = async () => {
      const projectManagementResponse = await api.front.getProjectManagement(projectManagementId);
      const contributorsClubResponse = await api.front.getWellKnownClub(projectManagementResponse.id, config.api.servicesAPIParams.clubsProjectManagementMembersType);
      const members = contributorsClubResponse?.members;
      if (members?.length) {
        const memberIds = members.map((m) => m.contributorId);
        const initializationContributorsResponse = await api.front.getContributors(memberIds);

        const initializationUsersMatchingResponse = await api.front.startPlatformUsersMatch(
          sourceSyncId,
          initializationContributorsResponse,
        );
        dispatch(setupState({
          userMatchingFieldSpecs: mapToHateoasCollectionDto(initializationUsersMatchingResponse, InlineFieldSpec),
          contributorsData: initializationContributorsResponse.map((contributor) => toType(contributor, Contributor))
        }));
      }
    }
    if (!formState.initialized) {
      if (!!initialUsersMatchingResponse && !!contributorsResponse) {
        dispatch(setupState({
          userMatchingFieldSpecs: mapToHateoasCollectionDto(initialUsersMatchingResponse, InlineFieldSpec),
          contributorsData: contributorsResponse.map((contributor) => toType(contributor, Contributor))
        }));
      } else if (isDialogOpen) {
        initializeUserMatching();
      }
    }
  }, [initialUsersMatchingResponse, contributorsResponse, isDialogOpen]);

  // we want to support updating several fields at once => value can be an array of fields
  const onMemberMatchSelect = (contributorId) => (value, selectedIndex) => {
    const partialMatchSelect = {
      [contributorId]: {
        value,
        selectedIndex
      }
    };

    dispatch(updateContributorMatchAction(partialMatchSelect));
  };

  const onSubmit = async () => {
    doLoad(true);
    try {
      let userMatchingToSubmit = Object.fromEntries(
        Object.entries(formState.matches).map(([key, obj]) => [key, obj.value])
      );
      const sourceSyncPatchResponse = await api.front.registerMappingUsers(sourceSyncId, userMatchingToSubmit);
      doLoad(false);
      onSuccess(
        t('management.integration.sourcesync.users.notifications.success.saved')
      );

      if (isTriggeredAction) {
        onDialogClose();
      } else if (window.opener) {
        window.opener.postMessage({ type: INTERCOMMUNICATION_KEYS.sourceSyncConfigCompleted, data: sourceSyncPatchResponse }, window.location.origin);
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        const viewURL = resolveRoute(ROUTES.management.integrations.view, projectManagementId);
        router.push(viewURL);
      }
    } catch (err) {
      logger.error(err);
      onError('Error Registering Integration User Platform Matching');
      doLoad(false);
    }
  };
  return isTriggeredAction ? (
    <SourceSyncUsersMatchDialog
      managementId={projectManagementId}
      isOpen={isDialogOpen}
      closeDialog={onDialogClose}>
      <SourceSyncUsersMatch
        contributorMatches={formState.matches}
        sourceKey={sourceKey}
        onMemberMatchSelect={onMemberMatchSelect}
        onSubmit={onSubmit}
      />
    </SourceSyncUsersMatchDialog>
  ) : (
    <SourceSyncUsersMatch
      contributorMatches={formState.matches}
      sourceKey={sourceKey}
      onMemberMatchSelect={onMemberMatchSelect}
      onSubmit={onSubmit}
    />
  );
};

SourceSyncUsersMatchContainer.defaults = {
  isDialogOpen: false,
  isTriggeredAction: false,
  initialUsersMatchingResponse: {},
  contributorsResponse: {},
  onDialogClose: () => { },
};

SourceSyncUsersMatchContainer.propTypes = {
  initialUsersMatchingResponse: PropTypes.object,
  contributorsResponse: PropTypes.array,
  onDialogClose: PropTypes.func,
  isTriggeredAction: PropTypes.bool,
  projectManagementId: PropTypes.string.isRequired,
  sourceSyncId: PropTypes.string.isRequired,
};

export default SourceSyncUsersMatchContainer;
