import { Paper } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../../components/Navbar';
import config from '../../config';

const DefaultLayout = ({ children, className, headData, contained = true }) => {
  const head = {
    ...config.site.head,
    ...headData,
  };
  const ChildrenContainer = contained ? Paper : 'div';

  return (
    <div className={`DefaultLayout DefaultLayout__Container ${className}`}>
      <Head>
        <meta charSet="utf-8" />
        <title>{head.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/Ruluko.css" />
        <link rel="stylesheet" href="/fonts/ZCool.css" />
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
        <meta property="fb:app_id" key="fb.id" content={head.facebookAppId} />
      </Head>
      <Navbar />
      <ChildrenContainer className={`${className}__Body`}>{children}</ChildrenContainer>
    </div>
  );
};

DefaultLayout.defaultProps = {
  className: 'DefaultLayout__Page',
  headData: {},
};

DefaultLayout.propTypes = {
  className: PropTypes.string,
  headData: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DefaultLayout;
