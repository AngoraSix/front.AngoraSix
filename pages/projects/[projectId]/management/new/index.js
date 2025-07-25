import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from "react";
import api from '../../../../../api';
import FormSkeleton from '../../../../../components/common/Skeletons/FormSkeleton.component';
import NewProjectManagement from '../../../../../components/Management/New';
import { ROUTES } from '../../../../../constants/constants';
import { useNotifications } from '../../../../../hooks/app';
import { useAndCheckActiveToken } from '../../../../../hooks/oauth';
import DefaultLayout from '../../../../../layouts/DefaultLayout';
import { obtainValidatedToken, resolveRoute } from '../../../../../utils/api/apiHelper';
import { isA6ResourceAdmin } from '../../../../../utils/commons/a6commonsUtils';
import logger from '../../../../../utils/logger';

const NewProjectManagementPage = ({ session, isAdmin, project, existingProjectManagementId }) => {
  useAndCheckActiveToken();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (existingProjectManagementId) {
      logger.error('Project management already exists, redirecting to dashboard');
      router.push(resolveRoute(ROUTES.management.dashboard, existingProjectManagementId));
    }
  }, [existingProjectManagementId, onError, router]);

  if (!session || session?.error || !isAdmin || !project || existingProjectManagementId) {
    logger.error('Log in to register project management');
    return (
      <DefaultLayout contained={false} className="NewProjectManagementLayout__Page">
        <Box>
          <FormSkeleton />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout contained={false} className="NewProjectManagementLayout__Page">
      <NewProjectManagement project={project} />
    </DefaultLayout>
  );
};

NewProjectManagementPage.defaultProps = {
  isAdmin: false,
};

NewProjectManagementPage.propTypes = {
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
  project: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken = await obtainValidatedToken(ctx.req);
  console.log("GGGGGGG", validatedToken)
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    isAdmin = isA6ResourceAdmin(session?.user?.id, project);
    props = {
      ...props,
      project,
      isAdmin,
    };
    const { data: existingProjectManagement, status } = await api.management.getProjectManagementForProject(projectId, validatedToken);
    props = {
      ...props,
      existingProjectManagementId: existingProjectManagement?.id || null
    };
    console.log("Project Management", existingProjectManagementId, status);
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
        'management.new',
        'common.languages',
      ])),
    },
  };
};

export default NewProjectManagementPage;
