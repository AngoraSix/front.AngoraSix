import { Avatar, Box, Typography } from '@mui/material'
import Image from 'next/image'
import PropTypes from 'prop-types'

const LOGO_IMAGE_URI = '/logos/a6-white-500.png'

const A6UserCard = ({ contributorId, optionSpec, onClick }) => {
  return (
    <Box
      className="SourceSyncUsersMatch__A6UserCard__Container"
      onClick={onClick}
    >
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
        <Avatar
          alt={optionSpec?.contributorData?.fullName || contributorId}
          src={optionSpec.contributorData.profileMedia.thumbnailUrl}
        />
      </Box>

      <Box className="SourceSyncUsersMatch__A6UserCard__Data__Container">
        <Typography>
          {optionSpec?.contributorData?.fullName || contributorId}
        </Typography>
        <Typography component="span" variant="body2">
          {optionSpec?.contributorData?.email}
        </Typography>
      </Box>
    </Box>
  )
}

A6UserCard.propTypes = {
  contributorId: PropTypes.string.isRequired,
  optionSpec: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default A6UserCard
