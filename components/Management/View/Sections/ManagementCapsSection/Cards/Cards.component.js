"use client"

import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material"
import { PieChart, LineChart } from "@mui/x-charts"
import { TrendingUp, TrendingDown, Remove, PieChartOutlined, ShowChart } from "@mui/icons-material"
import { useState } from "react"

export const StatCard = ({ label, value, subtext, background = "#f8fafc", color = "#1e293b", trend, icon }) => {
  const theme = useTheme()

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp sx={{ fontSize: 16, color: "#10b981" }} />
    if (trend === "down") return <TrendingDown sx={{ fontSize: 16, color: "#ef4444" }} />
    return <Remove sx={{ fontSize: 16, color: "#6b7280" }} />
  }

  const getGradientBackground = (bg) => {
    const gradients = {
      [theme.palette.grey[100]]: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      [theme.palette.green?.light]: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      [theme.palette.red?.light]: "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
      [theme.palette.blue?.light]: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      [theme.palette.yellow?.light]: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
    }
    return gradients[bg] || `linear-gradient(135deg, ${bg} 0%, ${bg}dd 100%)`
  }

  return (
    <Card
      className="stat-card"
      sx={{
        background: getGradientBackground(background),
        color,
      }}
    >
      <CardContent className="stat-card-content">
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2} className="stat-card-header">
          <Typography variant="overline" className="stat-card-label">
            {label}
          </Typography>
          {trend && <Chip icon={getTrendIcon()} label={trend} size="small" className="stat-card-trend" />}
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1} className="stat-card-body">
          <Typography variant="h4" className="stat-card-value">
            {value}
          </Typography>

          {subtext && (
            <Typography variant="caption" className="stat-card-subtext">
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export const PieChartCard = ({ title, data, isMobile }) => {
  const theme = useTheme()

  const chartConfig = {
    width: 380,
    height: 200,
    margin: { left: -30, top: 20, bottom: 20 },
    slotProps: {
      legend: {
        direction: "column",
        position: {
          vertical: "middle",
          horizontal: "right",
        },
        itemMarkWidth: 12,
        itemMarkHeight: 12,
        markGap: 8,
        itemGap: 12,
        labelStyle: {
          fontSize: 13,
          fontWeight: 500,
        },
      },
    },
  }

  const mobileConfig = {
    width: 280,
    height: 300,
    margin: { left: 20, top: 20, bottom: 60 },
    slotProps: {
      legend: {
        direction: "row",
        position: {
          vertical: "bottom",
          horizontal: "middle",
        },
        itemMarkWidth: 10,
        itemMarkHeight: 10,
        markGap: 6,
        itemGap: 16,
        labelStyle: {
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
  }

  const config = isMobile ? mobileConfig : chartConfig

  // Enhanced color palette
  const enhancedData = data.map((item, index) => ({
    ...item,
    color: item.color || ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#ef4444"][index % 6],
  }))

  return (
    <Card className="chart-card pie-chart-card">
      <CardContent className="chart-card-content">
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h6" className="chart-card-title">
            {title.toUpperCase()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <PieChart
            series={[
              {
                data: enhancedData,
                innerRadius: 35,
                outerRadius: 70,
                paddingAngle: 3,
                cornerRadius: 6,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            {...config}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export const LineChartCard = ({ title, data, isMobile, currencies = [], selectedCurrency, onCurrencyChange }) => {
  const theme = useTheme()

  const chartConfig = {
    width: 380,
    height: 250,
    margin: { left: 60, right: 20, top: 20, bottom: 60 },
  }

  const mobileConfig = {
    width: 280,
    height: 200,
    margin: { left: 40, right: 10, top: 20, bottom: 40 },
  }

  const config = isMobile ? mobileConfig : chartConfig

  const formatPeriod = (period) => {
    const [month, year] = period.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  // Transform data for line chart
  const chartData = Object.entries(data).map(([period, value]) => ({
    period,
    value: Number.parseFloat(value),
    formattedPeriod: formatPeriod(period),
  }))

  return (
    <Card className="chart-card line-chart-card">
      <CardContent className="chart-card-content">
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} className="chart-card-header">
          <Typography variant="h6" className="chart-card-title">
            {title.toUpperCase()}
          </Typography>

          {currencies && currencies.length > 1 && (
            <ToggleButtonGroup
              value={selectedCurrency}
              exclusive
              onChange={onCurrencyChange}
              size="small"
              className="chart-currency-toggle"
            >
              {currencies.map((currency) => (
                <ToggleButton key={currency} value={currency} className="chart-currency-button">
                  {currency}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <LineChart
            dataset={chartData}
            xAxis={[
              {
                dataKey: "formattedPeriod",
                scaleType: "point",
                tickLabelStyle: {
                  fontSize: isMobile ? 10 : 12,
                  angle: isMobile ? -45 : 0,
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  fontSize: isMobile ? 10 : 12,
                },
              },
            ]}
            series={[
              {
                dataKey: "value",
                color: "#FE5F55",
                curve: "catmullRom",
                showMark: true,
                markSize: 6,
              },
            ]}
            {...config}
            grid={{ vertical: true, horizontal: true }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export const ChartToggleCard = ({
  title,
  pieData,
  lineData,
  isMobile,
  currencies,
  selectedCurrency,
  onCurrencyChange,
}) => {
  const [chartType, setChartType] = useState("pie")

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType)
    }
  }

  return (
    <Card className="chart-card chart-toggle-card">
      <CardContent className="chart-card-content">
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} className="chart-card-header">
          <Typography variant="h6" className="chart-card-title">
            {title.toUpperCase()}
          </Typography>

          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            size="small"
            className="chart-type-toggle"
          >
            <ToggleButton value="pie" className="chart-type-button">
              <Tooltip title="Pie Chart">
                <PieChartOutlined sx={{ fontSize: 18 }} />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="line" className="chart-type-button">
              <Tooltip title="Trend Chart">
                <ShowChart sx={{ fontSize: 18 }} />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {currencies && currencies.length > 1 && chartType === "line" && (
          <Box display="flex" justifyContent="center" mb={2}>
            <ToggleButtonGroup
              value={selectedCurrency}
              exclusive
              onChange={onCurrencyChange}
              size="small"
              className="chart-currency-toggle"
            >
              {currencies.map((currency) => (
                <ToggleButton key={currency} value={currency} className="chart-currency-button">
                  {currency}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          {chartType === "pie" ? (
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 35,
                  outerRadius: 70,
                  paddingAngle: 3,
                  cornerRadius: 6,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                },
              ]}
              width={isMobile ? 280 : 380}
              height={isMobile ? 250 : 200}
              margin={isMobile ? { left: 20, top: 20, bottom: 60 } : { left: -30, top: 20, bottom: 20 }}
              slotProps={{
                legend: {
                  direction: isMobile ? "row" : "column",
                  position: {
                    vertical: isMobile ? "bottom" : "middle",
                    horizontal: isMobile ? "middle" : "right",
                  },
                  itemMarkWidth: isMobile ? 10 : 12,
                  itemMarkHeight: isMobile ? 10 : 12,
                  markGap: isMobile ? 6 : 8,
                  itemGap: isMobile ? 16 : 12,
                  labelStyle: {
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 500,
                  },
                },
              }}
            />
          ) : (
            <LineChart
              dataset={Object.entries(lineData).map(([period, value]) => ({
                period,
                value: Number.parseFloat(value),
                formattedPeriod: formatPeriod(period),
              }))}
              xAxis={[
                {
                  dataKey: "formattedPeriod",
                  scaleType: "point",
                  tickLabelStyle: {
                    fontSize: isMobile ? 10 : 12,
                    angle: isMobile ? -45 : 0,
                  },
                },
              ]}
              yAxis={[
                {
                  tickLabelStyle: {
                    fontSize: isMobile ? 10 : 12,
                  },
                },
              ]}
              series={[
                {
                  dataKey: "value",
                  color: "#FE5F55",
                  curve: "catmullRom",
                  showMark: true,
                  markSize: 6,
                },
              ]}
              width={isMobile ? 280 : 380}
              height={isMobile ? 200 : 250}
              margin={
                isMobile ? { left: 40, right: 10, top: 20, bottom: 40 } : { left: 60, right: 20, top: 20, bottom: 60 }
              }
              grid={{ vertical: true, horizontal: true }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

const formatPeriod = (period) => {
  const [month, year] = period.split("-")
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${monthNames[Number.parseInt(month) - 1]} ${year}`
}
