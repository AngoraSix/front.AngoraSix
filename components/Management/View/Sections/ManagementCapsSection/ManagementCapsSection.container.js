import ProjectManagementStats from '../../../../../models/ProjectManagementStats';
import ProjectManagementAccountingStats from '../../../../../models/ProjectManagementAccountingStats';
import ManagementCapsSection from './ManagementCapsSection.component';

const ManagementCapsSectionContainer = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
}) => {
  const tasksStats = new ProjectManagementStats(projectManagementTasksStats);
  const accountsStats = new ProjectManagementAccountingStats(
    projectManagementAccountingStats
  );
  return (
    <ManagementCapsSection
      projectManagement={projectManagement}
      projectManagementTasksStats={tasksStats}
      projectManagementAccountingStats={accountsStats}
    />
  );
};

export default ManagementCapsSectionContainer;
