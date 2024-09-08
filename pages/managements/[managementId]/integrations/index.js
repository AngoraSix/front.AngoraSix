import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../api';
import ManagementIntegrationList from '../../../../components/Management/Integration/List';
import DefaultLayout from '../../../../layouts/DefaultLayout';
import logger from '../../../../utils/logger';

const ManagementIntegrationsViewPage = ({
  managementIntegrationsResponseData,
}) => {
  const { t } = useTranslation('management.integrations.list');

  return (
    <DefaultLayout
      headData={{
        title: t('management.integrations.view.page.title.template'),
        description: t('management.integrations.view.page.description.template'),
      }}
    >
      <ManagementIntegrationList
        managementIntegrationsResponseData={managementIntegrationsResponseData}
      />
    </DefaultLayout>
  );
};

ManagementIntegrationsViewPage.defaultProps = {
  managementIntegrationsResponseData: {},
};

ManagementIntegrationsViewPage.propTypes = {
  managementIntegrationsResponseData: PropTypes.object.isRequired,
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
        'management.integrations.list',
      ])),
    },
  };
};

export default ManagementIntegrationsViewPage;
