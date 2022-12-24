import { Box, Typography } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../api';
import DefaultLayout from '../layouts/DefaultLayout';
import logger from '../utils/logger';

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
