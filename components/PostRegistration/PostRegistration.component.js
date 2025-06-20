"use client"

import {
  Celebration,
  GitHub,
  Instagram,
  LinkedIn,
  Send,
  Star,
  YouTube,
  Email,
  Message,
  Group,
  Speed,
  Support,
  Diamond,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions, // Added DialogActions import
  DialogContent, // Added DialogContent import
  DialogTitle, // Added DialogTitle import
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { signIn, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useEffect, useState } from "react"
import api from "../../api"
import {
  trackBetaDialogOpen,
  trackBetaFormSubmit,
  trackNewsletterSignupClick,
  trackContactMessageSubmit,
  trackSocialFollowClick,
} from "../../utils/analytics"

const PostRegistration = () => {
  const { t } = useTranslation("post-registration")
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false)
  const [messageSubmitted, setMessageSubmitted] = useState(false)
  const [betaDialogOpen, setBetaDialogOpen] = useState(false)
  const [betaFormData, setBetaFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    experience: "",
    motivation: "",
  })
  const [isSubmittingBeta, setIsSubmittingBeta] = useState(false)
  const [betaSubmitted, setBetaSubmitted] = useState(false)

  // Beta program launch date (30 days from now)
  const betaLaunchDate = new Date()
  betaLaunchDate.setDate(betaLaunchDate.getDate() + 30)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      signIn("angorasixspring")
      return
    }
    if (session?.user?.email) {
      setEmail(session.user.email)
      setBetaFormData((prev) => ({
        ...prev,
        email: session.user.email,
        name: session.user.name || "",
      }))
    }
  }, [session, status])

  if (status === "loading" || !session) {
    return null
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!subscribeNewsletter) return

    // Track newsletter signup click
    trackNewsletterSignupClick()

    setIsSubmittingNewsletter(true)

    try {
      await api.front.suscribe(email)
      setNewsletterSubmitted(true)
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  const handleMessageSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingMessage(true)

    // Track contact message submit
    trackContactMessageSubmit()

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

  const handleBetaDialogOpenClick = () => {
    // Track beta dialog opening
    trackBetaDialogOpen()
    setBetaDialogOpen(true)
  }

  const handleBetaSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingBeta(true)

    // Track beta form submission
    trackBetaFormSubmit()

    try {
      await api.surveys.create({
        type: "BETA_PROGRAM_APPLICATION",
        data: {
          ...betaFormData,
          source: "post_registration",
          userEmail: session?.user?.email,
        },
      })
      setBetaSubmitted(true)
      setBetaDialogOpen(false)
    } catch (error) {
      console.error("Error submitting beta application:", error)
    } finally {
      setIsSubmittingBeta(false)
    }
  }

  const handleSocialClick = (platform) => {
    // Track social follow click
    trackSocialFollowClick(platform.toLowerCase())
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      url: "https://linkedin.com/company/angorasix",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      url: "https://instagram.com/angorasix",
    },
    {
      name: "GitHub",
      icon: <GitHub />,
      url: "https://github.com/angorasix",
    },
    {
      name: "YouTube",
      icon: <YouTube />,
      url: "https://youtube.com/@angorasix",
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box className="post-registration-landing">
        {/* Flowing Lines Background - Same as WelcomeLanding */}
        <Box className="post-registration-background">
          <div className="flowing-lines">
            <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <path d="M0,400 Q300,200 600,400 T1200,400" />
              <path d="M0,300 Q400,100 800,300 T1200,300" />
              <path d="M0,500 Q200,300 400,500 T1200,500" />
            </svg>
          </div>
        </Box>

        <Container className="post-registration-container">
          <Grid container spacing={{ xs: 2, md: 3 }} className="main-layout">
            {/* Left Column - Welcome + Beta Program (Better width) */}
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Box className="left-column">
                {/* Welcome Section - Now with proper space and better alignment */}
                <Box className="welcome-section">
                  <Box className="welcome-content">
                    <Celebration className="celebration-icon" />
                    <Typography variant="h3" className="welcome-title">
                      {t("welcome.title")}
                    </Typography>
                    <Typography variant="h6" className="welcome-subtitle">
                      {t("welcome.subtitle")}
                    </Typography>
                  </Box>
                </Box>

                {/* Beta Program Panel */}
                <Card className="beta-panel">
                  <Box className="beta-section">
                    {/* Countdown - After benefits */}
                    <BetaCountdown targetDate={betaLaunchDate.toISOString()} />
                    <Box className="beta-header">
                      <Star className="beta-icon" />
                      <Typography variant="h4" className="beta-title">
                        {t("beta.title")}
                      </Typography>
                      <Typography variant="body1" className="beta-description">
                        {t("beta.description")}
                      </Typography>
                    </Box>

                    {/* CTA - Moved here for visibility */}
                    <Box className="beta-cta-top">
                      {!betaSubmitted ? (
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleBetaDialogOpenClick}
                          className="beta-button"
                          startIcon={<Star />}
                        >
                          {t("beta.apply")}
                        </Button>
                      ) : (
                        <Box className="beta-success">
                          <Celebration />
                          <Typography>{t("beta.success")}</Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Beta Benefits - After CTA */}
                    <Grid container spacing={1} className="beta-benefits">
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Speed className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.exclusive")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Group className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.influence")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Support className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.priority")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Diamond className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.lifetime")}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
            </Grid>

            {/* Right Column - Side Panels (Better positioned) */}
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Box className="side-panels">
                {/* Newsletter Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Email className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("newsletter.title")}
                    </Typography>
                  </Box>
                  {!newsletterSubmitted ? (
                    <Box component="form" onSubmit={handleNewsletterSubmit} className="panel-content">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder={t("newsletter.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmittingNewsletter}
                        sx={{ mb: 1 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={subscribeNewsletter}
                            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                            size="small"
                          />
                        }
                        label={t("newsletter.consent")}
                        sx={{ mb: 1, fontSize: "0.8rem" }}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={isSubmittingNewsletter || !email}
                        className="panel-button"
                      >
                        {isSubmittingNewsletter ? t("newsletter.subscribing") : t("newsletter.subscribe")}
                      </Button>
                    </Box>
                  ) : (
                    <Box className="panel-success">
                      <Celebration />
                      <Typography variant="body2">{t("newsletter.success")}</Typography>
                    </Box>
                  )}
                </Card>

                {/* Contact Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Message className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("contact.title")}
                    </Typography>
                  </Box>
                  {!messageSubmitted ? (
                    <Box component="form" onSubmit={handleMessageSubmit} className="panel-content">
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        placeholder={t("contact.messagePlaceholder")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmittingMessage}
                        sx={{ mb: 1 }}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={isSubmittingMessage || !message.trim()}
                        startIcon={<Send />}
                        className="panel-button"
                      >
                        {isSubmittingMessage ? t("contact.sending") : t("contact.send")}
                      </Button>
                    </Box>
                  ) : (
                    <Box className="panel-success">
                      <Celebration />
                      <Typography variant="body2">{t("contact.success")}</Typography>
                    </Box>
                  )}
                </Card>

                {/* Social Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Group className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("social.title")}
                    </Typography>
                  </Box>
                  <Box className="panel-content">
                    <Typography variant="body2" className="panel-description">
                      {t("social.description")}
                    </Typography>
                    <Box className="social-links">
                      {socialLinks.map((social) => (
                        <IconButton
                          key={social.name}
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          size="small"
                          onClick={() => handleSocialClick(social.name)}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Beta Application Dialog */}
        <Dialog
          open={betaDialogOpen}
          onClose={() => setBetaDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          className="beta-dialog"
        >
          <DialogTitle>
            <Typography variant="h5" className="dialog-title">
              {t("betaDialog.title")}
            </Typography>
            <Typography variant="body2" className="dialog-subtitle">
              {t("betaDialog.subtitle")}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleBetaSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.name")}
                    value={betaFormData.name}
                    onChange={(e) => setBetaFormData({ ...betaFormData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.email")}
                    type="email"
                    value={betaFormData.email}
                    onChange={(e) => setBetaFormData({ ...betaFormData, email: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.company")}
                    value={betaFormData.company}
                    onChange={(e) => setBetaFormData({ ...betaFormData, company: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.role")}
                    value={betaFormData.role}
                    onChange={(e) => setBetaFormData({ ...betaFormData, role: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.experience")}
                    multiline
                    rows={2}
                    value={betaFormData.experience}
                    onChange={(e) => setBetaFormData({ ...betaFormData, experience: e.target.value })}
                    placeholder={t("betaDialog.fields.experiencePlaceholder")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.motivation")}
                    multiline
                    rows={2}
                    value={betaFormData.motivation}
                    onChange={(e) => setBetaFormData({ ...betaFormData, motivation: e.target.value })}
                    placeholder={t("betaDialog.fields.motivationPlaceholder")}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setBetaDialogOpen(false)} className="dialog-cancel">
              {t("betaDialog.cancel")}
            </Button>
            <Button
              onClick={handleBetaSubmit}
              variant="contained"
              disabled={isSubmittingBeta || !betaFormData.name || !betaFormData.email || !betaFormData.motivation}
              className="dialog-submit"
            >
              {isSubmittingBeta ? t("betaDialog.submitting") : t("betaDialog.submit")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}

// Beta Countdown Component - Smaller
const BetaCountdown = ({ targetDate }) => {
  const { t } = useTranslation("post-registration")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
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
  }, [targetDate])

  return (
    <Box className="beta-countdown">
      <Typography variant="body2" className="countdown-title">
        {t("beta.countdown.title")}
      </Typography>
      <Grid container spacing={1} justifyContent="center" className="countdown-grid">
        {[
          { value: timeLeft.days, label: t("beta.countdown.days") },
          { value: timeLeft.hours, label: t("beta.countdown.hours") },
          { value: timeLeft.minutes, label: t("beta.countdown.minutes") },
          { value: timeLeft.seconds, label: t("beta.countdown.seconds") },
        ].map((unit, index) => (
          <Grid item xs={3} key={index}>
            <Box className="countdown-unit">
              <Typography className="countdown-number">{unit.value < 10 ? `0${unit.value}` : unit.value}</Typography>
              <Typography className="countdown-label">{unit.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PostRegistration
