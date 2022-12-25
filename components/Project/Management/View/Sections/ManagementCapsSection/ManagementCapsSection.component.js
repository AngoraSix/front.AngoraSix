import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ManagementCapsSection = ({ projectManagement }) => {
  return (
    <Box className="ManagementCapsSection ManagementCapsSection__Container">
      <Typography>HERE MAIN CAPS SECTION</Typography>
    </Box>
  );
};

ManagementCapsSection.defaultProps = {
  isAdmin: false,
};

ManagementCapsSection.propTypes = {
  projectManagement: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ManagementCapsSection;
