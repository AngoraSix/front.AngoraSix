import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import api from '../../../../api';
import FormSkeleton from '../../../../components/common/Skeletons/FormSkeleton.component';
import ProjectManagementForm from '../../../../components/Project/Management/Form';
import { resolveRoute, ROUTES } from '../../../../constants';
import { useNotifications } from '../../../../hooks/app';
import { useActiveSession } from '../../../../hooks/oauth';
import DefaultLayout from '../../../../layouts/DefaultLayout';
import logger from '../../../../utils/logger';

const NOT_ADMIN_ERROR_MESSAGE =
  'You need admin privileges to create a Management registry for a Project';

const NewProjectManagementPage = ({ session, project, isAdmin }) => {
  const { t } = useTranslation('project-management.edit');
  useActiveSession();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      const viewURL = resolveRoute(ROUTES.projects.management.landing);
      router.push(viewURL);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, router, session]);

  if (!session || session.error || !project || !isAdmin) {
    logger.error('Log in to modify / create Project Management registry');
    return (
      <DefaultLayout>
        <Box>
          <FormSkeleton />
        </Box>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout
      headData={{
        title: t('project-management.edit.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t(
          'project-management.edit.page.description.template'
        ).replace(':project', project.name),
      }}
    >
      <ProjectManagementForm project={project} />
    </DefaultLayout>
  );
};

NewProjectManagementPage.defaultProps = {
  isAdmin: false,
};

NewProjectManagementPage.propTypes = {
  projectManagement: PropTypes.object,
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    isAdmin = session?.user.id != null && session?.user.id === project.adminId;
    props = {
      ...props,
      project,
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
        'project-management.edit',
        'common.languages',
      ])),
    },
  };
};

export default NewProjectManagementPage;
