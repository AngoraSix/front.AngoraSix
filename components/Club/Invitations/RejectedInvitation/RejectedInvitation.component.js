import ErrorIcon from '@mui/icons-material/Error'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { ROUTES } from '../../../../constants/constants'

const RejectedInvitation = ({}) => {
  const { t } = useTranslation('club.invitations')
  return (
    <>
      <Head>
        <title>{t('club.invitations.rejected.page.title')}</title>
        <meta
          name="description"
          content={t('club.invitations.rejected.page.description')}
        />

        <meta
          property="og:title"
          key="og.title"
          content={t('club.invitations.rejected.page.title')}
        />
        <meta
          property="og:description"
          key="og.description"
          content={t('club.invitations.rejected.page.description')}
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="ClubInvitation__Container RejectedInvitation">
        <Typography
          variant="h6"
          className="ClubInvitation__Section ClubInvitation__Title"
        >
          {t('club.invitations.rejected.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          className="ClubInvitation__Section ClubInvitation__Description"
        >
          {t('club.invitations.rejected.description')}
        </Typography>
        <ErrorIcon
          className="ClubInvitation__Section ClubInvitation__Icon"
          color="primary"
        />
        <Typography
          variant="subtitle2"
          className="ClubInvitation__Section ClubInvitation__Outro"
        >
          {t('club.invitations.rejected.outro')}
        </Typography>
        <Typography
          variant="subtitle1"
          className="ClubInvitation__Section ClubInvitation__Link__Presentation"
        >
          {t('club.invitations.rejected.linkpresentation')}
        </Typography>
        <Link href={ROUTES.projects.list}>
          <Typography
            variant="text"
            color="primary"
            className="ClubInvitation__Section ClubInvitation__Link"
          >
            {t('club.invitations.rejected.myprojects')}
          </Typography>
        </Link>
      </Box>
    </>
  )
}

RejectedInvitation.defaultProps = {}

RejectedInvitation.propTypes = {}

export default RejectedInvitation
