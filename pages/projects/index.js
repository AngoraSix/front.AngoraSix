import { getSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import api from '../../api'
import Projects from '../../components/Projects'
import config from '../../config'
import { obtainValidatedToken } from '../../utils/api/apiHelper'
import logger from '../../utils/logger'

const ProjectsPage = ({ contributorClubs }) => {
  const { t } = useTranslation('projects')

  console.log('contributorClubs', contributorClubs)

  return (
    <>
      <Head>
        <title>{t('page.title')} | AngoraSix</title>
        <meta name="description" content={t('page.description')} />
      </Head>
      <Projects />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  let props = {}
  const validatedToken = await obtainValidatedToken(ctx.req)
  const session = await getSession(ctx)
  console.log('session', session)
  try {
    const contributorClubs = await api.clubs.searchWellKnownClubsForContributor(
      config.api.servicesAPIParams.clubsProjectManagementMembersType,
      session.user.id
    )
    props = {
      ...props,
      contributorClubs,
    }
  } catch (err) {
    logger.error('err', err)
  }

  return {
    props: {
      ...props,
      session,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'common.legal',
        'projects',
      ])),
    },
  }
}

export default ProjectsPage
