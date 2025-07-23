import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import api from '../../../../../../api';
import AcceptedInvitation from '../../../../../../components/Club/Invitations/AcceptedInvitation';
import RejectedInvitation from '../../../../../../components/Club/Invitations/RejectedInvitation';
import AreaSkeleton from '../../../../../../components/common/Skeletons/AreaSkeleton.component';
import { useActiveSession } from '../../../../../../hooks/oauth';
import DefaultLayout from '../../../../../../layouts/DefaultLayout';
import { obtainValidatedToken } from '../../../../../../utils/api/apiHelper';
import logger from '../../../../../../utils/logger';

const AcceptClubInvitationTokenPage = ({
  badRequestResponse,
  clubResponse,
}) => {
  const { t } = useTranslation('club.invitations');
  useActiveSession();

  if (!badRequestResponse && !clubResponse) {
    return (
      <DefaultLayout
        headData={{
          title: t('club.invitations.accept.page.title'),
          description: t('club.invitations.page.description'),
        }}
      >
        <Box>
          <AreaSkeleton />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout
      headData={{
        title: t('club.invitations.accept.page.title'),
        description: t('club.invitations.page.description'),
      }}
    >
      {clubResponse ?
        <AcceptedInvitation clubResponse={clubResponse} />
        : <RejectedInvitation />}
    </DefaultLayout>
  );
};

AcceptClubInvitationTokenPage.defaultProps = {
};

AcceptClubInvitationTokenPage.propTypes = {
  clubResponse: PropTypes.object,
  badRequestResponse: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};

  const { clubId, invitationToken } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken = obtainValidatedToken(ctx.req);

  if (validatedToken) {
    try {
      const clubResponse = await api.clubs.acceptInvitation(
        clubId,
        invitationToken,
        validatedToken
      );

      props = {
        ...props,
        clubResponse,
      };
    } catch (err) {
      if (err.response?.status === 400) {
        const badRequestResponse = err.response.data;
        props = {
          ...props,
          badRequestResponse
        };
      } else {
        logger.error('err', err);
      }
    }
  }
  return {
    props: {
      ...props,
      session,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        "common.legal",
        'club.invitations',
      ])),
    },
  };
};

export default AcceptClubInvitationTokenPage;
