import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../api';
import ManagementIntegrationList from '../../../../components/Management/Integration/List';
import DefaultLayout from '../../../../layouts/DefaultLayout';
import logger from '../../../../utils/logger';
import { useActiveSession } from '../../../../hooks/oauth';

const ManagementIntegrationsViewPage = ({
  managementIntegrationsResponseData,
  projectManagementId
}) => {
  useActiveSession();
  const { t } = useTranslation('management.integration.list');

  return (
    <DefaultLayout
      headData={{
        title: t('management.integration.list.page.title'),
        description: t('management.integration.list.page.description'),
      }}
    >
      <ManagementIntegrationList
        managementIntegrationsResponseData={managementIntegrationsResponseData}
        projectManagementId={projectManagementId}
      />
    </DefaultLayout>
  );
};

ManagementIntegrationsViewPage.defaultProps = {
  managementIntegrationsResponseData: {},
};

ManagementIntegrationsViewPage.propTypes = {
  managementIntegrationsResponseData: PropTypes.object.isRequired,
  projectManagementId: PropTypes.string.isRequired
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { managementId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const managementIntegrationsResponseData = await api.managementIntegrations.listIntegrationsForProjectManagement(
      managementId,
      validatedToken
    );

    props = {
      ...props,
      projectManagementId: managementId,
      managementIntegrationsResponseData,
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
        'management.integration.list',
      ])),
    },
  };
};

export default ManagementIntegrationsViewPage;
