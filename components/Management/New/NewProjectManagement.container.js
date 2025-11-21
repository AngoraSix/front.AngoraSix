'use client'

import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import api from '../../../api'
import config from '../../../config'
import { ROUTES } from '../../../constants/constants'
import { useNotifications } from '../../../hooks/app'
import { resolveRoute } from '../../../utils/api/apiHelper'
import logger from '../../../utils/logger'
import NewProjectManagement from './NewProjectManagement.component'
import { useTranslation } from "next-i18next"

const NewProjectManagementContainer = ({ project }) => {
  const { t } = useTranslation("management.new")
  const { onSuccess, onError } = useNotifications()
  const router = useRouter()
  const onSubmit = async (formData) => {
    try {
      let projectId = project?.id
      // we have to send first to create project, if it's not created yet (if project is null)
      if (!projectId) {
        const newProjectResponse = await api.front.saveNewProject({
          name: formData.name,
        })
        projectId = newProjectResponse.id
      }

      const mgmtBody = {
        status: formData.status,
        constitution: {
          bylaws: {
            [config.mgmt.categories.ownershipGeneral]:
              formData.bylaws[config.mgmt.categories.ownershipGeneral],
            [config.mgmt.categories.ownershipTasks]:
              formData.bylaws[config.mgmt.categories.ownershipTasks],
            [config.mgmt.categories.ownershipGovernance]:
              formData.bylaws[config.mgmt.categories.ownershipGovernance],
            [config.mgmt.categories.financialProfitShares]:
              formData.bylaws[config.mgmt.categories.financialProfitShares],
            [config.mgmt.categories.financialCurrencies]:
              formData.bylaws[config.mgmt.categories.financialCurrencies],
            [config.mgmt.categories.financialGeneral]:
              formData.bylaws[config.mgmt.categories.financialGeneral],
          },
        },
      }

      const { data: newProjectMgmt } = await api.front.saveProjectManagement(
        mgmtBody,
        null,
        projectId
      )
      onSuccess(t("submit.result.success"))
      router.push(resolveRoute(ROUTES.management.dashboard, newProjectMgmt.id))
      return newProjectMgmt
    } catch (error) {
      onError(t("submit.result.error"))
      logger.error('Error creating project management:', error)
      // Handle error appropriately
    }
  }

  return <NewProjectManagement onSubmit={onSubmit} project={project} />
}

NewProjectManagementContainer.propTypes = {
  project: PropTypes.object,
}

export default NewProjectManagementContainer
