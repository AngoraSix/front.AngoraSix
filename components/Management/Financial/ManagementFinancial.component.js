"use client"

import { AccountBalance, Payments, QueryStats, TrendingDown, TrendingUp } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Fade,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
} from "@mui/material"
import { LineChart } from "@mui/x-charts/LineChart"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"

const ManagementFinancial = () => {
  const { t } = useTranslation("management.financial")
  const router = useRouter()
  const { managementId } = router.query

  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  // Mock data - en producción vendría del backend
  const [financialData] = useState({
    projectId: "project456",
    balances: {
      USD: {
        accountId: "USD-ACC-001",
        overview: {
          monthly: {
            lastMonth: { income: 13148, payments: 7243 },
            currentMonth: { income: 4509, payments: 900, forecastedPayments: 7533 },
          },
          chart: {
            dates: ["2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"],
            income: [13000, 11400, 9000, 15000, 11000, 14000],
            payments: [6000, 7900, 7000, 8750, 9000, 10000],
          },
        },
      },
      ETH: {
        accountId: "ETH-ACC-1",
        overview: {
          monthly: {
            lastMonth: { income: 50, payments: 30 },
            currentMonth: { income: 20, payments: 10, forecastedPayments: 25 },
          },
          chart: {
            dates: ["2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"],
            income: [30, 30, 40, 60, 50, 20],
            payments: [23, 18, 25, 35, 30, 10],
          },
        },
      },
    },
    members: [
      {
        userId: "user123",
        name: "Ger Roza",
        avatarUrl: "/images/members/ger.jpg",
        history: {
          dates: ["2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"],
          payments: {
            USD: [830, 700, 500, 700, 400, 600],
            ETH: [2, 4, 2, 3, 1.5, 2.5],
          },
        },
        lastMonthPayment: { USD: 2200, ETH: 9 },
        currentBalance: { USD: 1200, ETH: 5 },
        forecast: { USD: 2500, ETH: 10 },
      },
      {
        userId: "user456",
        name: "Juli",
        avatarUrl: "/images/members/juli.jpg",
        history: {
          dates: ["2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"],
          payments: {
            USD: [300, 350, 400, 600, 300, 500],
            ETH: [1, 1, 1.5, 2.5, 1, 2],
          },
        },
        lastMonthPayment: { USD: 1800, ETH: 7 },
        currentBalance: { USD: 900, ETH: 3.5 },
        forecast: { USD: 2000, ETH: 8 },
      },
      {
        userId: "user789",
        name: "Marcos",
        avatarUrl: "/images/members/marcos.jpg",
        history: {
          dates: ["2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-01", "2025-07-01"],
          payments: {
            USD: [200, 200, 300, 500, 200, 400],
            ETH: [1, 1, 1, 2, 0.8, 1.5],
          },
        },
        lastMonthPayment: { USD: 1400, ETH: 5.5 },
        currentBalance: { USD: 700, ETH: 2.8 },
        forecast: { USD: 1600, ETH: 6.5 },
      },
    ],
    currencyList: ["USD", "ETH"],
  })

  const handleCurrencyChange = (event, newCurrency) => {
    if (newCurrency !== null) {
      setSelectedCurrency(newCurrency)
    }
  }

  const formatCurrency = (amount, currency) => {
    if (currency === "USD") {
      return `$${amount}`
    } else if (currency === "ETH") {
      return `${amount} ETH`
    }
    return amount
  }

  const currentBalance = financialData.balances[selectedCurrency]

  // Prepare chart data for MUI X Charts
  const chartDates = currentBalance.overview.chart.dates.map((date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  )
  const incomeData = currentBalance.overview.chart.income
  const paymentsData = currentBalance.overview.chart.payments

  const getMemberChartData = (member) => {
    return {
      dates: member.history.dates.map((date) =>
        new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ),
      payments: member.history.payments[selectedCurrency],
    }
  }

  const handlePayNow = (memberId, amount, currency) => {
    // Placeholder for actual payment logic
    alert(`Initiating payment for ${formatCurrency(amount, currency)} for member ${memberId}`)
    console.log(`Pay Now clicked for member ${memberId}: ${amount} ${currency}`)
  }

  return (
    <Box className="management-financial-container">
      {/* Header with Currency Selector */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" className="page-title">
          {t("title")}
        </Typography>
        <ToggleButtonGroup
          value={selectedCurrency}
          exclusive
          onChange={handleCurrencyChange}
          aria-label="currency selector"
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              border: "1px solid #1B5993",
              color: "#1B5993",
              "&.Mui-selected": {
                backgroundColor: "#1B5993",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0A2239",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(27, 89, 147, 0.1)",
              },
            },
          }}
        >
          {financialData.currencyList.map((currency) => (
            <ToggleButton key={currency} value={currency} aria-label={currency}>
              {currency}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Fade in={true} timeout={600}>
        <Box>
          {/* Financial Overview Section */}
          <Card className="financial-overview-card" sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountBalance sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">
                  {t("overview.title")} - {currentBalance.accountId}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {/* Chart Section */}
                <Grid item xs={12} md={8}>
                  <Box height={300}>
                    <LineChart
                      xAxis={[
                        {
                          scaleType: "point",
                          data: chartDates,
                        },
                      ]}
                      series={[
                        {
                          data: incomeData,
                          label: t("overview.income"),
                          color: "#1B5993",
                        },
                        {
                          data: paymentsData,
                          label: t("overview.payments"),
                          color: "#FE5F55",
                        },
                      ]}
                      width={undefined}
                      height={300}
                      margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                      grid={{ vertical: true, horizontal: true }}
                    />
                  </Box>
                </Grid>

                {/* Metrics Section */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {/* Last Month */}
                    <Card variant="outlined" className="metric-card">
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {t("overview.lastMonth")}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <TrendingUp sx={{ color: "success.main", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {t("overview.income")}:{" "}
                            {formatCurrency(currentBalance.overview.monthly.lastMonth.income, selectedCurrency)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <TrendingDown sx={{ color: "error.main", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {t("overview.payments")}:{" "}
                            {formatCurrency(currentBalance.overview.monthly.lastMonth.payments, selectedCurrency)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Current Month */}
                    <Card variant="outlined" className="metric-card">
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {t("overview.currentMonth")}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <TrendingUp sx={{ color: "success.main", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {t("overview.income")}:{" "}
                            {formatCurrency(currentBalance.overview.monthly.currentMonth.income, selectedCurrency)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <Payments sx={{ color: "warning.main", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {t("overview.payments")}:{" "}
                            {formatCurrency(currentBalance.overview.monthly.currentMonth.payments, selectedCurrency)}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <QueryStats sx={{ color: "info.main", mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">
                            {t("overview.forecast")}:{" "}
                            {formatCurrency(
                              currentBalance.overview.monthly.currentMonth.forecastedPayments,
                              selectedCurrency,
                            )}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Members Financial Section */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t("members.title")}
          </Typography>

          <Grid container spacing={3}>
            {financialData.members.map((member) => {
              const memberData = getMemberChartData(member)
              const hasCurrentBalance = member.currentBalance[selectedCurrency] > 0
              return (
                <Grid item xs={12} key={member.userId}>
                  <Card className="member-financial-card">
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar src={member.avatarUrl} alt={member.name} sx={{ width: 40, height: 40, mr: 2 }} />
                        <Typography variant="h6">{member.name}</Typography>
                      </Box>

                      <Grid container spacing={3}>
                        {/* Member Chart */}
                        <Grid item xs={12} md={8}>
                          <Box height={200}>
                            <LineChart
                              xAxis={[
                                {
                                  scaleType: "point",
                                  data: memberData.dates,
                                },
                              ]}
                              yAxis={[{ min: 0 }]}
                              series={[
                                {
                                  data: memberData.payments,
                                  label: t("members.payments"),
                                  color: "#1B5993",
                                },
                              ]}
                              width={undefined}
                              height={200}
                              margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
                              grid={{ vertical: true, horizontal: true }}
                            />
                          </Box>
                        </Grid>

                        {/* Member Metrics */}
                        <Grid item xs={12} md={4}>
                          <Box display="flex" flexDirection="column" gap={1.5}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {t("members.lastMonth")}
                              </Typography>
                              <Typography variant="h6" color="primary.main">
                                {formatCurrency(member.lastMonthPayment[selectedCurrency], selectedCurrency)}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {t("members.currentBalance")}
                              </Typography>
                              <Typography variant="h6" color="success.main">
                                {formatCurrency(member.currentBalance[selectedCurrency], selectedCurrency)}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {t("members.forecast")}
                              </Typography>
                              <Typography variant="h6" color="info.main">
                                {formatCurrency(member.forecast[selectedCurrency], selectedCurrency)}
                              </Typography>
                            </Box>
                            {hasCurrentBalance && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handlePayNow(member.userId, member.currentBalance[selectedCurrency], selectedCurrency)
                                }
                                sx={{
                                  mt: 2,
                                  backgroundColor: "#0A2239",
                                  color: "#ffffff",
                                  "&:hover": {
                                    backgroundColor: "#030D16", // A slightly darker red for hover
                                  },
                                }}
                              >
                                {t("members.payNow")}
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Fade>
    </Box>
  )
}

export default ManagementFinancial
