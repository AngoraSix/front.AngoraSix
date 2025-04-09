import ProjectManagementStats from '../../../../../models/ProjectManagementStats';
import ProjectManagementAccountsStats from '../../../../../models/ProjectManagementAccountsStats';
import ManagementCapsSection from './ManagementCapsSection.component';

const ManagementCapsSectionContainer = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountsStats,
}) => {
  const tasksStats = new ProjectManagementStats(projectManagementTasksStats);
  const accountsStats = new ProjectManagementAccountsStats(
    projectManagementAccountsStats
  );
  return (
    <ManagementCapsSection
      projectManagement={projectManagement}
      projectManagementTasksStats={tasksStats}
      projectManagementAccountsStats={accountsStats}
    />
  );
};

export default ManagementCapsSectionContainer;
