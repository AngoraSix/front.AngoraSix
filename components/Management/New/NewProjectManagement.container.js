"use client"

import api from "../../../api"
import config from "../../../config"
import { useAndCheckActiveToken } from "../../../hooks/oauth"
import NewProjectManagement from "./NewProjectManagement.component"

const NewProjectManagementContainer = ({ forProjectId }) => {
  useAndCheckActiveToken()

  const onSubmit = async (formData) => {
    try {
      let projectId = forProjectId
      // we have to send first to create project, if it's not created yet (if forProjectId is null)
      if (!projectId) {
        const { data } = await api.front.saveNewProject({ name: formData.name })
        projectId = data.id
      }

      const mgmtBody = {
        status: formData.status,
        bylaws: {
          [config.mgmt.categories.ownershipGeneral]: formData.bylaws.ownershipGeneral,
          [config.mgmt.categories.ownershipTasks]: formData.bylaws.ownershipTasks,
          [config.mgmt.categories.ownershipGovernance]: formData.bylaws.ownershipGovernance,
          [config.mgmt.categories.financialProfitShares]: formData.bylaws.financialProfitShares,
          [config.mgmt.categories.financialCurrencies]: formData.bylaws.financialCurrencies,
          [config.mgmt.categories.financialGeneral]: formData.bylaws.financialGeneral,
        },
      }

      const { mgmtData } = await api.front.saveProjectManagement(mgmtBody, null, projectId)
      return mgmtData
    } catch (error) {
      console.error("Error creating project management:", error)
      // Handle error appropriately
    }
  }

  return <NewProjectManagement onSubmit={onSubmit} />
}

NewProjectManagementContainer.defaultProps = {}

NewProjectManagementContainer.propTypes = {}

export default NewProjectManagementContainer
