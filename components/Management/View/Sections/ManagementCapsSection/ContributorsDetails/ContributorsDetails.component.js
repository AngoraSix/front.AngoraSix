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
import { styled } from "@mui/system"
import { useTranslation } from "next-i18next"

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  overflow: "hidden",
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  overflowX: "auto",
}))

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  "& .MuiTableCell-head": {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "0.875rem",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    borderBottom: "none",
    padding: "20px 16px",
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(79, 70, 229, 0.04)",
    transform: "scale(1.01)",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(248, 250, 252, 0.5)",
  },
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  padding: "16px",
  fontSize: "0.875rem",
  fontWeight: 500,
}))

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
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      <Box mb={3}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          {t("management.view.stats.team.contributors.title")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("management.view.stats.team.contributors.description")}
        </Typography>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table
          sx={{ minWidth: 800 }}>
          <StyledTableHead>
            <TableRow>
              <TableCell>{t("management.view.stats.team.contributors.table.heading.contributor")}</TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <Schedule sx={{ fontSize: 18 }} />{t("management.view.stats.team.contributors.table.heading.totaltasks")}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                  {t("management.view.stats.team.contributors.table.heading.investedeffort")}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                  <CheckCircle sx={{ fontSize: 18 }} />{t("management.view.stats.team.contributors.table.heading.taskscompleted")}
                </Box>
              </TableCell>
              <TableCell align="center">{t("management.view.stats.team.contributors.table.heading.recentactivity")}</TableCell>
              <TableCell align="center">{t("management.view.stats.team.contributors.table.heading.progress")}</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {contributors.map(c => ({ ...c, data: (contributorsData.find(cd => cd.id === c.contributorId)) })).map((contributor, index) => {
              const completionRate = getCompletionRate(contributor.tasks.completedCount, contributor.tasks.totalCount)
              const thumbnailUrl = contributor.data?.profileMedia?.thumbnailUrl
              return (
                <StyledTableRow key={contributor.contributorId}>
                  <StyledTableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      {thumbnailUrl ? (
                        <Avatar src={thumbnailUrl} />
                      ) : (<Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: "linear-gradient(135deg, #0A2239, #7D99BA 100%)",
                          fontWeight: 600,
                        }}
                      >
                        <Person />
                      </Avatar>)}
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {contributor.data.fullName || `${index + 1}`}
                        </Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Chip
                      label={contributor.tasks.totalCount}
                      size="small"
                      sx={{
                        backgroundColor: "#e0e7ff",
                        color: "#3730a3",
                        fontWeight: 600,
                        minWidth: 50,
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                      <Typography variant="body2" fontWeight={600}>
                        {contributor.tasks.totalEffort}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        hrs
                      </Typography>
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Chip
                      label={contributor.tasks.completedCount}
                      size="small"
                      sx={{
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        fontWeight: 600,
                        minWidth: 50,
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Chip
                      label={contributor.tasks.recentlyCompletedCount}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: "#f59e0b",
                        color: "#d97706",
                        fontWeight: 600,
                        minWidth: 50,
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Box sx={{ minWidth: 120 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography variant="caption" fontWeight={600}>
                          {completionRate}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={completionRate}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: getProgressColor(completionRate),
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  )
}

export default ContributorsDetails
