"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { Box, Typography, Button, Container, Grid, Card, CardContent, TextField, Fade, Zoom } from "@mui/material"
import {
  RocketLaunch,
  Psychology,
  AccountBalance,
  Groups,
  TrendingUp,
  CheckCircle,
  AutoAwesome,
  Handshake,
} from "@mui/icons-material"
import { useInView } from "../../../hooks/useInViews"
import SharedNavbar from "../../common/SharedNavbar"
import { ROUTES } from "../../../constants/constants"
import { useRouter } from "next/router"
import CountdownTimer from "../../common/CountdownTimer"
import { trackEvent } from "../../../utils/analytics"

const VisionaryLanding = () => {
  const { t } = useTranslation("welcome.visionaries")
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30) // 30 days from now

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [problemRef, problemInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [solutionRef, solutionInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [previewRef, previewInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const handleSubmit = async (e) => {
    e.preventDefault()

    trackEvent("email_captured", {
      event_category: "lead_generation",
      event_label: "cta_section",
    })

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "landing_cta",
          planType: "early-bird",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          router.push("/welcome/post-registration")
        }, 2000)
      } else {
        console.error("Subscription failed:", result.error)
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const handleStartBuilding = () => {
    trackEvent("cta_click", {
      event_category: "engagement",
      event_label: "start_building",
      location: "hero_section",
    })

    if (session) {
      router.push(ROUTES.projects.management.landing)
    } else {
      signIn("angorasixspring")
    }
  }

  const problems = [
    {
      icon: <RocketLaunch sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: t("problems.items.structure.title"),
      description: t("problems.items.structure.description"),
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: t("problems.items.vision.title"),
      description: t("problems.items.vision.description"),
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: t("problems.items.burnout.title"),
      description: t("problems.items.burnout.description"),
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: t("problems.items.mistakes.title"),
      description: t("problems.items.mistakes.description"),
    },
  ]

  const solutions = [
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("solutions.items.ai.title"),
      description: t("solutions.items.ai.description"),
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("solutions.items.ledger.title"),
      description: t("solutions.items.ledger.description"),
      gradient: "linear-gradient(135deg, #AFC1D6 0%, #7D99BA 100%)",
    },
    {
      icon: <Handshake sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("solutions.items.ownership.title"),
      description: t("solutions.items.ownership.description"),
      gradient: "linear-gradient(135deg, #FE5F55 0%, #FF8A80 100%)",
    },
    {
      icon: <Psychology sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("solutions.items.guidance.title"),
      description: t("solutions.items.guidance.description"),
      gradient: "linear-gradient(135deg, #DCE7EA 0%, #AFC1D6 100%)",
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

      <Box className="visionary-landing" sx={{ pt: 7 }}>
        {/* Hero Section */}
        <Box ref={heroRef} className="hero-section">
          <Container maxWidth="lg">
            {/* Countdown Banner */}
            <Box sx={{ mb: 4 }}>
              <CountdownTimer
                targetDate={launchDate.toISOString()}
                variant="banner"
                onComplete={() => {
                  trackEvent("countdown_completed", {
                    event_category: "engagement",
                    event_label: "hero_section",
                  })
                }}
              />
            </Box>

            <Fade in={heroInView} timeout={1000}>
              <Box className="hero-content">
                <Typography variant="h1" className="hero-title">
                  {t("hero.title")}
                </Typography>
                <Typography variant="h4" className="hero-subtitle">
                  {t("hero.subtitle")}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    className="hero-cta"
                    startIcon={<RocketLaunch />}
                    onClick={handleStartBuilding}
                  >
                    {t("hero.cta")}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      trackEvent("pricing_click", {
                        event_category: "navigation",
                        event_label: "hero_section",
                      })
                      router.push("/pricing")
                    }}
                    sx={{
                      borderColor: "#1B5993",
                      color: "#1B5993",
                      "&:hover": {
                        backgroundColor: "#1B5993",
                        color: "white",
                      },
                    }}
                  >
                    Ver Planes
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Problem Section */}
        <Box ref={problemRef} className="problem-section">
          <Container maxWidth="lg">
            <Fade in={problemInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  {t("problems.title")}
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  {t("problems.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="problems-grid">
              {problems.map((problem, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Zoom in={problemInView} timeout={1000 + index * 200}>
                    <Card className="problem-card">
                      <CardContent>
                        <Box className="problem-icon">{problem.icon}</Box>
                        <Typography variant="h6" className="problem-title">
                          {problem.title}
                        </Typography>
                        <Typography variant="body1" className="problem-description">
                          {problem.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Solution Section */}
        <Box ref={solutionRef} className="solution-section">
          <Container maxWidth="lg">
            <Fade in={solutionInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  {t("solutions.title")}
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  {t("solutions.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="solutions-grid">
              {solutions.map((solution, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Zoom in={solutionInView} timeout={1000 + index * 200}>
                    <Card className="solution-card" sx={{ background: solution.gradient }}>
                      <CardContent>
                        <Box className="solution-icon">{solution.icon}</Box>
                        <Typography variant="h6" className="solution-title">
                          {solution.title}
                        </Typography>
                        <Typography variant="body2" className="solution-description">
                          {solution.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Platform Preview */}
        <Box ref={previewRef} className="preview-section">
          <Container maxWidth="lg">
            <Fade in={previewInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  {t("preview.title")}
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  {t("preview.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Zoom in={previewInView} timeout={1200}>
              <Box className="platform-preview">
                <Box className="preview-mockup">
                  <Box className="mockup-header">
                    <Box className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </Box>
                    <Typography variant="caption">{t("preview.dashboard")}</Typography>
                  </Box>
                  <Box className="mockup-content">
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Box className="mockup-chart">
                          <Typography variant="subtitle2">{t("preview.ownership")}</Typography>
                          <Box className="chart-placeholder"></Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="mockup-ai">
                          <Typography variant="subtitle2">{t("preview.assistant")}</Typography>
                          <Box className="ai-message">
                            <Typography variant="caption">{t("preview.aiMessage")}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          </Container>
        </Box>

        {/* Who It's For */}
        <Box className="audience-section">
          <Container maxWidth="md">
            <Box className="section-header">
              <Typography variant="h2" className="section-title">
                {t("audience.title")}
              </Typography>
            </Box>

            <Grid container spacing={3} className="audience-grid">
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">{t("audience.items.solo")}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">{t("audience.items.teams")}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">{t("audience.items.visionaries")}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h6" className="audience-tagline">
              {t("audience.tagline")}
            </Typography>
          </Container>
        </Box>

        {/* User Story */}
        <Box className="story-section">
          <Container maxWidth="md">
            <Card className="story-card">
              <CardContent>
                <Typography variant="h5" className="story-quote">
                  {t("story.quote")}
                </Typography>
                <Typography variant="subtitle1" className="story-attribution">
                  {t("story.attribution")}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box className="cta-section">
          <Container maxWidth="md">
            <Box className="cta-content">
              <Typography variant="h2" className="cta-title">
                {t("cta.title")}
              </Typography>
              <Typography variant="h6" className="cta-subtitle">
                {t("cta.subtitle")}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} className="cta-form">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={t("cta.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cta-input"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  className="cta-button"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? t("cta.submitted") : t("cta.button")}
                </Button>
              </Box>

              <Typography variant="body2" className="cta-note">
                {t("cta.note")}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default VisionaryLanding
