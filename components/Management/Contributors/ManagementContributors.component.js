import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ManagementContributorsActions from './Sections/ManagementContributorsActions';
import ManagementContributorsList from './Sections/ManagementContributorsList';

const ManagementContributors = ({ contributorsClub }) => {
  return (
    <Box className="ManagementContributors ManagementContributors__Container">
      <ManagementContributorsList contributorsClub={contributorsClub} />
      <ManagementContributorsActions
        contributorsClubActions={contributorsClub.actions}
        clubId={contributorsClub.id} />
    </Box>
  );
};

ManagementContributors.defaultProps = {
};

ManagementContributors.propTypes = {
  contributorsClub: PropTypes.object.isRequired,
};

export default ManagementContributors;
