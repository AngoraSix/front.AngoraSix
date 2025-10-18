'use client'

import { useTranslation } from 'next-i18next'
import Club from '../../models/Club'
import ProjectManagement from '../../models/ProjectManagement'
import {
  mapLegacyToHateoasCollectionDto,
  mapToHateoasCollectionDto,
} from '../../utils/rest/hateoas/hateoasUtils'
import ProjectsComponent from './Projects.component'

const ProjectsContainer = ({ contributorClubsData, managementsData }) => {
  const { t } = useTranslation('projects')
  const managements = mapLegacyToHateoasCollectionDto(
    managementsData,
    ProjectManagement
  )
  const clubs = mapToHateoasCollectionDto(contributorClubsData, Club)
  managements.collection.forEach((mgmt) => {
    mgmt.members = clubs.collection.find(
      (club) => club.projectManagementId === mgmt.id
    )?.members
  })
  return <ProjectsComponent managements={managements} />
}

export default ProjectsContainer
