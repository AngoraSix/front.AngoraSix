import { useTranslation } from 'next-i18next';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
}) => {
  const { project, contributor } = projectManagementTasksStats;

  const { t } = useTranslation('management.view');

  const projectChartData = [
    {
      id: 0,
      value: project.contributors.reduce(
        (prev, curr) =>
          prev + curr.tasks.totalCount - curr.tasks.completedCount,
        0
      ),
      label: t('management.view.stats.tasks.label.ASSIGNED'),
      color: '#FF9800',
    },
    {
      id: 1,
      value: project.tasks.completedCount,
      label: t('management.view.stats.tasks.label.DONE'),
      color: '#4CAF50',
    },
    {
      id: 2,
      value: project.tasks.totalCount - project.tasks.completedCount,
      label: t('management.view.stats.tasks.label.PENDING'),
      color: '#9E9E9E',
    },
  ];

  const contributorChartData = [
    {
      id: 3,
      value: contributor?.tasks.totalCount - contributor?.tasks.completedCount,
      label: t('management.view.stats.tasks.label.ASSIGNED'),
      color: '#FF9800',
    },
    {
      id: 4,
      value: contributor?.tasks.completedCount,
      label: t('management.view.stats.tasks.label.DONE'),
      color: '#4CAF50',
    },
  ];

  const contributorsChartData = project.contributors.map((it, index) => {
    const color =
      it.contributorId == contributor?.contributorId ? '#FF9800' : '#9E9E9E';

    const label =
      it.contributorId == contributor?.contributorId ? t("management.view.stats.tasks.label.YOU") : undefined;

    return {
      id: 5 + index,
      value: it.tasks.totalCount,
      label,
      color,
    };
  });

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
              <ContributorChart data={contributorsChartData} />
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

const ContributorChart = ({ data }) => (
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
