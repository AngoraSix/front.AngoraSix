import UnassignedIcon from '@mui/icons-material/PersonOff';
import { Avatar, Box, Menu, MenuItem, MenuList, Paper, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const SourceUserCard = ({ userData, onClick }) => {
  return <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Container" onClick={onClick}>
    <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Avatar__Container"
    >
      <Avatar alt={userData.name} src={userData.profileMediaUrl} />
    </Box>
    <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Data__Container">
      <Typography>
        {userData.name}
      </Typography>
      <Typography
        component="span"
        variant="body2"
      >
        @{userData.username}
      </Typography>
    </Box>
  </Box>
}

const UnassignedCard = ({
  onClick
}) => {
  const { t } = useTranslation('management.integration.sourcesync.users');
  return <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Container"
    onClick={onClick}
  >
    <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Avatar__Container"
    >
      <Avatar alt="Unassigned">
        <UnassignedIcon />
      </Avatar>
    </Box>
    <Box className="SourceSyncUsersMatch__SourceUserDropDown__SourceUserCard__Data__Container">
      <Typography>
        {t('management.integration.sourcesync.users.match.options.unassigned')}
      </Typography>
    </Box>
  </Box>
}

const SourceUserDropDown = ({
  fieldSpec,
  selectedIndex,
  sourceData,
  onSelectMember
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value, index) => {
    onSelectMember(value, index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper className="SourceSyncUsersMatch__SourceUserDropDown__Container" variant="outlined">
      <Box className="SourceSyncUsersMatch__Source__Icon__Container">
        <Avatar variant="rounded" sx={{ bgcolor: sourceData.color }}>
          <SvgIcon sx={{ fontSize: 22 }} component={sourceData.logo} viewBox="0 0 24 24" />
        </Avatar>
      </Box>
      {selectedIndex >= 0 ? <SourceUserCard userData={fieldSpec?.options.inline[selectedIndex].promptData} onClick={handleClickListItem} />
        : <UnassignedCard
          onClick={handleClickListItem} />}
      <Menu
        id="lock-menu"
        className='SourceSyncUsersMatch__SourceUserDropDown__Menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <MenuList className='SourceSyncUsersMatch__SourceUserDropDown__MenuList'>
          <MenuItem
            key="unassign">
            <UnassignedCard
              onClick={() => handleMenuItemClick(null, -1)} />
          </MenuItem>
          {fieldSpec?.options.inline.map((option, index) => {
            return (
              <MenuItem
                key={option.value}
                onClick={() => handleMenuItemClick(option.value, index)}>
                <SourceUserCard userData={option.promptData} onClick={() => handleMenuItemClick(option.promptData.id, index)} />
              </MenuItem>)
          })}
        </MenuList>
      </Menu>
    </Paper>)
};

SourceUserDropDown.defaultProps = {
};

SourceUserDropDown.propTypes = {
  fieldSpec: PropTypes.object.isRequired,
};

export default SourceUserDropDown;
