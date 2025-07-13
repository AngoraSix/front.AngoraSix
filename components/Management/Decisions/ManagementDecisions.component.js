"use client"

import { AccountBalance, CheckCircle, Group, HowToVote, Info, Schedule } from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
import { PieChartCard } from "../View/Sections/ManagementCapsSection/Cards/Cards.component"

const StyledDecisionCard = styled(Card)(({ theme, status }) => ({
  borderRadius: 12,
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
  border: status === "open" ? "2px solid #1B5993" : "1px solid rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background:
      status === "open"
        ? "linear-gradient(90deg, #1B5993, #AFC1D6 100%)"
        : "linear-gradient(90deg, #7D99BA, #DCE7EA 100%)",
  },
}))

const OwnershipCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  overflow: "hidden",
  position: "relative",
  marginBottom: theme.spacing(3),
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

const VoteButton = styled(Button)(({ theme, selected, uservoted }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 2.5),
  textTransform: "none",
  fontWeight: 600,
  minHeight: 36,
  border: selected ? "2px solid #1B5993" : uservoted ? "2px solid #FE5F55" : "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: selected ? "#DCE7EA" : uservoted ? "#FE5F55" : "transparent",
  color: selected ? "#0A2239" : uservoted ? "#ffffff" : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: selected ? "#AFC1D6" : uservoted ? "#FE5F55" : "rgba(27, 89, 147, 0.04)",
    borderColor: selected ? "#1B5993" : uservoted ? "#FE5F55" : "#1B5993",
  },
}))

const ManagementDecisions = ({ decisionsData, loading, managementId }) => {
  const { t } = useTranslation("management.decisions")
  const theme = useTheme()
  const [userVotes, setUserVotes] = useState({})
  const [showVoteConfirmation, setShowVoteConfirmation] = useState(null)
  const router = useRouter()
  const { locale } = router

  const handleVote = (decisionId, optionLabel) => {
    setUserVotes((prev) => ({
      ...prev,
      [decisionId]: optionLabel,
    }))
    setShowVoteConfirmation(decisionId)
    setTimeout(() => setShowVoteConfirmation(null), 3000)
  }

  const calculateAwaitingPercentage = (decision) => {
    const totalVotedPercentage = decision.options.reduce((sum, option) => sum + option.percentage, 0)
    return Math.max(0, 100 - totalVotedPercentage)
  }

  const formatDeadline = (deadline, locale) => {
    const date = new Date(deadline)
    return date.toLocaleDateString(locale || "es-ES", {
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
      <Box mb={3}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#0A2239",
            mb: 0.5,
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
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <AccountBalance sx={{ fontSize: 24, color: "#1B5993" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0A2239" }}>
              {t("decisions.ownership.title", "Tu Participación")}
            </Typography>
            <Tooltip
              title={t("decisions.ownership.tooltip",)}
            >
              <IconButton size="small">
                <Info sx={{ fontSize: 16, color: "#7D99BA" }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ height: 200 }}>
                <PieChartCard title="" data={ownershipChartData} isMobile={false} />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
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
                    mb: 1,
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
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Group sx={{ color: "#1B5993" }} />
          {t("decisions.list.title", "Decisiones")}
        </Typography>

        {decisionsData.decisions.map((decision) => {
          const awaitingPercentage = calculateAwaitingPercentage(decision)
          const userHasVoted = decision.vote !== null || userVotes[decision.id]
          const isOpen = decision.status === "open"
          const deadlineSoon = isDeadlineSoon(decision.deadline)

          return (
            <Fade in={true} key={decision.id}>
              <StyledDecisionCard status={decision.status}>
                <CardContent sx={{ p: 2.5 }}>
                  {/* Header */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                    <Box flex={1}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#0A2239",
                          mb: 0.5,
                          fontSize: "1.1rem",
                        }}
                      >
                        {decision.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
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
                          size="small"
                        />
                      ) : (
                        <Chip
                          icon={<CheckCircle />}
                          label={t("decisions.status.closed", "Cerrada")}
                          color="default"
                          size="small"
                        />
                      )}

                      {deadlineSoon && isOpen && (
                        <Chip label={t("decisions.deadline.soon", "Urgente")} color="warning" size="small" />
                      )}
                    </Box>
                  </Box>

                  {/* Deadline */}
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Schedule sx={{ fontSize: 14, color: "#7D99BA" }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                      {isOpen
                        ? t(
                          "decisions.deadline.vote_until",
                        ).replace(
                          "{{date}}", formatDeadline(decision.deadline, locale))
                        : t("decisions.deadline.closed_on").replace(
                          "{{date}}", formatDeadline(decision.deadline, locale))}
                    </Typography>
                  </Box>

                  {/* Vote Confirmation */}
                  {showVoteConfirmation === decision.id && (
                    <Alert severity="success" sx={{ mb: 2, py: 0.5 }}>
                      {t("decisions.vote.confirmed").replace("{{option}}", userVotes[decision.id])}
                    </Alert>
                  )}

                  {/* Voting Options */}
                  {isOpen && (
                    <Box mb={2}>
                      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: "0.9rem" }}>
                        {t("decisions.vote.options", "Opciones de voto:")}
                      </Typography>
                      <Box display="flex" gap={1.5} flexWrap="wrap">
                        {decision.options.map((option) => {
                          const isUserVote = decision.vote === option.label
                          const isCurrentVote = userVotes[decision.id] === option.label
                          return (
                            <VoteButton
                              key={option.label}
                              onClick={() => handleVote(decision.id, option.label)}
                              selected={isCurrentVote}
                              uservoted={isUserVote ? 1 : 0}
                              disabled={decision.vote !== null}
                            >
                              {option.label}
                              {isUserVote && " ✓"}
                            </VoteButton>
                          )
                        })}
                      </Box>
                    </Box>
                  )}

                  {/* User's Vote Display for Closed Decisions */}
                  {!isOpen && decision.vote && (
                    <Box mb={2}>
                      <Alert severity="info" icon={<CheckCircle />} sx={{ py: 0.5 }}>
                        {t("decisions.vote.final").replace("{{option}}", decision.vote)}
                      </Alert>
                    </Box>
                  )}

                  <Divider sx={{ my: 1.5 }} />

                  {/* Results */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, fontSize: "0.9rem" }}>
                      {t("decisions.results.title", "Resultados (por ownership):")}
                    </Typography>

                    {decision.options.map((option, index) => (
                      <Box key={option.label} mb={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
                            {option.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                            {option.votes} votos ({option.percentage.toFixed(1)}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={option.percentage}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(0, 0, 0, 0.06)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: index % 2 === 0 ? "#1B5993" : "#FE5F55",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    ))}

                    {/* Awaiting Votes */}
                    {awaitingPercentage > 0 && (
                      <Box mb={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
                            {t("decisions.results.awaiting", "Pendientes de votar")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                            {decision.totalEligibleVoters - decision.votedUserIds.length} votos (
                            {awaitingPercentage.toFixed(1)}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={awaitingPercentage}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(0, 0, 0, 0.06)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#DCE7EA",
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      {t("decisions.results.total_voters").replace("{{count}}", decision.totalEligibleVoters)}
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
