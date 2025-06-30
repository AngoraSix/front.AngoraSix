"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Grid,
  Tooltip,
  IconButton,
  Fade,
  Alert,
  Divider,
} from "@mui/material"
import { HowToVote, CheckCircle, Schedule, Info, Group, AccountBalance } from "@mui/icons-material"
import { useTranslation } from "next-i18next"
import { PieChartCard } from "../View/Sections/ManagementCapsSection/Cards/Cards.component"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

const StyledDecisionCard = styled(Card)(({ theme, status }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: status === "open" ? "2px solid #1B5993" : "1px solid rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(3),
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background:
      status === "open"
        ? "linear-gradient(90deg, #1B5993, #AFC1D6 100%)"
        : "linear-gradient(90deg, #7D99BA, #DCE7EA 100%)",
  },
}))

const OwnershipCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(4),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #0A2239, #FE5F55 100%)",
  },
}))

const VoteButton = styled(Button)(({ theme, selected }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5, 3),
  textTransform: "none",
  fontWeight: 600,
  border: selected ? "2px solid #1B5993" : "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: selected ? "#DCE7EA" : "transparent",
  color: selected ? "#0A2239" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: selected ? "#AFC1D6" : "rgba(27, 89, 147, 0.04)",
    borderColor: "#1B5993",
  },
}))

const ManagementDecisions = ({ decisionsData, loading, managementId }) => {
  const { t } = useTranslation(["management.decisions", "common"])
  const theme = useTheme()
  const [userVotes, setUserVotes] = useState({})
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(null)

  const handleVote = (decisionId, optionLabel) => {
    setUserVotes((prev) => ({
      ...prev,
      [decisionId]: optionLabel,
    }))
    setShowVoteConfirmation(decisionId)
    setTimeout(() => setShowVoteConfirmation(null), 3000)
  }

  const calculateVotePercentages = (decision) => {
    const totalVotes = decision.options.reduce((sum, option) => sum + option.votes, 0)
    const awaitingVotes = decision.totalEligibleVoters - decision.votedUserIds.length

    return decision.options
      .map((option) => ({
        ...option,
        percentage: totalVotes > 0 ? (option.votes / decision.totalEligibleVoters) * 100 : 0,
      }))
      .concat([
        {
          label: "Awaiting Vote",
          votes: awaitingVotes,
          percentage: (awaitingVotes / decision.totalEligibleVoters) * 100,
        },
      ])
  }

  const formatDeadline = (deadline) => {
    const date = new Date(deadline)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  // Preparar datos para el gráfico de ownership
  const ownershipChartData = [
    {
      label: "Tu Ownership",
      value: decisionsData.ownership.ownershipPercentage,
      color: "#FE5F55",
    },
    {
      label: "Otros Socios",
      value: 100 - decisionsData.ownership.ownershipPercentage,
      color: "#AFC1D6",
    },
  ]

  if (loading) {
    return <Box>Loading...</Box>
  }

  return (
    <Box className="management-decisions-container">
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0A2239",
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <HowToVote sx={{ fontSize: 32, color: "#1B5993" }} />
          {t("decisions.title", "Decisiones del Proyecto")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("decisions.subtitle", "Participa en las decisiones importantes del proyecto y consulta los resultados.")}
        </Typography>
      </Box>

      {/* Ownership Section */}
      <OwnershipCard>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <AccountBalance sx={{ fontSize: 28, color: "#1B5993" }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0A2239" }}>
              {t("decisions.ownership.title", "Tu Participación")}
            </Typography>
            <Tooltip
              title={t(
                "decisions.ownership.tooltip",
                "Tu porcentaje de ownership determina tu peso en las decisiones del proyecto",
              )}
            >
              <IconButton size="small">
                <Info sx={{ fontSize: 18, color: "#7D99BA" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <PieChartCard title="" data={ownershipChartData} isMobile={false} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "#FE5F55",
                    mb: 1,
                  }}
                >
                  {decisionsData.ownership.ownershipPercentage}%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#0A2239",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  {t("decisions.ownership.current", "Tu participación actual en este proyecto")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(
                    "decisions.ownership.description",
                    "Este porcentaje representa tu peso en las votaciones y tu participación en las ganancias del proyecto.",
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </OwnershipCard>

      {/* Decisions List */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#0A2239",
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Group sx={{ color: "#1B5993" }} />
          {t("decisions.list.title", "Decisiones")}
        </Typography>

        {decisionsData.decisions.map((decision) => {
          const votePercentages = calculateVotePercentages(decision)
          const userHasVoted = decision.votedUserIds.includes("user123") || userVotes[decision.id]
          const isOpen = decision.status === "open"
          const deadlineSoon = isDeadlineSoon(decision.deadline)

          return (
            <Fade in={true} key={decision.id}>
              <StyledDecisionCard status={decision.status}>
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box flex={1}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0A2239",
                          mb: 1,
                        }}
                      >
                        {decision.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {decision.description}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={1}>
                      {isOpen ? (
                        <Chip
                          icon={<Schedule />}
                          label={t("decisions.status.open", "Abierta")}
                          color="primary"
                          variant="outlined"
                        />
                      ) : (
                        <Chip icon={<CheckCircle />} label={t("decisions.status.closed", "Cerrada")} color="default" />
                      )}

                      {deadlineSoon && isOpen && (
                        <Chip label={t("decisions.deadline.soon", "Urgente")} color="warning" size="small" />
                      )}
                    </Box>
                  </Box>

                  {/* Deadline */}
                  <Box display="flex" alignItems="center" gap={1} mb={3}>
                    <Schedule sx={{ fontSize: 16, color: "#7D99BA" }} />
                    <Typography variant="body2" color="text.secondary">
                      {isOpen
                        ? t(
                            "decisions.deadline.vote_until",
                            `Tenés tiempo para votar hasta el ${formatDeadline(decision.deadline)}`,
                          )
                        : t("decisions.deadline.closed_on", `Cerrada el ${formatDeadline(decision.deadline)}`)}
                    </Typography>
                  </Box>

                  {/* Vote Confirmation */}
                  {showVoteConfirmation === decision.id && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {t("decisions.vote.confirmed", `Tu voto por "${userVotes[decision.id]}" ha sido registrado.`)}
                    </Alert>
                  )}

                  {/* Voting Options */}
                  {isOpen && !userHasVoted && (
                    <Box mb={3}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        {t("decisions.vote.options", "Opciones de voto:")}
                      </Typography>
                      <Box display="flex" gap={2} flexWrap="wrap">
                        {decision.options.map((option) => (
                          <VoteButton
                            key={option.label}
                            onClick={() => handleVote(decision.id, option.label)}
                            selected={userVotes[decision.id] === option.label}
                          >
                            {option.label}
                          </VoteButton>
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* User's Vote Display */}
                  {userHasVoted && (
                    <Box mb={3}>
                      <Alert severity="info" icon={<CheckCircle />}>
                        {userVotes[decision.id]
                          ? t("decisions.vote.current", `Tu voto actual: "${userVotes[decision.id]}"`)
                          : t("decisions.vote.already_voted", "Ya has votado en esta decisión")}
                      </Alert>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Results */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("decisions.results.title", "Resultados parciales:")}
                    </Typography>

                    {votePercentages.map((option, index) => (
                      <Box key={option.label} mb={1.5}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {option.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {option.votes} votos ({option.percentage.toFixed(1)}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={option.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "rgba(0, 0, 0, 0.08)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                option.label === "Awaiting Vote" ? "#DCE7EA" : index % 2 === 0 ? "#1B5993" : "#FE5F55",
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    ))}

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      {t(
                        "decisions.results.total_voters",
                        `Total de votantes elegibles: ${decision.totalEligibleVoters}`,
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledDecisionCard>
            </Fade>
          )
        })}
      </Box>
    </Box>
  )
}

export default ManagementDecisions
