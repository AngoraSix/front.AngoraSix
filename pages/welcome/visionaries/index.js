import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import VisionaryLanding from "../../../components/Landings/Visionary/VisionaryLanding";
import LandingLayout from "../../../layouts/LandingLayout";

const VisionaryFounderLanding = () => {
  const { t } = useTranslation('welcome.visionaries');
  return (
    <LandingLayout
      headData={{
        title: t('welcome.visionaries.page.title'),
        description: t('welcome.visionaries.page.description')
      }}
      title="AngoraSix - Great Ideas Need Help"
      description="Stop failing. Start building with structure, AI guidance, and transparent collaboration. Built for founders who've tried before and want to succeed this time."
    >
      <VisionaryLanding />
    </LandingLayout>
  )
}

VisionaryFounderLanding.defaultProps = {
};

VisionaryFounderLanding.propTypes = {
  project: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  return {
    props: {
      ...props,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'welcome.visionaries',
      ])),
    },
  };
};

export default VisionaryFounderLanding;
