import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

const RejectedInvitation = ({ }) => {
    const { t } = useTranslation('club.invitations');
    return (
        <Box className="ClubInvitation__Container RejectedInvitation">
            <Typography variant="h6" className="ClubInvitation__Section ClubInvitation__Title">
                {t('club.invitations.rejected.title')}
            </Typography>
            <Typography variant="subtitle1" className="ClubInvitation__Section ClubInvitation__Description">
                {t('club.invitations.rejected.description')}
            </Typography>
            <ErrorIcon className="ClubInvitation__Section ClubInvitation__Icon" color="primary" />
            <Typography variant="subtitle2" className="ClubInvitation__Section ClubInvitation__Outro">
                {t('club.invitations.rejected.outro')}
            </Typography>
        </Box>
    );
};

RejectedInvitation.defaultProps = {
};

RejectedInvitation.propTypes = {
};

export default RejectedInvitation;
