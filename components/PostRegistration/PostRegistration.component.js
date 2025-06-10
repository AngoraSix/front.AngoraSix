"use client"

import { useState } from "react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Card,
  CardContent,
  Grid,
  Divider,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material"
import { CalendarMonth, Email, Send, CheckCircle, Notifications, Group, Settings, Chat } from "@mui/icons-material"
import CountdownTimer from "../common/CountdownTimer"
import SharedNavbar from "../common/SharedNavbar"

const PostRegistrationComponent = () => {
  const { t } = useTranslation("post-registration")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // Set launch date (example: 30 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "contact_message_sent", {
        event_category: "engagement",
        event_label: "post_registration",
      })
    }

    try {
      // Here you would send the message to your backend
      // For now, we'll just simulate a successful submission
      setIsSubmitted(true)
      setSnackbarOpen(true)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleAddToCalendar = () => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "add_to_calendar", {
        event_category: "engagement",
        event_label: "post_registration",
      })
    }

    // Format date for Google Calendar
    const formattedDate = launchDate.toISOString().replace(/-|:|\.\d+/g, "")
    const endDate = new Date(launchDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours later
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "")

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Lanzamiento de AngoraSix",
    )}&dates=${formattedDate}/${formattedEndDate}&details=${encodeURIComponent(
      "¡AngoraSix estará disponible! Accede a tu cuenta para comenzar a utilizar todas las funcionalidades.",
    )}&location=${encodeURIComponent("https://angorasix.com")}`

    window.open(calendarUrl, "_blank")
  }

  const handleChatbot = () => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "chatbot_clicked", {
        event_category: "engagement",
        event_label: "post_registration",
      })
    }
    // Here you would open your chatbot or FAQ system
    // For now, we'll just log it
    console.log("Opening chatbot/FAQ system")
  }

  const nextSteps = [
    {
      icon: <Notifications sx={{ color: "#1B5993" }} />,
      title: t("steps.notifications.title"),
      description: t("steps.notifications.description"),
    },
    {
      icon: <Group sx={{ color: "#FE5F55" }} />,
      title: t("steps.community.title"),
      description: t("steps.community.description"),
    },
    {
      icon: <Settings sx={{ color: "#1B5993" }} />,
      title: t("steps.setup.title"),
      description: t("steps.setup.description"),
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
      </Head>

      <SharedNavbar />

      <Box className="post-registration-page" sx={{ pt: 10, pb: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          {/* Welcome Header */}
          <Card
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              mb: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1B5993",
                color: "white",
                py: 4,
                px: 4,
                textAlign: "center",
              }}
            >
              <CheckCircle sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
              <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
                {t("welcome.title")}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95 }}>
                {t("welcome.subtitle")}
              </Typography>
            </Box>
          </Card>

          <Grid container spacing={4}>
            {/* Left Column - Countdown */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", borderRadius: "12px" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, color: "#1B5993", fontWeight: "bold", textAlign: "center" }}>
                    {t("countdown.title")}
                  </Typography>

                  <CountdownTimer
                    targetDate={launchDate.toISOString()}
                    variant="card"
                    onComplete={() => {
                      if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
                        window.gtag("event", "countdown_completed", {
                          event_category: "engagement",
                          event_label: "post_registration",
                        })
                      }
                    }}
                  />

                  <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CalendarMonth />}
                      onClick={handleAddToCalendar}
                      fullWidth
                      sx={{ py: 1.5, mb: 2 }}
                    >
                      {t("calendar.button")}
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      {t("calendar.description")}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Contact Options */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", borderRadius: "12px" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, color: "#1B5993", fontWeight: "bold" }}>
                    {t("contact.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t("contact.description")}
                  </Typography>

                  {/* Personal Contact Form */}
                  <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder={t("contact.placeholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<Send />}
                      disabled={!message.trim() || isSubmitted}
                      fullWidth
                      sx={{ py: 1.5, mb: 2 }}
                    >
                      {t("contact.button")}
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Chatbot/FAQ Option */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Chat />}
                    onClick={handleChatbot}
                    fullWidth
                    sx={{ py: 1.5, mb: 2 }}
                  >
                    {t("contact.chatbot")}
                  </Button>

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Email sx={{ mr: 1, color: "#1B5993" }} />
                    <Typography variant="body2" color="text.secondary">
                      {t("contact.email")}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Next Steps Section */}
          <Card sx={{ mt: 4, borderRadius: "12px" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 4, color: "#1B5993", fontWeight: "bold", textAlign: "center" }}>
                {t("steps.title")}
              </Typography>

              <Grid container spacing={3}>
                {nextSteps.map((step, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Box sx={{ mb: 2 }}>{step.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Social/Community Section */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#1B5993" }}>
              {t("social.title")}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto" }}>
              {t("social.description")}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {t("contact.success")}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PostRegistrationComponent
