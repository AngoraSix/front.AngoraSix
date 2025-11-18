import { Avatar, Box, Paper, SvgIcon, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const SourceUserCard = ({ userData, sourceData }) => {
  return (
    <Paper
      className="SourceSyncUsersMatch__SourceUserCard__Container"
      variant="outlined"
    >
      <Box className="SourceSyncUsersMatch__Source__Icon__Container">
        <Avatar variant="rounded" sx={{ bgcolor: sourceData.color }}>
          <SvgIcon
            sx={{ fontSize: 22 }}
            component={sourceData.logo}
            viewBox="0 0 24 24"
          />
        </Avatar>
      </Box>
      <Box className="SourceSyncUsersMatch__SourceUserCard__Avatar__Container">
        <Avatar alt={userData.name} src={userData.profileMediaUrl} />
      </Box>
      <Box className="SourceSyncUsersMatch__SourceUserCard__Data__Container">
        <Typography>{userData.name}</Typography>
        <Typography component="span" variant="body2">
          @{userData.username}
        </Typography>
      </Box>
    </Paper>
  )
}

SourceUserCard.propTypes = {
  userData: PropTypes.object.isRequired,
  sourceData: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default SourceUserCard
