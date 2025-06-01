import { useTranslation } from 'next-i18next';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ContributorsDetails = ({ contributors = [] }) => {
  const { t } = useTranslation('management.view');
  return (
    <Box sx={{ width: '80%' }}>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
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
    </Box>
  );
};

export default ContributorsDetails;
