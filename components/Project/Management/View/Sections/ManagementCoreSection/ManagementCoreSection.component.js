import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ManagementCoreSection = ({ project, projectManagement }) => {
  return (
    <Box className="ManagementCoreSection ManagementCoreSection__Container">
      <Typography>{project.name}</Typography>
      <Typography>{projectManagement.status}</Typography>
    </Box>
  );
};

ManagementCoreSection.defaultProps = {
  isAdmin: false,
};

ManagementCoreSection.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ManagementCoreSection;
