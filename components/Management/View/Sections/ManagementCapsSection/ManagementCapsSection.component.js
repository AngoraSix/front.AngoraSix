import { Box, Typography, Divider, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
}) => {
  const { project, contributor } = projectManagementTasksStats;
  const projectData = [
    {
      id: 0,
      value: project.contributors.reduce(
        (prev, curr) =>
          prev + curr.tasks.totalCount - curr.tasks.completedCount,
        0
      ),
      label: 'Assigned',
      color: '#FF9800',
    },
    {
      id: 1,
      value: project.tasks.completedCount,
      label: 'Done',
      color: '#4CAF50',
    },
    {
      id: 2,
      value: project.tasks.totalCount - project.tasks.completedCount,
      label: 'Pending',
      color: '#9E9E9E',
    },
  ];

  const contributorData = [
    {
      id: 3,
      value: contributor?.tasks.totalCount - contributor?.tasks.completedCount,
      label: 'Assigned',
      color: '#FF9800',
    },
    {
      id: 4,
      value: contributor?.tasks.completedCount,
      label: 'Done',
      color: '#4CAF50',
    },
  ];

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: 0,
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Project Overview
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={4}>
        {/* Project Overview */}
        <Grid item xs={12} md={12}>
          <Typography variant="h6">Project Tasks</Typography>
        </Grid>
        <TaskChart data={projectData} />
        <TaskSummary tasks={project.tasks} />

        {/* Contributor Overview */}
        {contributor && (
          <>
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Your Tasks</Typography>
            </Grid>
            <TaskChart data={contributorData} />
            <TaskSummary tasks={contributor.tasks} />
          </>
        )}
      </Grid>
    </Box>
  );
};

ManagementCapsSection.defaultProps = {
  isAdmin: false,
};

ManagementCapsSection.propTypes = {
  projectManagement: PropTypes.object.isRequired,
  projectManagementTasksStats: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

const TaskChart = ({ data }) => (
  <Grid item xs={12} md={6} sx={{ minWidth: '400px' }}>
    <PieChart
      series={[
        {
          data,
          innerRadius: 75,
          outerRadius: 100,
          paddingAngle: 2,
          cornerRadius: 4,
          startAngle: -45,
          endAngle: 315,
        },
      ]}
      width={400}
      height={200}
    />
  </Grid>
);

const TaskSummary = ({ tasks }) => (
  <Grid item xs={12} md={6}>
    <Box>
      <Typography variant="body1">
        <strong>Total Tasks:</strong> {tasks.totalCount}
      </Typography>
      <Typography variant="body1">
        <strong>Recently Completed Tasks:</strong>{' '}
        {tasks.recentlyCompletedCount}
      </Typography>
      <Typography variant="body1">
        <strong>Completed Tasks:</strong> {tasks.completedCount}
      </Typography>
      <Typography variant="body1">
        <strong>Pending Tasks:</strong>{' '}
        {tasks.totalCount - tasks.completedCount}
      </Typography>
      <Typography variant="body1">
        <strong>TotalEffort:</strong> {tasks.totalDoneEffort}
      </Typography>
    </Box>
  </Grid>
);

export default ManagementCapsSection;
