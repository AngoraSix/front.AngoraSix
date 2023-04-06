import { Box, Typography } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
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
        <Typography>LANDING PAGE</Typography>
      </Box>
    </DefaultLayout>
  );
};

HomePage.defaultProps = {
};

HomePage.propTypes = {
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {};

  return {
    props,
  };
};

export default HomePage;
