import { useTranslation } from 'next-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, useTheme } from '@mui/material';
import ContributorsDetails from './ContributorsDetails';
import { StatCard, PieChartCard } from './Cards';

import PropTypes from 'prop-types';

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountsStats,
}) => {
  const { t } = useTranslation('management.view');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const project = {
    tasks: projectManagementTasksStats.project,
    accounts: projectManagementAccountsStats.project,
  };

  const contributor = {
    tasks: projectManagementTasksStats.contributor,
    accounts: projectManagementAccountsStats.contributor,
  };

  const projectCards = [
    {
      label: t('management.view.stats.tasks.total'),
      value: project.tasks?.tasks.totalCount,
      background: theme.palette.grey[100],
    },
    {
      label: t('management.view.stats.tasks.completed'),
      value: project.tasks?.tasks.completedCount,
      background: theme.palette.green.light,
    },
    {
      label: t('management.view.stats.tasks.invested_effort'),
      value: project.tasks?.tasks.totalEffort,
      background: theme.palette.red.light,
    },
    {
      label: `${project.accounts?.ownership.currency} ${t(
        'management.view.stats.accounts.balance'
      )}`,
      value: project.accounts?.ownership.balance,
      background: theme.palette.blue.light,
    },
  ];

  if (project.accounts?.finance?.length > 0) {
    const finance = project.accounts.finance.map((it) => {
      return {
        label: `${it.currency} ${t('management.view.stats.accounts.balance')}`,
        value: `$ ${it.balance}`,
        background: theme.palette.blue.light,
      };
    });

    projectCards.push(...finance);
  }

  const contributorCards = [
    {
      label: t('management.view.stats.tasks.total'),
      value: contributor.tasks?.tasks.totalCount,
      background: theme.palette.grey[100],
    },
    {
      label: t('management.view.stats.tasks.completed'),
      value: contributor.tasks?.tasks.completedCount,
      background: theme.palette.green.light,
    },
    {
      label: t('management.view.stats.tasks.pending'),
      value: contributor.tasks?.tasks.pendingCount,
      background: theme.palette.yellow.light,
    },
    {
      label: t('management.view.stats.tasks.invested_effort'),
      value: contributor.tasks?.tasks.totalEffort,
      background: theme.palette.red.light,
    },
    {
      label: `${contributor.accounts?.ownership.currency} ${t(
        'management.view.stats.accounts.balance'
      )}`,
      value: contributor.accounts?.ownership.balance,
      background: theme.palette.blue.light,
    },
  ];

  if (contributor.accounts?.finance?.length > 0) {
    const finance = contributor.accounts.finance.map((it) => {
      return {
        label: `${it.currency} ${t('management.view.stats.accounts.balance')}`,
        value: `$ ${it.balance}`,
        background: theme.palette.blue.light,
      };
    });

    contributorCards.push(...finance);
  }

  const toPercentage = (amount, total) => {
    return Math.round((amount * 100) / total);
  };

  const projectOwnershipChartData = [
    {
      id: getRandomId(),
      value: toPercentage(
        contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance
      ),
      label: `${t('management.view.stats.tasks.label.YOU')} ${toPercentage(
        contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance
      )} %`,
    },
    {
      id: getRandomId(),
      value: toPercentage(
        project.accounts?.ownership.balance -
          contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance
      ),
      color: theme.palette.grey[500],
    },
  ];

  const projectTasksChartData = [
    {
      id: getRandomId(),
      value: toPercentage(
        project.tasks?.tasks.assignedCount,
        project.tasks?.tasks.totalCount
      ),
      label: `${t('management.view.stats.tasks.label.ASSIGNED')} ${toPercentage(
        project.tasks?.tasks.assignedCount,
        project.tasks?.tasks.totalCount
      )} %`,
    },
    {
      id: getRandomId(),
      value: toPercentage(
        project.tasks?.tasks.completedCount,
        project.tasks?.tasks.totalCount
      ),
      label: `${t('management.view.stats.tasks.label.DONE')} ${toPercentage(
        project.tasks?.tasks.completedCount,
        project.tasks?.tasks.totalCount
      )} %`,
    },
    {
      id: getRandomId(),
      value: toPercentage(
        project.tasks?.tasks.pendingCount,
        project.tasks?.tasks.totalCount
      ),
      label: `${t('management.view.stats.tasks.label.PENDING')} ${toPercentage(
        project.tasks?.tasks.pendingCount,
        project.tasks?.tasks.totalCount
      )} %`,
    },
  ];

  return (
    <Box className="ManagementCapsSection__Container">
      <Typography variant="h5" mb={2} gutterBottom>
        {t('management.view.stats.title')}
      </Typography>
      <Box className="ManagementCapsSection__CardsContainer">
        {projectCards.map((it, index) => (
          <StatCard
            key={index}
            label={it.label}
            value={it.value}
            background={it.background}
            subtext={it.subtext}
          />
        ))}
      </Box>
      <Box className="ManagementCapsSection__CardsContainer">
        {project.tasks?.tasks.totalCount > 0 && (
          <PieChartCard
            title="Tasks"
            data={projectTasksChartData}
            isMobile={isMobile}
          />
        )}
        {contributor.accounts && (
          <PieChartCard
            title="Ownership"
            data={projectOwnershipChartData}
            isMobile={isMobile}
          />
        )}
      </Box>
      {contributor.tasks && (
        <>
          <Typography variant="h5" gutterBottom>
            Your Contributions
          </Typography>
          <Box className="ManagementCapsSection__CardsContainer">
            {contributorCards.map((it, index) => (
              <StatCard
                key={index}
                label={it.label}
                value={it.value}
                background={it.background}
                subtext={it.subtext}
              />
            ))}
          </Box>
        </>
      )}
      <Typography variant="h5" gutterBottom>
        {t('management.view.stats.contributors.details')}
      </Typography>
      <ContributorsDetails contributors={project.tasks.contributors} />
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

const getRandomId = (salt = 0) => {
  return Date.now() + Math.random() + salt;
};

export default ManagementCapsSection;
