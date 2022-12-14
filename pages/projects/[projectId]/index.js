import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../api';
import ProjectManagementView from '../../../components/Project/Management/View';
import DefaultLayout from '../../../layouts/DefaultLayout';
import logger from '../../../utils/logger';

const ProjectManagementViewPage = ({
  project,
  projectManagement,
  projectManagementActions,
  isAdmin,
}) => {
  const { t } = useTranslation('project-management.view');

  return (
    <DefaultLayout
      headData={{
        title: t('project-management.view.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t(
          'project-management.view.page.description.template'
        ).replace(':project', project.name),
      }}
    >
      <ProjectManagementView
        project={project}
        projectManagement={projectManagement}
        projectManagementActions={projectManagementActions}
        isAdmin={isAdmin}
      />
    </DefaultLayout>
  );
};

ProjectManagementViewPage.defaultProps = {
  isAdmin: false,
  projectManagementActions: {},
};

ProjectManagementViewPage.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  projectManagementActions: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId, projectManagementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    const projectManagement = {};
    const projectManagementActions = {};
    // hateoasFormToActions(projectManagement);
    // isAdmin =
    //   session?.user.id != null &&
    //   session?.user.id === projectManagement.project.adminId &&
    //   projectManagement?.projectId === projectId;
    props = {
      ...props,
      project,
      projectManagement,
      projectManagementActions,
      isAdmin,
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
        'project-management.view',
      ])),
    },
  };
};

export default ProjectManagementViewPage;
