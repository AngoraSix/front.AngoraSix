import { Assessment, Group, TrendingUp } from "@mui/icons-material"
import { Box, Container, Fade, Grow, Typography, useTheme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled } from "@mui/system"
import { useTranslation } from "next-i18next"
import PropTypes from "prop-types"
import { useState } from "react"
import { ChartToggleCard, LineChartCard, PieChartCard, StatCard } from "./Cards"
import ContributorsDetails from "./ContributorsDetails"

const SectionContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  borderRadius: 24,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "linear-gradient(90deg, #0A2239, #7D99BA 100%)",
  },
}))

const CardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}))

const ChartsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  fontSize: "1.75rem",
  letterSpacing: "-0.025em",
}))

const ManagementCapsSection = ({
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
  contributorsData
}) => {
  const { t } = useTranslation("management.view")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [selectedFinanceCurrency, setSelectedFinanceCurrency] = useState("PROFIT_SHARES")

  const handleFinanceCurrencyChange = (event, newCurrency) => {
    if (newCurrency !== null) {
      setSelectedFinanceCurrency(newCurrency)
    }
  }

  const project = {
    tasks: projectManagementTasksStats.project,
    accounts: projectManagementAccountingStats.project,
  }

  const contributor = {
    tasks: projectManagementTasksStats.contributor,
    accounts: projectManagementAccountingStats.contributor,
  }

  const projectCards = [
    {
      label: t("management.view.stats.tasks.total"),
      value: project.tasks?.tasks.totalCount,
      background: theme.palette.grey[100],
      trend: "up",
    },
    {
      label: t("management.view.stats.tasks.completed"),
      value: project.tasks?.tasks.completedCount,
      background: theme.palette.green?.light || "#dcfce7",
      trend: "up",
    },

    {
      label: t("management.view.stats.tasks.pending"),
      value: project.tasks?.tasks.pendingCount,
      background: theme.palette.yellow?.light || "#fefce8",
      trend: "up",
    },
    {
      label: t("management.view.stats.tasks.invested_effort"),
      value: `${project.tasks?.tasks.totalEffort}h`,
      background: theme.palette.red?.light || "#fef2f2",
      trend: "up",
    },
    {
      label: `${t(`management.view.stats.currencies.${project.accounts?.ownership.currency}`, { defaultValue: project.accounts?.ownership.currency })} - ${t(
        "management.view.stats.accounts.balance",
      )}`,
      value: `${project.accounts?.ownership.balance.toFixed(4)}`,
      background: theme.palette.blue?.light || "#dbeafe",
      trend: "up",
    },
  ]

  if (project.accounts?.finance?.length > 0) {
    const finance = project.accounts.finance.map((it) => ({
      label: `${t(`management.view.stats.currencies.${it.currency}`, { defaultValue: it.currency })} - ${t("management.view.stats.accounts.balance")}`,
      value: `${it.currency.toUpperCase() != 'PROFIT_SHARES' ? '$' : ''}${it.balance}`,
      background: theme.palette.blue?.light || "#dbeafe",
      trend: "up",
    }))
    projectCards.push(...finance)
  }

  const contributorCards = [
    {
      label: t("management.view.stats.tasks.total"),
      value: contributor.tasks?.tasks.totalCount,
      background: theme.palette.grey[100],
    },
    {
      label: t("management.view.stats.tasks.completed"),
      value: contributor.tasks?.tasks.completedCount,
      background: theme.palette.green?.light || "#dcfce7",
    },
    {
      label: t("management.view.stats.tasks.pending"),
      value: contributor.tasks?.tasks.pendingCount,
      background: theme.palette.yellow?.light || "#fefce8",
    },
    {
      label: t("management.view.stats.tasks.invested_effort"),
      value: `${contributor.tasks?.tasks.totalEffort}h`,
      background: theme.palette.red?.light || "#fef2f2",
    },
    {
      label: `${t(`management.view.stats.currencies.${contributor.accounts?.ownership.currency}`, { defaultValue: contributor.accounts?.ownership.currency })} - ${t("management.view.stats.accounts.balance")}`,
      value: `${contributor.accounts?.ownership.balance.toFixed(4)}`,
      background: theme.palette.blue?.light || "#dbeafe",
    },
  ]

  if (contributor.accounts?.finance?.length > 0) {
    const finance = contributor.accounts.finance.map((it) => ({
      label: `${t(`management.view.stats.currencies.${it.currency}`, { defaultValue: it.currency })} - ${t("management.view.stats.accounts.balance")}`,
      value: `${it.currency.toUpperCase() != 'PROFIT_SHARES' ? '$' : ''}${it.balance.toFixed(2)}`,
      background: theme.palette.blue?.light || "#dbeafe",
    }))
    contributorCards.push(...finance)
  }

  const toPercentage = (amount, total) => {
    return Math.round((amount * 100) / total)
  }

  const projectOwnershipChartData = [
    {
      id: getRandomId(),
      value: toPercentage(contributor?.accounts?.ownership.balance, project.accounts?.ownership.balance),
      label: `${t("management.view.stats.tasks.label.you")} ${toPercentage(
        contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance,
      )}%`,
      color: "#030D16",
    },
    {
      id: getRandomId(),
      value: toPercentage(
        project.accounts?.ownership.balance - contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance,
      ),
      label: `${t("management.view.stats.tasks.label.others")} ${toPercentage(
        project.accounts?.ownership.balance - contributor?.accounts?.ownership.balance,
        project.accounts?.ownership.balance,
      )}%`,
      color: "#AFC1D6",
    },
  ]

  const projectTasksChartData = [
    {
      id: getRandomId(),
      value: toPercentage(project.tasks?.tasks.assignedCount, project.tasks?.tasks.totalCount),
      label: `${t("management.view.stats.tasks.label.ASSIGNED")} ${toPercentage(
        project.tasks?.tasks.assignedCount,
        project.tasks?.tasks.totalCount,
      )}%`,
      color: "#AFC1D6",
    },
    {
      id: getRandomId(),
      value: toPercentage(project.tasks?.tasks.completedCount, project.tasks?.tasks.totalCount),
      label: `${t("management.view.stats.tasks.label.DONE")} ${toPercentage(
        project.tasks?.tasks.completedCount,
        project.tasks?.tasks.totalCount,
      )}%`,
      color: "#030D16",
    },
    {
      id: getRandomId(),
      value: toPercentage(project.tasks?.tasks.pendingCount, project.tasks?.tasks.totalCount),
      label: `${t("management.view.stats.tasks.label.PENDING")} ${toPercentage(
        project.tasks?.tasks.pendingCount,
        project.tasks?.tasks.totalCount,
      )}%`,
      color: "#7D99BA",
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Personal Contributor subsection */}
      {contributor.tasks && (
        <Fade in timeout={2000}>
          <SectionContainer>
            <SectionTitle variant="h5">
              <TrendingUp sx={{ fontSize: 28 }} />
              {t("management.view.stats.personal.title")}
            </SectionTitle>

            <Grow in timeout={1400}>
              <ChartsGrid>
                {contributor.accounts && (
                  <Fade in timeout={1800}>
                    <div>
                      <ChartToggleCard
                        title={t("management.view.stats.personal.ownership.title")}
                        pieData={projectOwnershipChartData}
                        lineData={contributor.accounts.ownership.forecastedBalance || {}}
                        isMobile={isMobile}
                      />
                    </div>
                  </Fade>
                )}
                {contributor.accounts?.finance?.length > 0 && (
                  <Fade in timeout={2000}>
                    <div>
                      <LineChartCard
                        title={t("management.view.stats.personal.financialforecast.title")}
                        data={
                          contributor.accounts.finance.find((f) => f.currency === selectedFinanceCurrency)
                            ?.forecastedBalance || {}
                        }
                        isMobile={isMobile}
                        currencies={contributor.accounts.finance.map((f) => f.currency)}
                        selectedCurrency={selectedFinanceCurrency}
                        onCurrencyChange={handleFinanceCurrencyChange}
                      />
                    </div>
                  </Fade>
                )}
              </ChartsGrid>
            </Grow>
            <Grow in timeout={2200}>
              <CardsGrid>
                {contributorCards.map((card, index) => (
                  <Fade in timeout={2400 + index * 100} key={index}>
                    <div>
                      <StatCard
                        label={card.label}
                        value={card.value}
                        background={card.background}
                        subtext={card.subtext}
                      />
                    </div>
                  </Fade>
                ))}
              </CardsGrid>
            </Grow>
          </SectionContainer>
        </Fade>
      )}

      {/* General Project subsection */}
      <Fade in timeout={800}>
        <SectionContainer>
          <SectionTitle variant="h4">
            <Assessment sx={{ fontSize: 32 }} />
            {t("management.view.stats.title")}
          </SectionTitle>

          <Grow in timeout={1000}>
            <CardsGrid>
              {projectCards.map((card, index) => (
                <Fade in timeout={1200 + index * 100} key={index}>
                  <Box>
                    <StatCard
                      label={card.label}
                      value={card.value}
                      background={card.background}
                      subtext={card.subtext}
                      trend={card.trend}
                    />
                  </Box>
                </Fade>
              ))}
            </CardsGrid>
          </Grow>

          <Grow in timeout={1400}>
            <ChartsGrid>
              {project.tasks?.tasks.totalCount > 0 && (
                <Fade in timeout={1600}>
                  <div>
                    <PieChartCard title={t("management.view.stats.personal.taskdistribution.title")} data={projectTasksChartData} isMobile={isMobile} />
                  </div>
                </Fade>
              )}
            </ChartsGrid>
          </Grow>
        </SectionContainer>
      </Fade>

      { /* Contributors Statistics subsection */}
      <Fade in timeout={2600}>
        <SectionContainer>
          <SectionTitle variant="h5">
            <Group sx={{ fontSize: 28 }} />
            {t("management.view.stats.contributors.details")}
          </SectionTitle>

          <Grow in timeout={2800}>
            <Box>
              <ContributorsDetails contributors={project.tasks.contributors} contributorsData={contributorsData} />
            </Box>
          </Grow>
        </SectionContainer>
      </Fade>
    </Container>
  )
}

ManagementCapsSection.defaultProps = {
  isAdmin: false,
}

ManagementCapsSection.propTypes = {
  projectManagement: PropTypes.object.isRequired,
  projectManagementTasksStats: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
}

const getRandomId = (salt = 0) => {
  return Date.now() + Math.random() + salt
}

export default ManagementCapsSection
