import { useTranslation } from 'next-i18next';
import { Box, Typography, Divider, Grid, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
}) => {
  const { project, contributor } = projectManagementTasksStats;

  const { t } = useTranslation('management.view');

  const theme = useTheme();

  const projectAssignedTasksCount = project.contributors.reduce(
    (prev, curr) => prev + curr.tasks.totalCount - curr.tasks.completedCount,
    0
  );

  const projectPendingTasksCount =
    project.tasks.totalCount - project.tasks.completedCount;

  const projectChartData = [
    {
      id: 0,
      value: (projectAssignedTasksCount * 100) / project.tasks.totalCount,
      label: `${t('management.view.stats.tasks.label.ASSIGNED')} ${Math.round(
        (projectAssignedTasksCount * 100) / project.tasks.totalCount
      )} %`,
      color: theme.palette.primary.light,
    },
    {
      id: 1,
      value: (project.tasks.completedCount * 100) / project.tasks.totalCount,
      label: `${t('management.view.stats.tasks.label.DONE')} ${Math.round(
        (project.tasks.completedCount * 100) / project.tasks.totalCount
      )} %`,
      color: theme.palette.success.light,
    },
    {
      id: 2,
      value: (projectPendingTasksCount * 100) / project.tasks.totalCount,
      label: `${t('management.view.stats.tasks.label.PENDING')} ${Math.round(
        (projectPendingTasksCount * 100) / project.tasks.totalCount
      )} %`,
      color: theme.palette.secondary.main,
    },
  ];

  const contributorAssignedTasksCount =
    contributor?.tasks.totalCount - contributor?.tasks.completedCount;

  const contributorChartData = [
    {
      id: 3,
      value:
        (contributorAssignedTasksCount * 100) / contributor?.tasks.totalCount,
      label: `${t('management.view.stats.tasks.label.ASSIGNED')} ${Math.round(
        (contributorAssignedTasksCount * 100) / contributor?.tasks.totalCount
      )} %`,
      color: theme.palette.primary.light,
    },
    {
      id: 4,
      value:
        (contributor?.tasks.completedCount * 100) /
        contributor?.tasks.totalCount,
      label: `${t('management.view.stats.tasks.label.DONE')} ${Math.round(
        (contributor?.tasks.completedCount * 100) /
          contributor?.tasks.totalCount
      )} %`,
      color: theme.palette.success.light,
    },
  ];

  const contributorsChartData = project.contributors.map((it, index) => {
    const color =
      it.contributorId == contributor?.contributorId
        ? theme.palette.primary.light
        : theme.palette.secondary.main;

    const label =
      it.contributorId == contributor?.contributorId
        ? `${t('management.view.stats.tasks.label.YOU')} ${Math.round(
            (it.tasks.totalCount * 100) / project.tasks.totalCount
          )} %`
        : undefined;

    return {
      id: 5 + index,
      value: (it.tasks.totalCount * 100) / project.tasks.totalCount,
      label,
      color,
    };
  });

  return (
    <Box className="ManagementCapsSection__Container">
      <Typography variant="h5" gutterBottom>
        {t('management.view.stats.title')}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {project ? (
        <Grid container spacing={4}>
          {/* Project Overview */}
          <Grid item xs={12} md={12}>
            <Typography variant="h6">
              {t('management.view.stats.project.tasks')}
            </Typography>
          </Grid>
          {project.tasks.totalCount > 0 && (
            <TaskChart data={projectChartData} />
          )}
          <TaskSummary tasks={project.tasks} t={t} />

          {/* Contributor Overview */}
          {contributor && (
            <>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">
                  {t('management.view.stats.contributor.tasks')}
                </Typography>
              </Grid>
              <TaskChart data={contributorChartData} />
              <TaskSummary tasks={contributor.tasks} t={t} />
            </>
          )}

          {/* Contributor By Tasks */}
          {project?.contributors?.length > 0 && (
            <>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">
                  {t('management.view.stats.contributors.tasks')}
                </Typography>
              </Grid>
              <TaskChart data={contributorsChartData} />
            </>
          )}
        </Grid>
      ) : (
        <Typography variant="h6">
          {t('management.view.stats.NO_DATA')}
        </Typography>
      )}
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
  <Grid item xs={12} md={6} sx={{ minWidth: '450px' }}>
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
      width={450}
      height={200}
      margin={{
        left: -150,
      }}
    />
  </Grid>
);

const TaskSummary = ({ tasks, t }) => (
  <Grid item xs={12} md={6}>
    <Box>
      <Typography variant="body1">
        <strong>{t('management.view.stats.tasks.total')}:</strong>{' '}
        {tasks.totalCount}
      </Typography>
      <Typography variant="body1">
        <strong>{t('management.view.stats.tasks.recently_completed')}:</strong>{' '}
        {tasks.recentlyCompletedCount}
      </Typography>
      <Typography variant="body1">
        <strong>{t('management.view.stats.tasks.completed')}:</strong>{' '}
        {tasks.completedCount}
      </Typography>
      <Typography variant="body1">
        <strong>{t('management.view.stats.tasks.pending')}:</strong>{' '}
        {tasks.totalCount - tasks.completedCount}
      </Typography>
      <Typography variant="body1">
        <strong>{t('management.view.stats.tasks.invested_effort')}:</strong>{' '}
        {tasks.completedEffort}
      </Typography>
    </Box>
  </Grid>
);

export default ManagementCapsSection;
