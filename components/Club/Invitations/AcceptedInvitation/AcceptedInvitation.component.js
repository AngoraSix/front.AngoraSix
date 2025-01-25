import GroupIcon from '@mui/icons-material/Diversity1';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { ROUTES } from '../../../../constants/constants';
import { resolveRoute } from '../../../../utils/api/apiHelper';

const AcceptedInvitation = ({ }) => {
    const { t } = useTranslation('club.invitations');
    const { data: session } = useSession();
    return (
        <Box className="ClubInvitation__Container AcceptedInvitation">
            <Typography variant="h6" className="ClubInvitation__Title">
                {t('club.invitations.accepted.title')}
            </Typography>
            <Typography variant="subtitle1" className="ClubInvitation__Section ClubInvitation__Description">
                {t('club.invitations.accepted.description')}
            </Typography>
            <GroupIcon className="ClubInvitation__Section ClubInvitation__Icon" color="primary" />
            <Typography variant="subtitle1" className="ClubInvitation__Section ClubInvitation__Outro">
                {t('club.invitations.accepted.outro')}
            </Typography>
            {/* Can add Link to project when there is Page for Project (Trello-bwSYrJTC), or to mgmt */}
            <Link href={resolveRoute(ROUTES.profile.view, session.user?.id)}>
                <Typography variant="text" color="primary" className="ClubInvitation__Section ClubInvitation__Link">
                    {t('club.invitations.accepted.profilelink')}
                </Typography>
            </Link>

        </Box>
    );
};

AcceptedInvitation.defaultProps = {
};

AcceptedInvitation.propTypes = {
};

export default AcceptedInvitation;
