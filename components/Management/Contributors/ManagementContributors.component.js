import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ManagementContributorsActions from './Sections/ManagementContributorsActions.component';
import ManagementContributorsList from './Sections/ManagementContributorsList.component';

const ManagementContributors = ({ contributorsClub }) => {
  console.log('contributorsClub', contributorsClub.members);

  return (
    <Box className="ManagementContributors ManagementContributors__Container">
      <Box className="ManagementContributors__Sections">
        <Box className="ManagementContributors__Section Main">
          <ManagementContributorsList contributorsClub={contributorsClub} />
          <ManagementContributorsActions contributorsClubActions={contributorsClub.actions} />
        </Box>
      </Box>
    </Box>
  );
};

ManagementContributors.defaultProps = {
};

ManagementContributors.propTypes = {
  contributorsClub: PropTypes.object.isRequired,
};

export default ManagementContributors;
