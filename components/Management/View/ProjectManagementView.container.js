import PropTypes from 'prop-types';
import ProjectManagementView from './ProjectManagementView.component';

const ProjectManagementViewContainer = ({
  project,
  projectManagement,
  projectManagementActions,
  isAdmin,
}) => {
  return (
    <ProjectManagementView
      project={project}
      projectManagement={projectManagement}
      isAdmin={isAdmin}
      projectManagementActions={projectManagementActions}
    />
  );
};

ProjectManagementViewContainer.defaultProps = {
  isAdmin: false,
  projectManagementActions: {},
};

ProjectManagementViewContainer.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  projectManagementActions: PropTypes.object,
};

export default ProjectManagementViewContainer;
