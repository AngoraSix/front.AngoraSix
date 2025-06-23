import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../api';
import FormSkeleton from '../../../../components/common/Skeletons/FormSkeleton.component';
import ManagementContributors from '../../../../components/Management/Contributors';
import config from '../../../../config';
import { useActiveSession } from '../../../../hooks/oauth';
import ManagementDetailsLayout from '../../../../layouts/ManagementDetailsLayout';
import { isA6ResourceAdmin } from '../../../../utils/commons/a6commonsUtils';
import logger from '../../../../utils/logger';

const ManagementContributorsPage = ({
  projectManagementResponse,
  contributorsClubResponse,
  isAdmin,
  session
}) => {
  const { t } = useTranslation('management.contributors');
  useActiveSession();
  const project = projectManagementResponse.project;

  if (!session || session.error || !isAdmin || !projectManagementResponse) {
    logger.error('Log in to see management contributors');
    return (
      <ManagementDetailsLayout
        headData={{
          title: t("management.common.page.loading.title"),
          description: t(
            "management.common.page.loading.description"
          )
        }}
        isAdmin={isAdmin}>
        <Box>
          <FormSkeleton />
        </Box>
      </ManagementDetailsLayout>
    );
  }

  return (
    <ManagementDetailsLayout
      headData={{
        title: t('management.contributors.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t(
          'management.contributors.page.description.template'
        ).replace(':project', project.name),
      }}
      projectManagement={projectManagementResponse}
      isAdmin={isAdmin}
    >
      <ManagementContributors
        projectManagementResponse={projectManagementResponse}
        contributorsClubResponse={contributorsClubResponse}
      />
    </ManagementDetailsLayout>
  );
};

ManagementContributorsPage.defaultProps = {
  projectManagementResponse: {},
  contributorsClubResponse: {},
  isAdmin: false,
};

ManagementContributorsPage.propTypes = {
  projectManagementResponse: PropTypes.object.isRequired,
  contributorsClubResponse: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = { isAdmin: false };

  const { managementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;

  try {
    const projectManagementResponse = await api.projects.getProjectManagement(
      managementId,
      validatedToken
    );
    const contributorsClubResponse = await api.clubs.getWellKnownClub(projectManagementResponse.id, config.api.servicesAPIParams.clubsProjectManagementMembersType, validatedToken);
    const members = contributorsClubResponse?.members;
    if (members?.length) {
      const memberIds = members.map((m) => m.contributorId);
      const membersResponse = await api.contributors.listContributors(memberIds, validatedToken);
      const membersData = membersResponse.map((member) => ({
        ...member,
        ...(members.find((m) => m.contributorId === member.id) || {}),
      }));
      contributorsClubResponse.members = membersData;
    }

    props = {
      ...props,
      projectManagementResponse,
      contributorsClubResponse,
      isAdmin: isA6ResourceAdmin(session?.user?.id, contributorsClubResponse),
    };
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
        'management.contributors',
      ])),
    },
  };
};

export default ManagementContributorsPage;
