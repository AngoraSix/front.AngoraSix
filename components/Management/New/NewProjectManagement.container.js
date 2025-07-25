"use client"

import PropTypes from "prop-types"
import api from "../../../api"
import config from "../../../config"
import { useAndCheckActiveToken } from "../../../hooks/oauth"
import NewProjectManagement from "./NewProjectManagement.component"

const NewProjectManagementContainer = ({ project }) => {
  useAndCheckActiveToken()

  const onSubmit = async (formData) => {
    console.log("GERBOOO", formData)
    try {
      let projectId = project?.id
      // we have to send first to create project, if it's not created yet (if project is null)
      if (!projectId) {
        const newProjectResponse = await api.front.saveNewProject({ name: formData.name })
        projectId = newProjectResponse.id
      }

      const mgmtBody = {
        status: formData.status,
        constitution: {
          bylaws: {
            [config.mgmt.categories.ownershipGeneral]: formData.bylaws[config.mgmt.categories.ownershipGeneral],
            [config.mgmt.categories.ownershipTasks]: formData.bylaws[config.mgmt.categories.ownershipTasks],
            [config.mgmt.categories.ownershipGovernance]: formData.bylaws[config.mgmt.categories.ownershipGovernance],
            [config.mgmt.categories.financialProfitShares]: formData.bylaws[config.mgmt.categories.financialProfitShares],
            [config.mgmt.categories.financialCurrencies]: formData.bylaws[config.mgmt.categories.financialCurrencies],
            [config.mgmt.categories.financialGeneral]: formData.bylaws[config.mgmt.categories.financialGeneral],
          },
        }
      }

      const newProjectMgmtResponse = await api.front.saveProjectManagement(mgmtBody, null, projectId)
      return newProjectMgmtResponse
    } catch (error) {
      console.error("Error creating project management:", error)
      // Handle error appropriately
    }
  }

  return <NewProjectManagement onSubmit={onSubmit} project={project} />
}

NewProjectManagementContainer.defaultProps = {}

NewProjectManagementContainer.propTypes = {
  project: PropTypes.object
}

export default NewProjectManagementContainer
