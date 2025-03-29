import ManagementCapsSection from './ManagementCapsSection.component';

const ManagementCapsSectionContainer = ({
  projectManagement,
  projectManagementTasksStats,
}) => {
  return (
    <ManagementCapsSection
      projectManagement={projectManagement}
      projectManagementTasksStats={projectManagementTasksStats}
    />
  );
};

export default ManagementCapsSectionContainer;
