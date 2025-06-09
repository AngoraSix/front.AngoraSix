import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../api';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import ProjectManagementView from '../../../components/Management/View';
import ManagementDetailsLayout from '../../../layouts/ManagementDetailsLayout';
import { isA6ResourceAdmin } from '../../../utils/commons/a6commonsUtils';
import logger from '../../../utils/logger';

const ProjectManagementViewPage = ({
  project,
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
  contributorsData,
  projectManagementActions,
  isAdmin,
  session,
}) => {
  const { t } = useTranslation('management.view');

  if (!projectManagement) {
    logger.error('Log in to see management dashboard');
    return (
      <ManagementDetailsLayout
        headData={{
          title: t('management.common.page.loading.title'),
          description: t('management.common.page.loading.description'),
        }}
        isAdmin={isAdmin}
      >
        <Box>
          <FormSkeleton />
        </Box>
      </ManagementDetailsLayout>
    );
  }

  return (
    <ManagementDetailsLayout
      headData={{
        title: t('management.view.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t('management.view.page.description.template').replace(
          ':project',
          project.name
        ),
      }}
      projectManagement={projectManagement}
      isAdmin={isAdmin}
    >
      <ProjectManagementView
        project={project}
        projectManagement={projectManagement}
        projectManagementTasksStats={projectManagementTasksStats}
        projectManagementAccountingStats={projectManagementAccountingStats}
        contributorsData={contributorsData}
        projectManagementActions={projectManagementActions}
        isAdmin={isAdmin}
      />
    </ManagementDetailsLayout>
  );
};

ProjectManagementViewPage.defaultProps = {
  projectManagementActions: {},
};

ProjectManagementViewPage.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  projectManagementActions: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = { isAdmin: false };

  const { managementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;

  try {
    const projectManagement = await api.projects.getProjectManagement(
      managementId,
      validatedToken
    );

    const project = projectManagement.project;
    const projectManagementActions = {};

    const projectManagementTasksStats =
      await api.managementTasks.resolveProjectManagementTasks(
        managementId,
        validatedToken
      );

    const projectManagementAccountingStats =
      await api.managementAccounting.resolveProjectManagementAccounting(
        managementId,
        validatedToken
      );
    const projectContributorIds = projectManagementTasksStats.project.contributors.map(c => c.contributorId);
    const contributorsData = await api.contributors.listContributors(projectContributorIds, validatedToken);
    props = {
      ...props,
      project,
      projectManagement,
      projectManagementTasksStats,
      projectManagementAccountingStats,
      contributorsData,
      projectManagementActions,
      isAdmin: isA6ResourceAdmin(session?.user?.id, projectManagement),
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
        'management.common',
        'management.view',
      ])),
    },
  };
};

export default ProjectManagementViewPage;
