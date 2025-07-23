import api from '../../../api';
import config from '../../../config';
import { useAndCheckActiveToken } from '../../../hooks/oauth';
import NewProjectManagement from './NewProjectManagement.component';

const NewProjectManagementContainer = ({ forProjectId }) => {

  const onSubmit = async (formData) => {
    try {
      let projectId = forProjectId;
      // we have to send first to cerate project, if it's not created yet (if forProjectId is null)
      if (!projectId) {
        const { data } = await api.front.saveNewProject({ name: formData.name });
        projectId = data.id;
      }
      let mgmtBody = {
        status: formData.status,
        bylaws: {
          [config.mgmt.categories.ownershipGeneral]: {
            [config.mgmt.ownershipBylaws.isOwnershipA6Managed]: true
          },
          [config.mgmt.categories.ownershipTasks]: {
            [config.mgmt.ownershipBylaws.startupTasksEnabled]: true,
            [config.mgmt.ownershipBylaws.startupTasksFadingEnabled]: true,
            [config.mgmt.ownershipBylaws.startupRetributionPeriod]: "P30Y",
            [config.mgmt.ownershipBylaws.startupRetributionPattern]: "LINEAR_DOWN",
            [config.mgmt.ownershipBylaws.regularRetributionPeriod]: "P3Y",
            [config.mgmt.ownershipBylaws.regularRetributionPattern]: "LINEAR_DOWN"
          },
          [config.mgmt.categories.ownershipGovernance]: {
            [config.mgmt.ownershipBylaws.coordinationCircleEnabled]: true,
            [config.mgmt.ownershipBylaws.ownershipVotingLimit]: 35,
            [config.mgmt.ownershipBylaws.decisionMinimumQuorum]: 1
          },
          [config.mgmt.categories.financialProfitShares]: {
            [config.mgmt.financialBylaws.profitSharesEnabled]: true,
            [config.mgmt.financialBylaws.profitSharesVestingEnabled]: true,
            [config.mgmt.financialBylaws.profitSharesVestingPeriod]: "MATCH_OWNERSHIP_FADING",
            [config.mgmt.financialBylaws.profitSharesVestingPattern]: "LINEAR_DOWN"
          },
          [config.mgmt.categories.financialCurrencies]: {
            [config.mgmt.financialBylaws.financialCurrencies]: ["USD", "ARS"],
            [config.mgmt.financialBylaws.currencyVestingEnabled]: false,
            [config.mgmt.financialBylaws.currencyVestingPeriod]: "IMMEDIATE",
            [config.mgmt.financialBylaws.currencyVestingPattern]: "NONE",
            [config.mgmt.financialBylaws.currencyVestingEnabled]: false,
            [config.mgmt.financialBylaws.currencyVestingPeriod]: "IMMEDIATE",
            [config.mgmt.financialBylaws.currencyVestingPattern]: "NONE"
          },
          [config.mgmt.categories.financialGeneral]: {
            [config.mgmt.financialBylaws.isFinancialA6Managed]: true,
            [config.mgmt.financialBylaws.earningDistributionTriggerType]: "TOTAL_INCOME_THRESHOLD",
            [config.mgmt.financialBylaws.earningDistributionTriggerAmount]: 50000,
            [config.mgmt.financialBylaws.earningDistributionTriggerCurrency]: "USD",
            [config.mgmt.financialBylaws.earningDistributionReviewFrequency]: "EVERY_YEAR"
          }
        }
      }

      const { mgmtData } = await api.front.saveProjectManagement(mgmtBody, null, projectId);
      return mgmtData;

    } catch (error) {
      // Handle error
    }
  }
  return (
    <NewProjectManagement />
  );
};

NewProjectManagementContainer.defaultProps = {
};

NewProjectManagementContainer.propTypes = {
};

export default NewProjectManagementContainer;
