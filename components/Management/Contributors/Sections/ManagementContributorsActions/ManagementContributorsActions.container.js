import PropTypes from 'prop-types';
import ManagementContributorsActions from './ManagementContributorsActions.component';

const ManagementContributorsActionsContainer = ({
  contributorsClubActions,
  clubId
}) => {

  return (
    <ManagementContributorsActions
      contributorsClubActions={contributorsClubActions}
      clubId={clubId}
    />
  );
};

ManagementContributorsActionsContainer.defaultProps = {
};

ManagementContributorsActionsContainer.propTypes = {
  contributorsClubActions: PropTypes.object.isRequired,
  clubId: PropTypes.string.isRequired,
};

export default ManagementContributorsActionsContainer;
