"use client"

import { useState, useEffect } from "react"
import { Box, Typography, Paper } from "@mui/material"
import { AccessTime } from "@mui/icons-material"
import { useTranslation } from "next-i18next"

const CountdownTimer = ({ targetDate, variant = "default", onComplete, compact = false }) => {
  const { t } = useTranslation("common")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()

      if (difference <= 0) {
        setIsCompleted(true)
        if (onComplete) onComplete()
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  if (isCompleted) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🎉 {t("completed.message")}
        </Typography>
      </Paper>
    )
  }

  if (variant === "banner") {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "#FE5F55",
          color: "white",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime sx={{ fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {t("banner.message")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
          <CountdownUnit value={timeLeft.days} label={t("units.days")} />
          <CountdownUnit value={timeLeft.hours} label={t("units.hours")} />
          <CountdownUnit value={timeLeft.minutes} label={t("units.minutes")} />
          <CountdownUnit value={timeLeft.seconds} label={t("units.seconds")} />
        </Box>
      </Paper>
    )
  }

  if (variant === "card") {
    return (
      <Paper
        elevation={2}
        sx={{
          p: compact ? 2 : 3,
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant={compact ? "subtitle1" : "h6"}
          sx={{
            mb: 2,
            color: "#1B5993",
            fontWeight: "bold",
            fontSize: compact ? "1rem" : undefined,
          }}
        >
          {t("card.title")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: compact ? 1.5 : 3,
            flexWrap: "wrap",
          }}
        >
          <CountdownUnit value={timeLeft.days} label={t("units.days")} large={!compact} compact={compact} />
          <CountdownUnit value={timeLeft.hours} label={t("units.hours")} large={!compact} compact={compact} />
          <CountdownUnit value={timeLeft.minutes} label={t("units.minutes")} large={!compact} compact={compact} />
          <CountdownUnit value={timeLeft.seconds} label={t("units.seconds")} large={!compact} compact={compact} />
        </Box>
      </Paper>
    )
  }

  // Default variant
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <CountdownUnit value={timeLeft.days} label={t("units.days")} />
      <CountdownUnit value={timeLeft.hours} label={t("units.hours")} />
      <CountdownUnit value={timeLeft.minutes} label={t("units.minutes")} />
      <CountdownUnit value={timeLeft.seconds} label={t("units.seconds")} />
    </Box>
  )
}

const CountdownUnit = ({ value, label, large = false, compact = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        backgroundColor: large ? "white" : "rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        p: compact ? 1 : large ? 2 : 1,
        minWidth: compact ? 35 : large ? 60 : 40,
        boxShadow: large ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <Typography
        variant={compact ? "h6" : large ? "h4" : "h6"}
        sx={{
          fontWeight: "bold",
          color: large ? "#FE5F55" : "inherit",
          fontSize: compact ? "1.1rem" : undefined,
        }}
      >
        {value < 10 ? `0${value}` : value}
      </Typography>
    </Box>
    <Typography
      variant={compact ? "caption" : large ? "body1" : "caption"}
      sx={{
        mt: 0.5,
        color: large ? "text.secondary" : "inherit",
        opacity: large ? 1 : 0.8,
        fontSize: compact ? "0.7rem" : undefined,
      }}
    >
      {label}
    </Typography>
  </Box>
)

export default CountdownTimer
