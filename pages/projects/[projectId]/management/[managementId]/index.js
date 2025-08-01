import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../../api';
import ProjectManagementView from '../../../../../components/Management/View';
import DefaultLayout from '../../../../../layouts/DefaultLayout';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import logger from '../../../../../utils/logger';

const ProjectManagementViewPage = ({
  project,
  projectManagement,
  projectManagementActions,
  isAdmin,
}) => {
  const { t } = useTranslation('management.view');

  return (
    <DefaultLayout
      headData={{
        title: t('management.view.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t(
          'management.view.page.description.template'
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
  const { projectId, managementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken = await obtainValidatedToken(ctx.req);

  let isAdmin = false;
  try {
    const projectManagement = await api.management.getProjectManagement(
      managementId,
      validatedToken
    );
    const project = projectManagement.project;
    const projectManagementActions = {};
    // hateoasFormToActions(projectManagement);
    if (projectManagement.projectId != projectId) {
      throw new Error("Project Management doesn't match projectId in URL");
    }
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
        "common.legal",
        'management.view',
      ])),
    },
  };
};

export default ProjectManagementViewPage;
