import { Avatar, Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

const LOGO_IMAGE_URI = '/logos/a6-white-500.png';

const A6UserCard = ({
  contributorId,
  fieldSpec,
}) => {
  return (
    <Paper className="SourceSyncUsersMatch__A6UserCard__Container" variant="outlined">
      <Box className="SourceSyncUsersMatch__Source__Icon__Container">
        <Avatar variant="rounded" sx={{ bgcolor: '#0A2239' }}>
          <Box className="SourceSyncUsersMatch__Logo__Container">
            <Image
              className="SourceSyncUsersMatch__Grid__Header__Logo"
              src={LOGO_IMAGE_URI}
              alt="AngoraSix Platform"
              title="AngoraSix Platform"
              placeholder="blur"
              blurDataURL={LOGO_IMAGE_URI}
              fill
              sizes="(max-width: 600px) 22px,
                            22px"
            />
          </Box>
        </Avatar>
      </Box>
      <Box className="SourceSyncUsersMatch__A6UserCard__Avatar__Container">
        <Avatar alt={fieldSpec?.contributorData?.fullName || contributorId} src={fieldSpec.contributorData.profileMedia.thumbnailUrl} />
      </Box>

      <Box className="SourceSyncUsersMatch__A6UserCard__Data__Container">
        <Typography>
          {fieldSpec?.contributorData?.fullName || contributorId}
        </Typography>
        <Typography
          component="span"
          variant="body2"
        >
          {fieldSpec?.contributorData?.email}
        </Typography>
      </Box>
    </Paper>)
};

A6UserCard.defaultProps = {
};

A6UserCard.propTypes = {
  contributorId: PropTypes.string.isRequired,
  fieldSpec: PropTypes.object.isRequired,
};

export default A6UserCard;
