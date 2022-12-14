import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProjectManagementView = ({ project }) => {
  return (
    <Box className="ProjectManagementView ProjectManagementView__Container">
      <Typography>{project.name}</Typography>
    </Box>
  );
};

ProjectManagementView.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {},
};

ProjectManagementView.propTypes = {
  project: PropTypes.object.isRequired,
  project: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export default ProjectManagementView;
