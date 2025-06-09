import Contributor from '../../../../../models/Contributor';
import ProjectManagementAccountingStats from '../../../../../models/ProjectManagementAccountingStats';
import ProjectManagementStats from '../../../../../models/ProjectManagementStats';
import ManagementCapsSection from './ManagementCapsSection.component';

const ManagementCapsSectionContainer = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
  contributorsData
}) => {
  const tasksStats = new ProjectManagementStats(projectManagementTasksStats);
  const accountsStats = new ProjectManagementAccountingStats(
    projectManagementAccountingStats
  );
  const contributors = contributorsData.map(c => new Contributor(c))
  return (
    <ManagementCapsSection
      projectManagement={projectManagement}
      projectManagementTasksStats={tasksStats}
      projectManagementAccountingStats={accountsStats}
      contributorsData={contributors}
    />
  );
};

export default ManagementCapsSectionContainer;
