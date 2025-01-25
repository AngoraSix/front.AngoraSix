import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { useNotifications } from '../../../../hooks/app';
import Club from '../../../../models/Club';
import { toType } from '../../../../utils/helpers';
import AcceptedInvitation from './AcceptedInvitation.component';

const AcceptedInvitationContainer = ({ clubResponse }) => {
    const club = toType(clubResponse, Club);
    const { t } = useTranslation('club.invitations');

    const { onSuccess } = useNotifications();

    onSuccess(t('club.invitations.accepted.success'));

    return (
        <AcceptedInvitation club={club} />
    );
};

AcceptedInvitationContainer.defaultProps = {
};

AcceptedInvitationContainer.propTypes = {
    contributorsClubActions: PropTypes.object.isRequired,
    clubId: PropTypes.string.isRequired,
};

export default AcceptedInvitationContainer;
