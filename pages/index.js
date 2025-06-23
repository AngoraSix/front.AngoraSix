import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WelcomeLanding from "../components/Landings/Welcome/WelcomeLanding";
import RootLayout from "../layouts/RootLayout";

const HomePage = ({ }) => {
  const { t } = useTranslation('common');

  return (
    <RootLayout
      headData={{
        title: t('common.page.title'),
        description: t('common.page.description'),
      }}
    >
      <WelcomeLanding />
    </RootLayout>
  );
};

HomePage.defaultProps = {};

HomePage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  // const session = await getSession(ctx);
  let props = {
    ...(await serverSideTranslations(ctx.locale, ['common', 'welcome', 'common.legal'])),
  };

  return {
    props,
  };
};

export default HomePage;
