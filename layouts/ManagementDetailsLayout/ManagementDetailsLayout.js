import { Box, Paper } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import ManagementTabs from '../../components/ManagementTabs';
import Navbar from '../../components/Navbar';
import config from '../../config';

const ManagementDetailsLayout = ({ projectManagement, children, className, headData, contained = true }) => {
  const head = {
    ...config.site.head,
    ...headData,
  };
  const ChildrenContainer = contained ? Paper : 'div';

  return (
    <Box className={`ManagementDetailsLayout ManagementDetailsLayout__Container ${className}`}>
      <Head>
        <title>{head.title}</title>
        <meta property="og:title" key="og.title" content={head.title} />
        <meta
          property="og:description"
          key="og.description"
          content={head.description}
        />
        <meta
          property="og:image"
          itemProp="image"
          key="og.image"
          content={head.image.logo}
        />
      </Head>
      <Navbar />
      <ChildrenContainer className={`${className}__Body`}>
        <ManagementTabs projectManagement={projectManagement} />
        {children}
      </ChildrenContainer>
    </Box>
  );
};

ManagementDetailsLayout.defaultProps = {
  className: 'ManagementDetailsLayout__Page',
  headData: {},
};

ManagementDetailsLayout.propTypes = {
  projectManagement: PropTypes.object.isRequired,
  className: PropTypes.string,
  headData: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ManagementDetailsLayout;
