import GroupIcon from '@mui/icons-material/Diversity1'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { ROUTES } from '../../../../constants/constants'

const AcceptedInvitation = ({}) => {
  const { t } = useTranslation('club.invitations')
  return (
    <>
      <Head>
        <title>{t('club.invitations.accept.page.title')}</title>
        <meta
          name="description"
          content={t('club.invitations.accept.page.description')}
        />

        <meta
          property="og:title"
          key="og.title"
          content={t('club.invitations.accept.page.title')}
        />
        <meta
          property="og:description"
          key="og.description"
          content={t('club.invitations.accept.page.description')}
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="ClubInvitation__Container AcceptedInvitation">
        <Typography variant="h6" className="ClubInvitation__Title">
          {t('club.invitations.accepted.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          className="ClubInvitation__Section ClubInvitation__Description"
        >
          {t('club.invitations.accepted.description')}
        </Typography>
        <GroupIcon
          className="ClubInvitation__Section ClubInvitation__Icon"
          color="primary"
        />
        <Typography
          variant="subtitle1"
          className="ClubInvitation__Section ClubInvitation__Link__Presentation"
        >
          {t('club.invitations.accepted.linkpresentation')}
        </Typography>
        <Link href={ROUTES.projects.list}>
          <Typography
            variant="text"
            color="primary"
            className="ClubInvitation__Section ClubInvitation__Link"
          >
            {t('club.invitations.accepted.myprojects')}
          </Typography>
        </Link>
      </Box>
    </>
  )
}

AcceptedInvitation.propTypes = {}

export default AcceptedInvitation
