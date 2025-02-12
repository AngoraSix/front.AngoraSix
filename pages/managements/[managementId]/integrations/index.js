import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../api';
import FormSkeleton from '../../../../components/common/Skeletons/FormSkeleton.component';
import ManagementIntegrationList from '../../../../components/Management/Integration/List';
import { useActiveSession } from '../../../../hooks/oauth';
import ManagementDetailsLayout from '../../../../layouts/ManagementDetailsLayout';
import { isA6ResourceAdmin } from '../../../../utils/commons/a6commonsUtils';
import logger from '../../../../utils/logger';

const ManagementIntegrationsViewPage = ({
  managementIntegrationsResponseData,
  projectManagementId,
  projectManagement,
  session,
  isAdmin
}) => {
  useActiveSession();
  const { t } = useTranslation('management.integration.list');



  if (!session || session.error || !isAdmin || !projectManagement) {
    logger.error('Log in to see management integrations');
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
        title: t('management.integration.list.page.title'),
        description: t('management.integration.list.page.description'),
      }}
      projectManagement={projectManagement}
      isAdmin={isAdmin}
    >
      <ManagementIntegrationList
        managementIntegrationsResponseData={managementIntegrationsResponseData}
        projectManagementId={projectManagementId}
      />
    </ManagementDetailsLayout>
  );
};

ManagementIntegrationsViewPage.defaultProps = {
  managementIntegrationsResponseData: {},
};

ManagementIntegrationsViewPage.propTypes = {
  managementIntegrationsResponseData: PropTypes.object.isRequired,
  projectManagementId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = { isAdmin: false };
  const { managementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const managementIntegrationsResponseData = await api.managementIntegrations.listIntegrationsForProjectManagement(
      managementId,
      validatedToken
    );

    const projectManagement = await api.projects.getProjectManagement(
      managementId,
      validatedToken
    );

    props = {
      ...props,
      projectManagementId: managementId,
      managementIntegrationsResponseData,
      projectManagement,
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
        'management.integration.list',
      ])),
    },
  };
};

export default ManagementIntegrationsViewPage;
