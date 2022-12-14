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
  projectPresentationsList: [],
};

HomePage.propTypes = {
  projectPresentationsList: PropTypes.array,
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {};

  try {
    const projectPresentationsList =
      await api.projects.fetchProjectPresentations(session?.user?.attributes);
    props = {
      ...props,
      ...(await serverSideTranslations(ctx.locale, ['common'])),
      projectPresentationsList,
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props,
  };
};

export default HomePage;
