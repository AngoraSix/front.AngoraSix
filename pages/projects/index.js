import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import api from '../../api'
import ListSkeleton from '../../components/common/Skeletons/ListSkeleton.component'
import Projects from '../../components/Projects'
import config from '../../config'
import { useAndCheckActiveToken } from '../../hooks/oauth'
import { obtainValidatedToken } from '../../utils/api/apiHelper'
import logger from '../../utils/logger'
import { extractFieldsFromHateoasCollection } from '../../utils/rest/hateoas/hateoasUtils'

const ProjectsPage = ({ contributorClubsData, managementsData }) => {
  useAndCheckActiveToken(true)

  return contributorClubsData && managementsData ? (
    <>
      <Projects
        contributorClubsData={contributorClubsData}
        managementsData={managementsData}
      />
    </>
  ) : (
    <>
      <ListSkeleton />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  let props = {}
  const validatedToken = await obtainValidatedToken(ctx.req)
  const session = await getSession(ctx)
  if (session) {
    try {
      const contributorClubsData =
        await api.clubs.searchWellKnownClubsForContributor(
          config.api.servicesAPIParams.clubsProjectManagementMembersType,
          session?.user?.id,
          validatedToken
        )

      const managementIds = extractFieldsFromHateoasCollection(
        contributorClubsData,
        'projectManagementId'
      )

      const managementsData = await api.management.listProjectManagements(
        managementIds,
        validatedToken
      )
      props = {
        ...props,
        contributorClubsData,
        managementsData,
      }
    } catch (err) {
      logger.error('err', err)
    }
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
