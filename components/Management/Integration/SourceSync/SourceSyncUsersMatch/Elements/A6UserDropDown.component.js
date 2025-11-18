import UnassignedIcon from '@mui/icons-material/PersonOff';
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { useState } from 'react'
import config from '../../../../../../config'
import A6UserCard from './A6UserCard.component'

const UnassignedCard = ({ onClick }) => {
  const { t } = useTranslation('management.integration.sourcesync.users')
  return (
    <Box
      className="SourceSyncUsersMatch__A6UserCard__Container"
      onClick={onClick}
    >
      <Box className="SourceSyncUsersMatch__A6UserCard__Avatar__Container">
        <Avatar alt="Unassigned">
          <UnassignedIcon />
        </Avatar>
      </Box>
      <Box className="SourceSyncUsersMatch__A6UserCard__Data__Container">
        <Typography>
          {t(
            'management.integration.sourcesync.users.match.options.unassigned.title'
          )}
        </Typography>
        <Typography variant="body2">
          {t(
            'management.integration.sourcesync.users.match.options.unassigned.text'
          )}
        </Typography>
      </Box>
    </Box>
  )
}

const A6UserDropDown = ({ fieldSpec, selectedIndex, onSelectMember }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (value, index) => {
    onSelectMember(value, index)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const unassignedIndex = fieldSpec?.options.findIndex(
    (option) =>
      option.value === config.integrations.userMatching.keys.unassigned
  )
  return (
    <Paper
      className="SourceSyncUsersMatch__SourceUserDropDown__Container"
      variant="outlined"
    >
      {selectedIndex === unassignedIndex ? (
        <UnassignedCard onClick={handleClickListItem} />
      ) : (
        <A6UserCard
          contributorId={fieldSpec?.options[selectedIndex].value}
          optionSpec={fieldSpec?.options[selectedIndex]}
          onClick={handleClickListItem}
        />
      )}
      <Menu
        id="lock-menu"
        className="SourceSyncUsersMatch__SourceUserDropDown__Menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <MenuList className="SourceSyncUsersMatch__SourceUserDropDown__MenuList">
          {fieldSpec?.options.map((option, index) => {
            return (
              <MenuItem
                key={option.value}
                onClick={() => handleMenuItemClick(option.value, index)}
              >
                {option.value ===
                config.integrations.userMatching.keys.unassigned ? (
                  <UnassignedCard />
                ) : (
                  <A6UserCard
                    contributorId={option.value}
                    optionSpec={option}
                  />
                )}
              </MenuItem>
            )
          })}
        </MenuList>
      </Menu>
    </Paper>
  )
}

A6UserDropDown.defaultProps = {}

A6UserDropDown.propTypes = {
  fieldSpec: PropTypes.object.isRequired,
}

export default A6UserDropDown
