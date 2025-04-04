import ProjectManagementStats from '../../../../../models/ProjectManagementStats';
import ManagementCapsSection from './ManagementCapsSection.component';

const ManagementCapsSectionContainer = ({
  projectManagement,
  projectManagementTasksStats,
}) => {
  const tasksStats = new ProjectManagementStats(projectManagementTasksStats);
  return (
    <ManagementCapsSection
      projectManagement={projectManagement}
      projectManagementTasksStats={tasksStats}
    />
  );
};

export default ManagementCapsSectionContainer;
