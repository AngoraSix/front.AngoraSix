import PropTypes from 'prop-types';
import Club from '../../../models/Club';
import ProjectManagement from '../../../models/ProjectManagement';
import { toType } from '../../../utils/helpers';
import ManagementContributors from './ManagementContributors.component';

const ManagementContributorsContainer = ({
  contributorsClubResponse,
  projectManagementResponse,
}) => {
  const projectManagement = toType(
    projectManagementResponse,
    ProjectManagement
  );
  const contributorsClub = toType(
    contributorsClubResponse,
    Club
  );

  return (
    <ManagementContributors
      projectManagement={projectManagement}
      contributorsClub={contributorsClub}
    />
  );
};

ManagementContributorsContainer.defaultProps = {
};

ManagementContributorsContainer.propTypes = {
  contributorsClubResponse: PropTypes.object.isRequired,
  projectManagementResponse: PropTypes.object.isRequired,
};

export default ManagementContributorsContainer;
