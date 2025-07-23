import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../../api';
import FormSkeleton from '../../../../../components/common/Skeletons/FormSkeleton.component';
import SourceSyncUsersMatch from '../../../../../components/Management/Integration/SourceSync/SourceSyncUsersMatch';
import config from '../../../../../config';
import { useActiveSession } from '../../../../../hooks/oauth';
import DefaultLayout from '../../../../../layouts/DefaultLayout';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import logger from '../../../../../utils/logger';

const SourceSyncMatchUsersPage = ({
  initialUsersMatchingResponse,
  contributorsResponse,
  managementId,
  sourceSyncId,
  sourceKey,
  session
}) => {
  const { t } = useTranslation('management.integration.sourcesync.users');
  useActiveSession();

  if (!session || session.error || !initialUsersMatchingResponse) {
    logger.error('Log in to see platform users');
    return (
      <DefaultLayout
        headData={{
          title: t("management.integration.sourcesync.users.page.title"),
          description: t(
            "management.integration.sourcesync.users.page.description"
          )
        }}>
        <Box>
          <FormSkeleton />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout
      headData={{
        title: t('management.integration.sourcesync.users.page..title'),
        description: t('management.integration.sourcesync.users.page.description'),
      }}
    >
      <SourceSyncUsersMatch
        initialUsersMatchingResponse={initialUsersMatchingResponse}
        contributorsResponse={contributorsResponse}
        projectManagementId={managementId}
        sourceSyncId={sourceSyncId}
        sourceKey={sourceKey}
      />
    </DefaultLayout>
  );
};

SourceSyncMatchUsersPage.defaultProps = {
  initialUsersMatchingResponse: {},
  contributorsClubResponse: {}
};

SourceSyncMatchUsersPage.propTypes = {
  initialUsersMatchingResponse: PropTypes.object.isRequired,
  contributorsClubResponse: PropTypes.object.isRequired,
};

export const getServerSideProps = async (ctx) => {
  let props = {};

  const { managementId, sourceSyncId } = ctx.params;
  const { myQueryParam } = ctx.query;
  const session = await getSession(ctx);
  const validatedToken = obtainValidatedToken(ctx.req);

  try {
    const projectManagementResponse = await api.projects.getProjectManagement(
      managementId,
      validatedToken
    );
    const contributorsClubResponse = await api.clubs.getWellKnownClub(projectManagementResponse.id, config.api.servicesAPIParams.clubsProjectManagementMembersType, validatedToken);
    const members = contributorsClubResponse?.members;
    if (members?.length) {
      const memberIds = members.map((m) => m.contributorId);
      const contributorsResponse = await api.contributors.listContributors(memberIds, validatedToken);
      const initialUsersMatchingResponse = await api.managementIntegrations.startPlatformUsersMatch(
        sourceSyncId,
        {
          projectContributors: contributorsResponse
        },
        validatedToken
      );

      props = {
        ...props,
        initialUsersMatchingResponse,
        contributorsResponse,
        managementId,
        sourceSyncId,
        sourceKey: initialUsersMatchingResponse.source
      };
    }
  } catch (err) {
    logger.error('err', err);
  }
  return {
    props: {
      ...props,
      session,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        "common.legal",
        'management.common',
        'management.integration.sourcesync.users',
      ])),
    },
  };
};

export default SourceSyncMatchUsersPage;
