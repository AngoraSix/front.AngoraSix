import {
    Avatar,
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import ListSkeleton from '../../../../common/Skeletons/ListSkeleton.component';

const ManagementContributorsList = ({
    contributorsClub, isLoading }) => {
    const { t } = useTranslation('management.contributors');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box className="ManagementContributorsList ManagementContributorsList__Container">
            <Typography
                align="center"
                variant="h6"
                component="h2"
                color="primary"
            >
                {t('management.contributors.list.title')}
            </Typography>
            {contributorsClub.members?.length ? (
                <List className="ManagementContributorsList__Listing" dense>
                    {contributorsClub.members.map((member) => {
                        return (
                            <React.Fragment key={member.contributorId}>
                                <ListItem
                                    className="ManagementContributorsList__Listing__Item"
                                    key={member.contributorId}
                                >
                                    <ListItemButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`${member.fullName}`}
                                                src={member.profileMedia.thumbnailUrl}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            className="ManagementContributorsList__Listing__Title"
                                            primary={member.fullName}
                                            secondary={
                                                isMobile && member.roles.map(role =>
                                                    <Chip
                                                        className='ManagementContributorsList__Listing__Role'
                                                        key={role}
                                                        label={t(`management.contributors.list.roles.${role.toLowerCase()}`, { defaultValue: role })}
                                                        variant={role === 'admin' ? "filled" : "outlined"}
                                                        color="primary"
                                                        size="small" />
                                                )
                                            }
                                            secondaryTypographyProps={{ component: 'div' }}
                                        />
                                        {!isMobile && member.roles.map(role =>
                                            <Chip
                                                className='ManagementContributorsList__Listing__Role'
                                                key={role}
                                                label={t(`management.contributors.list.roles.${role.toLowerCase()}`, { defaultValue: role })}
                                                variant={role === 'admin' ? "filled" : "outlined"}
                                                color="primary" />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                                <Divider variant="middle" />
                            </React.Fragment>
                        );
                    })}
                </List>
            ) : isLoading ? (
                <Box className="ManagementContributorsList__Listing">
                    <ListSkeleton />
                </Box>
            ) : (
                <Typography>
                    {t('management.contributors.list.empty-message')}
                </Typography>
            )}
        </Box>
    );
};

ManagementContributorsList.defaultProps = {
    isLoading: false
};

ManagementContributorsList.propTypes = {
    contributorsClub: PropTypes.object.isRequired,
    isLoading: PropTypes.bool
};

export default ManagementContributorsList;
