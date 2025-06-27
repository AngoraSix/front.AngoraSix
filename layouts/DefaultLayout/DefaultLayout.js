import { Box, Paper } from '@mui/material';
import SharedNavbar from "../../components/common/SharedNavbar"
import Head from 'next/head';
import PropTypes from 'prop-types';
import CookieConsent from "../../components/common/CookieConsent";
import Footer from "../../components/common/Footer";
import Navbar from '../../components/Navbar';
import config from '../../config';

const DefaultLayout = ({ children, className, headData, contained = true }) => {
  const head = {
    ...config.site.head,
    ...headData,
  };
  const ChildrenContainer = contained ? Paper : 'div';

  return (
    <Box className={`DefaultLayout DefaultLayout__Container ${className}`}>
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
          content={head.image.logoSquare}
        />
      </Head>
      {typeof window !== 'undefined' && !window.opener && <Navbar />}
      <ChildrenContainer className={`${className}__Body`}>
        {children}
      </ChildrenContainer>
      <Footer />
      <CookieConsent />
    </Box>
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
