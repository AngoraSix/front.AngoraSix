import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import ManagementIntegrationInteraction from '../../../../../../../components/Management/Integration/Interactions';
import { THIRD_PARTY } from '../../../../../../../constants/constants';
import DefaultLayout from '../../../../../../../layouts/DefaultLayout';

const IntegrationRegistrationViewPage = ({
  managementId, sourceKey, phase
}) => {
  const { t } = useTranslation('management.integration.interactions');
  const sourceName = THIRD_PARTY[sourceKey].name;

  return (
    <DefaultLayout
      headData={{
        title: t('management.integration.interactions.registration.page.title.template').replace(':sourceName', sourceName),
        description: t('management.integration.interactions.registration.page.description.template').replace(':sourceName', sourceName),
      }}
    >
      <ManagementIntegrationInteraction
        managementId={managementId}
        sourceKey={sourceKey}
        interactionPhase={phase}
      />
    </DefaultLayout>
  );
};

IntegrationRegistrationViewPage.defaultProps = {
  sourceSyncsResponseData: {},
};

IntegrationRegistrationViewPage.propTypes = {
  sourceSyncsResponseData: PropTypes.object.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const { managementId, sourceKey, phase } = ctx.params;
  let props = { managementId, sourceKey, phase };
  const session = await getSession(ctx);

  return {
    props: {
      ...props,
      session,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        "common.legal",
        'management.integration.interactions',
      ])),
    },
  };
};

export default IntegrationRegistrationViewPage;
