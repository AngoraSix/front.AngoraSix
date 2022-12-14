import PropTypes from 'prop-types';
import ProjectManagementView from './ProjectManagementView.component';

const ProjectManagementViewContainer = ({
  project,
  projectPresentation,
  projectPresentationActions,
  isAdmin,
}) => {
  return (
    <ProjectManagementView
      project={project}
      projectPresentation={projectPresentation}
      isAdmin={isAdmin}
      projectPresentationActions={projectPresentationActions}
    />
  );
};

ProjectManagementViewContainer.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {},
};

ProjectManagementViewContainer.propTypes = {
  project: PropTypes.object.isRequired,
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  projectPresentationActions: PropTypes.object,
};

export default ProjectManagementViewContainer;
