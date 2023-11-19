import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const HomePage = ({}) => {
  const { t } = useTranslation('common');

  return (
    <DefaultLayout
      headData={{
        title: t('common.page.title'),
        description: t('common.page.description'),
      }}
    >
      <Box>
        <Typography variant="h3" align="center" color="primary.main"> 
          {t('common.temp.landing-page.title')}
        </Typography>
        <Typography variant="h4" align="center">
          {t('common.temp.landing-page.text')}
        </Typography>
      </Box>
    </DefaultLayout>
  );
};

HomePage.defaultProps = {};

HomePage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  // const session = await getSession(ctx);
  let props = {
    ...(await serverSideTranslations(ctx.locale, ['common'])),
  };

  return {
    props,
  };
};

export default HomePage;
