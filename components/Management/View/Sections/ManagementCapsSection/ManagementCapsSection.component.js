import { useTranslation } from 'next-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import { PieChart } from '@mui/x-charts/PieChart';

import PropTypes from 'prop-types';

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountsStats,
}) => {
  const { t } = useTranslation('management.view');
  const theme = useTheme();

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
      background: '#e8f5e9',
    },
    {
      label: t('management.view.stats.tasks.invested_effort'),
      value: project.tasks?.tasks.totalEffort,
      background: '#ffebee',
    },
    {
      label: 'USD Balance',
      value:
        project.accounts.finance?.length > 0
          ? project.accounts?.finance[0].balance
          : 0,
      background: '#e3f2fd',
    },
    {
      label: 'CAPS Balance',
      value: project.accounts.ownership.balance,
      background: '#e3f2fd',
    },
  ];

  const contributorCards = [
    {
      label: t('management.view.stats.tasks.total'),
      value: contributor.tasks?.tasks.totalCount,
      background: theme.palette.grey[100],
    },
    {
      label: t('management.view.stats.tasks.completed'),
      value: contributor.tasks?.tasks.completedCount,
      background: '#e8f5e9',
    },
    {
      label: t('management.view.stats.tasks.pending'),
      value: contributor.tasks?.tasks.pendingCount,
      background: '#fffed1',
    },
    {
      label: t('management.view.stats.tasks.invested_effort'),
      value: contributor.tasks?.tasks.totalEffort,
      background: '#ffebee',
    },
    {
      label: `${contributor.accounts?.ownership.currency} ${t(
        'management.view.stats.accounts.balance'
      )}`,
      value:
        contributor.accounts?.finance?.length > 0
          ? contributor.accounts?.finance[0].balance
          : 0,
      background: '#e3f2fd',
    },
    {
      label: `${contributor.accounts?.ownership.currency} ${t(
        'management.view.stats.accounts.balance'
      )}`,
      value: contributor.accounts?.ownership.balance,
      background: '#e3f2fd',
    },
  ];

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
          <PieChartCard title="Tasks" data={projectTasksChartData} />
        )}
        {contributor.accounts && (
          <PieChartCard title="Ownership" data={projectOwnershipChartData} />
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
      <ContributorTable contributors={project.tasks.contributors} />
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

const ContributorTable = ({ contributors = [] }) => {
  const { t } = useTranslation('management.view');
  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>
              {t('management.view.contributor')}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {t('management.view.stats.tasks.total')}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
             {t('management.view.stats.tasks.invested_effort')} 
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {t('management.view.stats.tasks.completed')}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {t('management.view.stats.tasks.recently_completed')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contributors.map((contributor, index) => (
            <TableRow key={contributor.contributorId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="right">
                {contributor.tasks.totalCount}
              </TableCell>
              <TableCell align="right">
                {contributor.tasks.totalEffort}
              </TableCell>
              <TableCell align="right">
                {contributor.tasks.completedCount}
              </TableCell>
              <TableCell align="right">
                {contributor.tasks.recentlyCompletedCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StatCard = ({
  label,
  value,
  subtext,
  background = '#f5f5f5',
  color = '#000',
}) => {
  return (
    <StyledCard sx={{ backgroundColor: background, color }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Typography variant="subtitle2">{label.toUpperCase()}</Typography>

          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>

          {subtext && (
            <Typography variant="caption" color="text.secondary">
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],

  minWidth: 150,
  maxWidth: 300,
}));

const PieChartCard = ({ title, data }) => {
  const theme = useTheme();
  return (
    <StyledCard sx={{ backgroundColor: theme.palette.grey[50] }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {title.toUpperCase()}
          </Typography>
          <PieChart
            series={[
              {
                data,
                innerRadius: 30,
                outerRadius: 65,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            width={300}
            height={150}
            margin={{
              left: -50,
            }}
            slotProps={{
              legend: {
                direction: 'column',
                position: {
                  vertical: 'middle',
                  horizontal: 'right',
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ManagementCapsSection;
