"use client"

import { CheckCircle, Email, Groups, RocketLaunch, VideoCall } from "@mui/icons-material"
import { Box, Button, Card, Container, Grid, TextField, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useState } from "react"
import { trackEvent } from "../../utils/analytics"
import CountdownTimer from "../common/CountdownTimer"

const TeamPostRegistration = () => {
  const { t } = useTranslation("team-post-registration")
  const { data: session } = useSession()
  const [feedback, setFeedback] = useState("")
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [joinedBeta, setJoinedBeta] = useState(false)

  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 45) // 45 days for team beta

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingFeedback(true)

    trackEvent("team_feedback_submitted", {
      event_category: "engagement",
      event_label: "post_registration",
    })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFeedbackSubmitted(true)
      setFeedback("")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  const handleJoinBeta = () => {
    trackEvent("team_beta_joined", {
      event_category: "conversion",
      event_label: "post_registration",
    })
    setJoinedBeta(true)
  }

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
      </Head>

      <Box sx={{ pt: 10, pb: 8, minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: { xs: 3, sm: 5 }, mb: 4 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <CheckCircle sx={{ fontSize: 64, color: "#4caf50", mb: 2 }} />
                  <Typography variant="h3" gutterBottom sx={{ color: "#0A2239", fontWeight: "bold" }}>
                    {t("welcome.title")}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
                    {t("welcome.subtitle")}
                  </Typography>
                </Box>

                {/* Beta Program */}
                {!joinedBeta ? (
                  <Card sx={{ p: 4, mb: 4, backgroundColor: "#f0f7ff", border: "2px solid #FE5F55" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Groups sx={{ fontSize: 48, color: "#FE5F55", mb: 2 }} />
                      <Typography variant="h5" gutterBottom sx={{ color: "#0A2239", fontWeight: 600 }}>
                        {t("beta.title")}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                        {t("beta.description")}
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleJoinBeta}
                        sx={{
                          backgroundColor: "#FE5F55",
                          color: "white",
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#e54e44",
                          },
                        }}
                      >
                        {t("beta.cta")}
                      </Button>
                    </Box>
                  </Card>
                ) : (
                  <Card sx={{ p: 4, mb: 4, backgroundColor: "#e8f5e8" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "center" }}>
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 32 }} />
                      <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: 600 }}>
                        {t("beta.success")}
                      </Typography>
                    </Box>
                  </Card>
                )}

                {/* Launch Countdown */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ textAlign: "center", mb: 3, color: "#0A2239" }}>
                    {t("countdown.title")}
                  </Typography>
                  <CountdownTimer
                    targetDate={launchDate.toISOString()}
                    variant="card"
                    compact={true}
                    onComplete={() => {
                      trackEvent("team_countdown_completed", {
                        event_category: "engagement",
                        event_label: "post_registration",
                      })
                    }}
                  />
                </Box>

                {/* What to Expect */}
                <Card sx={{ p: 4, backgroundColor: "#fff5f5" }}>
                  <Typography variant="h6" gutterBottom sx={{ color: "#0A2239", fontWeight: 600 }}>
                    {t("expectations.title")}
                  </Typography>
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <VideoCall sx={{ fontSize: 40, color: "#FE5F55", mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {t("expectations.demo")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <Groups sx={{ fontSize: 40, color: "#FE5F55", mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {t("expectations.setup")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: "center" }}>
                        <RocketLaunch sx={{ fontSize: 40, color: "#FE5F55", mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {t("expectations.launch")}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              {/* Feedback */}
              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0A2239" }}>
                  {t("feedback.title")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                  {t("feedback.description")}
                </Typography>

                {!feedbackSubmitted ? (
                  <Box component="form" onSubmit={handleFeedbackSubmit}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder={t("feedback.placeholder")}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      sx={{ mb: 2 }}
                      disabled={isSubmittingFeedback}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmittingFeedback || !feedback.trim()}
                      startIcon={<Email />}
                      sx={{
                        backgroundColor: "#0A2239",
                        "&:hover": {
                          backgroundColor: "#1a365d",
                        },
                      }}
                    >
                      {isSubmittingFeedback ? t("feedback.sending") : t("feedback.send")}
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <CheckCircle sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
                    <Typography variant="body1" sx={{ color: "#2e7d32" }}>
                      {t("feedback.success")}
                    </Typography>
                  </Box>
                )}
              </Card>

              {/* Resources */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0A2239" }}>
                  {t("resources.title")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                  {t("resources.description")}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#0A2239",
                    color: "#0A2239",
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#0A2239",
                      color: "white",
                    },
                  }}
                >
                  {t("resources.guide")}
                </Button>
                <Button variant="text" fullWidth sx={{ color: "#0A2239" }}>
                  {t("resources.faq")}
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default TeamPostRegistration
