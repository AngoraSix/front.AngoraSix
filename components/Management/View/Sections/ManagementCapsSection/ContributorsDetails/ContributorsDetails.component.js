import { CheckCircle, Person, Schedule, TrendingUp } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useTranslation } from "next-i18next"

const ContributorsDetails = ({ contributors = [], contributorsData = [] }) => {
  const { t } = useTranslation("management.view")

  const getCompletionRate = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getProgressColor = (rate) => {
    if (rate >= 80) return "#10b981"
    if (rate >= 60) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }} className="contributors-details">
      <Box mb={3} className="contributors-details-header">
        <Typography variant="h5" className="contributors-details-title">
          {t("management.view.stats.team.contributors.title")}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="contributors-details-description">
          {t("management.view.stats.team.contributors.description")}
        </Typography>
      </Box>

      <TableContainer component={Paper} className="contributors-table-container">
        <Table sx={{ minWidth: 800 }} className="contributors-table">
          <TableHead className="contributors-table-head">
            <TableRow>
              <TableCell className="contributors-table-cell-head">
                {t("management.view.stats.team.contributors.table.heading.contributor")}
              </TableCell>
              <TableCell align="center" className="contributors-table-cell-head">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <Schedule sx={{ fontSize: 18 }} />
                  {t("management.view.stats.team.contributors.table.heading.totaltasks")}
                </Box>
              </TableCell>
              <TableCell align="center" className="contributors-table-cell-head">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                  {t("management.view.stats.team.contributors.table.heading.investedeffort")}
                </Box>
              </TableCell>
              <TableCell align="center" className="contributors-table-cell-head">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                  {t("management.view.stats.team.contributors.table.heading.taskscompleted")}
                </Box>
              </TableCell>
              <TableCell align="center" className="contributors-table-cell-head">
                {t("management.view.stats.team.contributors.table.heading.recentactivity")}
              </TableCell>
              <TableCell align="center" className="contributors-table-cell-head">
                {t("management.view.stats.team.contributors.table.heading.progress")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributors
              .map((c) => ({ ...c, data: contributorsData.find((cd) => cd.id === c.contributorId) }))
              .map((contributor, index) => {
                const completionRate = getCompletionRate(contributor.tasks.completedCount, contributor.tasks.totalCount)
                const thumbnailUrl = contributor.data?.profileMedia?.thumbnailUrl
                return (
                  <TableRow key={contributor.contributorId} className="contributors-table-row">
                    <TableCell className="contributors-table-cell">
                      <Box display="flex" alignItems="center" gap={2}>
                        {console.log("GERGERGER44444")}
                        {console.log(contributor)}
                        {thumbnailUrl ? (
                          <Avatar src={thumbnailUrl} className="contributor-avatar" />
                        ) : (
                          <Avatar className="contributor-avatar contributor-avatar-default">
                            <Person />
                          </Avatar>
                        )}
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} className="contributor-name">
                            {contributor.data.fullName || `${index + 1}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="center" className="contributors-table-cell">
                      <Chip
                        label={contributor.tasks.totalCount}
                        size="small"
                        className="contributor-chip contributor-chip-total"
                      />
                    </TableCell>

                    <TableCell align="center" className="contributors-table-cell">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        className="contributor-effort"
                      >
                        <Typography variant="body2" fontWeight={600}>
                          {contributor.tasks.totalEffort}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          hrs
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center" className="contributors-table-cell">
                      <Chip
                        label={contributor.tasks.completedCount}
                        size="small"
                        className="contributor-chip contributor-chip-completed"
                      />
                    </TableCell>

                    <TableCell align="center" className="contributors-table-cell">
                      <Chip
                        label={contributor.tasks.recentlyCompletedCount}
                        size="small"
                        variant="outlined"
                        className="contributor-chip contributor-chip-recent"
                      />
                    </TableCell>

                    <TableCell align="center" className="contributors-table-cell">
                      <Box sx={{ minWidth: 120 }} className="contributor-progress">
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="caption" fontWeight={600} className="progress-percentage">
                            {completionRate}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={completionRate}
                          className="progress-bar"
                          sx={{
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: getProgressColor(completionRate),
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ContributorsDetails
