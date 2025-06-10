"use client"

import { CalendarToday, CheckCircle, Email, QuestionAnswer, RocketLaunch, SmartToy } from "@mui/icons-material"
import { Box, Button, Card, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { signIn, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useEffect, useState } from "react"
import api from "../../api"
import { trackEvent } from "../../utils/analytics"
import CountdownTimer from "../common/CountdownTimer"
import SharedNavbar from "../common/SharedNavbar"

const PostRegistration = () => {
  const { t } = useTranslation("post-registration")
  const { data: session, status } = useSession()
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [messageSubmitted, setMessageSubmitted] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30) // 30 days from now

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      signIn('angorasixspring')
      return
    }
    // Set email from session if available
    if (session?.user?.email) {
      setEmail(session.user.email)
    }
  }, [session, status])

  // Don't render anything while checking authentication
  if (status === "loading" || !session) {
    return null
  }

  const handleMessageSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingMessage(true)

    trackEvent("contact_message_sent", {
      event_category: "engagement",
      event_label: "post_registration",
    })

    try {
      await api.surveys.create({
        type: "CONTACT_MESSAGE",
        data: {
          message,
          source: "post_registration",
          userEmail: session?.user?.email,
        },
      })
      setMessageSubmitted(true)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSubmittingMessage(false)
    }
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!subscribeNewsletter) return

    setIsSubmittingNewsletter(true)

    trackEvent("newsletter_subscribed", {
      event_category: "engagement",
      event_label: "post_registration",
    })

    try {
      await api.front.suscribe(email)
      setNewsletterSubmitted(true)
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  const handleAddToCalendar = () => {
    trackEvent("calendar_add_clicked", {
      event_category: "engagement",
      event_label: "post_registration",
    })

    const startDate = new Date(launchDate)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour later

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      t("calendar.eventTitle"),
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
      t("calendar.eventDescription"),
    )}&location=${encodeURIComponent("https://angorasix.com")}`

    window.open(calendarUrl, "_blank")
  }

  const handleChatbotClick = () => {
    trackEvent("chatbot_clicked", {
      event_category: "engagement",
      event_label: "post_registration",
    })

    // TODO: Implement chatbot integration
    // For now, redirect to a FAQ page or open a chat widget
    window.open("https://angorasix.com/faq", "_blank")
  }

  const nextSteps = [
    {
      icon: <Email sx={{ color: "#1B5993" }} />,
      title: t("nextSteps.step1.title"),
      description: t("nextSteps.step1.description"),
    },
    {
      icon: <CalendarToday sx={{ color: "#1B5993" }} />,
      title: t("nextSteps.step2.title"),
      description: t("nextSteps.step2.description"),
    },
    {
      icon: <RocketLaunch sx={{ color: "#1B5993" }} />,
      title: t("nextSteps.step3.title"),
      description: t("nextSteps.step3.description"),
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SharedNavbar />

      <Box sx={{ pt: 7, pb: 8, minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Left Column - Countdown and Welcome */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <CheckCircle sx={{ fontSize: 64, color: "#4caf50", mb: 2 }} />
                  <Typography variant="h3" gutterBottom sx={{ color: "#1B5993", fontWeight: "bold" }}>
                    {t("welcome.title")}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
                    {t("welcome.subtitle")}
                  </Typography>
                </Box>

                {/* Countdown Timer */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ textAlign: "center", mb: 3, color: "#1B5993" }}>
                    {t("countdown.title")}
                  </Typography>
                  <CountdownTimer
                    targetDate={launchDate.toISOString()}
                    variant="card"
                    compact={true}
                    onComplete={() => {
                      trackEvent("countdown_completed", {
                        event_category: "engagement",
                        event_label: "post_registration",
                      })
                    }}
                  />
                </Box>

                {/* Newsletter Subscription */}
                {!newsletterSubmitted && (
                  <Card sx={{ p: 3, mb: 4, backgroundColor: "#f0f7ff" }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#1B5993" }}>
                      {t("newsletter.title")}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                      {t("newsletter.description")}
                    </Typography>
                    <Box component="form" onSubmit={handleNewsletterSubmit}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder={t("newsletter.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="small"
                            disabled={isSubmittingNewsletter}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmittingNewsletter || !email}
                            sx={{ height: "40px" }}
                          >
                            {isSubmittingNewsletter ? t("newsletter.subscribing") : t("newsletter.subscribe")}
                          </Button>
                        </Grid>
                      </Grid>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={subscribeNewsletter}
                            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                            size="small"
                          />
                        }
                        label={t("newsletter.consent")}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Card>
                )}

                {newsletterSubmitted && (
                  <Card sx={{ p: 3, mb: 4, backgroundColor: "#e8f5e8" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircle sx={{ color: "#4caf50" }} />
                      <Typography variant="body1" sx={{ color: "#2e7d32" }}>
                        {t("newsletter.success")}
                      </Typography>
                    </Box>
                  </Card>
                )}

                {/* Add to Calendar */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<CalendarToday />}
                    onClick={handleAddToCalendar}
                    sx={{
                      borderColor: "#1B5993",
                      color: "#1B5993",
                      "&:hover": {
                        backgroundColor: "#1B5993",
                        color: "white",
                      },
                    }}
                  >
                    {t("calendar.addToCalendar")}
                  </Button>
                </Box>
              </Card>

              {/* Next Steps */}
              <Card sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h5" gutterBottom sx={{ color: "#1B5993", textAlign: "center", mb: 4 }}>
                  {t("nextSteps.title")}
                </Typography>
                <Grid container spacing={3}>
                  {nextSteps.map((step, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Box sx={{ textAlign: "center" }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            backgroundColor: "#f0f7ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          {step.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ color: "#1B5993" }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>

            {/* Right Column - Contact and Support */}
            <Grid item xs={12} md={4}>
              {/* Personal Contact */}
              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1B5993" }}>
                  {t("contact.title")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                  {t("contact.description")}
                </Typography>

                {!messageSubmitted ? (
                  <Box component="form" onSubmit={handleMessageSubmit}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder={t("contact.messagePlaceholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{ mb: 2 }}
                      disabled={isSubmittingMessage}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmittingMessage || !message.trim()}
                      startIcon={<Email />}
                    >
                      {isSubmittingMessage ? t("contact.sending") : t("contact.send")}
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <CheckCircle sx={{ fontSize: 48, color: "#4caf50", mb: 2 }} />
                    <Typography variant="body1" sx={{ color: "#2e7d32" }}>
                      {t("contact.success")}
                    </Typography>
                  </Box>
                )}
              </Card>

              {/* Chatbot/FAQ */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1B5993" }}>
                  {t("support.title")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                  {t("support.description")}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<SmartToy />}
                  onClick={handleChatbotClick}
                  sx={{
                    borderColor: "#1B5993",
                    color: "#1B5993",
                    "&:hover": {
                      backgroundColor: "#1B5993",
                      color: "white",
                    },
                  }}
                >
                  {t("support.chatbot")}
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  startIcon={<QuestionAnswer />}
                  onClick={() => {
                    trackEvent("faq_clicked", {
                      event_category: "engagement",
                      event_label: "post_registration",
                    })
                    window.open("/faq", "_blank")
                  }}
                  sx={{ mt: 1, color: "#1B5993" }}
                >
                  {t("support.faq")}
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default PostRegistration
