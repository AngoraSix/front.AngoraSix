import { Box, Paper } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CookieConsent from "../../components/common/CookieConsent";
import Footer from "../../components/common/Footer";
import SharedNavbar from "../../components/common/SharedNavbar";

const DefaultLayout = ({ children, className, contained = true }) => {
  const ChildrenContainer = contained ? Paper : 'div';

  return (
    <Box className={`DefaultLayout DefaultLayout__Container ${className}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SharedNavbar />
      <ChildrenContainer className={`${className}__Body`}>
        {children}
      </ChildrenContainer>
      <Footer />
      <CookieConsent />
    </Box>
  );
};

DefaultLayout.defaultProps = {
  className: 'ManagementDetailsLayout__Page',
  headData: {},
};

DefaultLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DefaultLayout;