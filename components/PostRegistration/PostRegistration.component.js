"use client"

import {
  Add,
  Business,
  Celebration,
  CheckCircle,
  Diamond,
  Email,
  Error as ErrorIcon,
  Explore,
  GitHub,
  Group,
  Instagram,
  LinkedIn,
  Message,
  People,
  Phone,
  Send,
  Settings,
  Speed,
  Star,
  Support,
  WhatsApp,
  Work,
  YouTube,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
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
  trackContactMessageSubmit,
  trackNewsletterSignupClick,
  trackSocialFollowClick,
} from "../../utils/analytics"

const PostRegistration = ({ existingBetaApplication }) => {
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
    interests: [],
    otherInterest: "",
    description: "",
    contactMethod: "email",
    phoneNumber: "",
    consent: false,
  })
  const [betaFormErrors, setBetaFormErrors] = useState({})
  const [isSubmittingBeta, setIsSubmittingBeta] = useState(false)
  const [betaSubmitted, setBetaSubmitted] = useState(!!existingBetaApplication)
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)

  // Beta program launch date (30 days from now)
  const betaLaunchDate = new Date()
  betaLaunchDate.setDate(betaLaunchDate.getDate() + 30)

  // Interest options
  const interestOptions = [
    {
      id: "entrepreneur",
      icon: <Business />,
      title: t("betaDialog.interests.entrepreneur.title"),
      description: t("betaDialog.interests.entrepreneur.description"),
    },
    {
      id: "collaboration",
      icon: <People />,
      title: t("betaDialog.interests.collaboration.title"),
      description: t("betaDialog.interests.collaboration.description"),
    },
    {
      id: "contributor",
      icon: <Work />,
      title: t("betaDialog.interests.contributor.title"),
      description: t("betaDialog.interests.contributor.description"),
    },
    {
      id: "management",
      icon: <Settings />,
      title: t("betaDialog.interests.management.title"),
      description: t("betaDialog.interests.management.description"),
    },
    {
      id: "curious",
      icon: <Explore />,
      title: t("betaDialog.interests.curious.title"),
      description: t("betaDialog.interests.curious.description"),
    },
    {
      id: "other",
      icon: <Add />,
      title: t("betaDialog.interests.other.title"),
      description: t("betaDialog.interests.other.description"),
    },
  ]

  // Contact method options
  const contactMethods = [
    { id: "email", icon: <Email />, label: t("betaDialog.contact.email") },
    { id: "phone", icon: <Phone />, label: t("betaDialog.contact.phone") },
    { id: "whatsapp", icon: <WhatsApp />, label: t("betaDialog.contact.whatsapp") },
  ]

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      signIn("angorasixspring")
      return
    }
    if (session?.user?.email) {
      setEmail(session.user.email)
    }
  }, [session, status])

  if (status === "loading" || !session) {
    return null
  }

  const validateBetaForm = () => {
    const errors = {}

    if (betaFormData.interests.length === 0) {
      errors.interests = t("betaDialog.errors.interestsRequired")
    }

    if (betaFormData.interests.includes("other") && !betaFormData.otherInterest.trim()) {
      errors.otherInterest = t("betaDialog.errors.otherInterestRequired")
    }

    if (!betaFormData.description.trim()) {
      errors.description = t("betaDialog.errors.descriptionRequired")
    }

    if (
      (betaFormData.contactMethod === "phone" || betaFormData.contactMethod === "whatsapp") &&
      !betaFormData.phoneNumber.trim()
    ) {
      errors.phoneNumber = t("betaDialog.errors.phoneRequired")
    }

    if (!betaFormData.consent) {
      errors.consent = t("betaDialog.errors.consentRequired")
    }

    setBetaFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!subscribeNewsletter) return

    trackNewsletterSignupClick()
    setIsSubmittingNewsletter(true)

    try {
      await api.front.suscribe(email, "post_registration", "newsletter")
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

    trackContactMessageSubmit()

    try {
      await api.front.saveSurveyResponse(
        {
          message,
          source: "post_registration",
          userEmail: session?.user?.email,
        },
        "contact-messages",
      )
      setMessageSubmitted(true)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSubmittingMessage(false)
    }
  }

  const handleBetaDialogOpenClick = () => {
    trackBetaDialogOpen()
    setBetaDialogOpen(true)
  }

  const handleInterestToggle = (interestId) => {
    setBetaFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
    // Clear errors when user makes changes
    if (betaFormErrors.interests) {
      setBetaFormErrors((prev) => ({ ...prev, interests: null }))
    }
  }

  const handleBetaSubmit = async (e) => {
    e.preventDefault()

    if (!validateBetaForm()) {
      return
    }

    setIsSubmittingBeta(true)
    trackBetaFormSubmit()

    try {
      // Save to survey system
      await api.front.saveSurveyResponse(
        {
          interests: betaFormData.interests,
          otherInterest: betaFormData.otherInterest,
          description: betaFormData.description,
          contactMethod: betaFormData.contactMethod,
          phoneNumber: betaFormData.phoneNumber,
          consent: betaFormData.consent,
          source: "post_registration",
          userEmail: session?.user?.email,
          userName: session?.user?.name,
        },
        "beta-applications",
      )

      // Subscribe to beta list in Mailchimp
      if (betaFormData.consent) {
        await api.front.suscribe(session.user.email, "beta_program", "beta")
      }

      setBetaSubmitted(true)
      setBetaDialogOpen(false)
      setShowSuccessSnackbar(true)

      // Auto-close snackbar after 4 seconds
      setTimeout(() => {
        setShowSuccessSnackbar(false)
      }, 4000)
    } catch (error) {
      console.error("Error submitting beta application:", error)
    } finally {
      setIsSubmittingBeta(false)
    }
  }

  const handleSocialClick = (platform) => {
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
        {/* Flowing Lines Background */}
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
            {/* Left Column - Welcome + Beta Program */}
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Box className="left-column">
                {/* Welcome Section */}
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

                    {/* CTA */}
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
                          <CheckCircle />
                          <Typography>{t("beta.alreadyApplied")}</Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Beta Benefits */}
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

            {/* Right Column - Side Panels */}
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
          maxWidth="md"
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
            <Box component="form" onSubmit={handleBetaSubmit} sx={{ mt: 2 }}>
              {/* Interest Selection */}
              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  {t("betaDialog.fields.interests")} *
                </FormLabel>
                <Grid container spacing={2}>
                  {interestOptions.map((option) => (
                    <Grid item xs={12} sm={6} key={option.id}>
                      <Card
                        className={`interest-card ${betaFormData.interests.includes(option.id) ? "selected" : ""}`}
                        onClick={() => handleInterestToggle(option.id)}
                        sx={{
                          cursor: "pointer",
                          p: 2,
                          border: betaFormData.interests.includes(option.id)
                            ? "2px solid #fe5f55"
                            : "1px solid #e0e0e0",
                        }}
                      >
                        <Box display="flex" alignItems="flex-start" gap={1}>
                          <Box sx={{ color: betaFormData.interests.includes(option.id) ? "#fe5f55" : "#1b5993" }}>
                            {option.icon}
                          </Box>
                          <Box flex={1}>
                            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                              {option.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                              {option.description}
                            </Typography>
                          </Box>
                          {betaFormData.interests.includes(option.id) && (
                            <CheckCircle sx={{ color: "#fe5f55", fontSize: "1.2rem" }} />
                          )}
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {betaFormErrors.interests && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                    {betaFormErrors.interests}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Other Interest Field */}
              {betaFormData.interests.includes("other") && (
                <TextField
                  fullWidth
                  size="small"
                  label={t("betaDialog.fields.otherInterest")}
                  value={betaFormData.otherInterest}
                  onChange={(e) => setBetaFormData({ ...betaFormData, otherInterest: e.target.value })}
                  error={!!betaFormErrors.otherInterest}
                  helperText={betaFormErrors.otherInterest}
                  sx={{ mb: 3 }}
                />
              )}

              {/* Description Field */}
              <TextField
                fullWidth
                label={t("betaDialog.fields.description")}
                multiline
                rows={4}
                value={betaFormData.description}
                onChange={(e) => setBetaFormData({ ...betaFormData, description: e.target.value })}
                placeholder={t("betaDialog.fields.descriptionPlaceholder")}
                error={!!betaFormErrors.description}
                helperText={betaFormErrors.description}
                required
                sx={{ mb: 3 }}
              />

              {/* Contact Method */}
              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  {t("betaDialog.fields.contactMethod")} *
                </FormLabel>
                <RadioGroup
                  value={betaFormData.contactMethod}
                  onChange={(e) => setBetaFormData({ ...betaFormData, contactMethod: e.target.value })}
                >
                  {contactMethods.map((method) => (
                    <FormControlLabel
                      key={method.id}
                      value={method.id}
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          {method.icon}
                          {method.label}
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Phone Number Field */}
              {(betaFormData.contactMethod === "phone" || betaFormData.contactMethod === "whatsapp") && (
                <TextField
                  fullWidth
                  size="small"
                  label={t("betaDialog.fields.phoneNumber")}
                  value={betaFormData.phoneNumber}
                  onChange={(e) => setBetaFormData({ ...betaFormData, phoneNumber: e.target.value })}
                  placeholder={t("betaDialog.fields.phonePlaceholder")}
                  error={!!betaFormErrors.phoneNumber}
                  helperText={betaFormErrors.phoneNumber}
                  required
                  sx={{ mb: 3 }}
                />
              )}

              {/* Consent Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={betaFormData.consent}
                    onChange={(e) => setBetaFormData({ ...betaFormData, consent: e.target.checked })}
                  />
                }
                label={t("betaDialog.fields.consent")}
                sx={{ mb: 2 }}
              />
              {betaFormErrors.consent && (
                <FormHelperText error sx={{ mt: -1, mb: 2 }}>
                  <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                  {betaFormErrors.consent}
                </FormHelperText>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setBetaDialogOpen(false)} className="dialog-cancel">
              {t("betaDialog.cancel")}
            </Button>
            <Button
              onClick={handleBetaSubmit}
              variant="contained"
              disabled={isSubmittingBeta}
              className="dialog-submit"
            >
              {isSubmittingBeta ? t("betaDialog.submitting") : t("betaDialog.submit")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={4000}
          onClose={() => setShowSuccessSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {t("betaDialog.successMessage")}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

// Beta Countdown Component
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
