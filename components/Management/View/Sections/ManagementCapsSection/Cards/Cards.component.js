import { Box, Typography, Card, CardContent, useTheme, Chip } from "@mui/material"
import { styled } from "@mui/system"
import { PieChart } from "@mui/x-charts/PieChart"
import { TrendingUp, TrendingDown, Remove } from "@mui/icons-material"

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  },
}))

const ChartCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  overflow: "hidden",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
  },
}))

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
    <StyledCard
      sx={{
        background: getGradientBackground(background),
        color,
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 600,
              letterSpacing: 1.2,
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "0.75rem",
            }}
          >
            {label}
          </Typography>
          {trend && (
            <Chip
              icon={getTrendIcon()}
              label={trend}
              size="small"
              sx={{
                height: 24,
                fontSize: "0.7rem",
                fontWeight: 500,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
              }}
            />
          )}
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>

          {subtext && (
            <Typography
              variant="caption"
              sx={{
                color: "rgba(0, 0, 0, 0.5)",
                fontWeight: 500,
                fontSize: "0.8rem",
              }}
            >
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
    </StyledCard>
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
    <ChartCard
      sx={{
        minHeight: isMobile ? 350 : 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
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
    </ChartCard>
  )
}
