"use client"

import {
  AccountBalance,
  AutoAwesome,
  CheckCircle,
  Groups,
  Handshake,
  Psychology,
  RocketLaunch,
  TrendingUp,
} from "@mui/icons-material"
import { Box, Button, Card, CardContent, Container, Fade, Grid, Typography, Zoom } from "@mui/material"
import { signIn, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ROUTES } from "../../../constants/constants"
import { useInView } from "../../../hooks/useInViews"
import { trackEvent, trackSignupConversion } from "../../../utils/analytics"
import CountdownTimer from "../../common/CountdownTimer"
import SharedNavbar from "../../common/SharedNavbar"

const VisionaryLanding = () => {
  const { t } = useTranslation("welcome.visionaries")
  const { data: session } = useSession()
  const router = useRouter()
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30) // 30 days from now

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [problemRef, problemInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [solutionRef, solutionInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [previewRef, previewInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const handleStartBuilding = () => {
    trackEvent("cta_click", {
      event_category: "engagement",
      event_label: "start_building",
      location: "hero_section",
    })

    trackSignupConversion()

    if (session) {
      router.push(ROUTES.landings.postRegistration)
    } else {
      signIn("angorasixspring", { callbackUrl: ROUTES.landings.postRegistration })
    }
  }

  const handleJoinNow = () => {
    trackEvent("cta_click", {
      event_category: "engagement",
      event_label: "join_now",
      location: "cta_section",
    })

    trackSignupConversion()

    if (session) {
      router.push(ROUTES.landings.postRegistration)
    } else {
      signIn("angorasixspring", { callbackUrl: ROUTES.landings.postRegistration })
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
      gradient: "linear-gradient(135deg, #b3c9dd 0%, #1B5993 100%)",
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

      <Box className="visionary-landing" sx={{ pt: 7, overflow: "hidden" }}>
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
                <Typography
                  variant="h1"
                  className="hero-title"
                  sx={{
                    fontSize: {
                      xs: "2.5rem", // Mobile: 40px
                      sm: "3.5rem", // Small tablet: 56px
                      md: "4rem", // Medium: 64px
                      lg: "4.5rem", // Large: 72px
                      xl: "5rem", // Extra large: 80px
                    },
                    lineHeight: {
                      xs: 1.2,
                      sm: 1.1,
                      md: 1.1,
                    },
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {t("hero.title")}
                </Typography>
                <Typography
                  variant="h4"
                  className="hero-subtitle"
                  sx={{
                    fontSize: {
                      xs: "1.1rem", // Mobile
                      sm: "1.3rem", // Small tablet
                      md: "1.5rem", // Medium
                      lg: "1.75rem", // Large
                    },
                    lineHeight: 1.4,
                    wordBreak: "break-word",
                  }}
                >
                  {t("hero.subtitle")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    className="hero-cta"
                    startIcon={<RocketLaunch />}
                    onClick={handleStartBuilding}
                    sx={{
                      minWidth: { xs: "280px", sm: "auto" },
                    }}
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
                      backgroundColor: "rgba(175, 193, 214, 0.8)",
                      minWidth: { xs: "280px", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "#1B5993",
                        color: "white",
                      },
                    }}
                  >
                    {t("hero.viewplans")}
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
                <Card
                  sx={{
                    maxWidth: "100%",
                    borderRadius: 3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src="/images/dashboard-preview.png"
                    alt={t("preview.dashboard")}
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Card>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    color: "text.secondary",
                    fontStyle: "italic",
                  }}
                >
                  {t("preview.realDashboard")}
                </Typography>
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

        {/* CTA Section - Changed from newsletter to login/register */}
        <Box className="cta-section">
          <Container maxWidth="md">
            <Box className="cta-content">
              <Typography variant="h2" className="cta-title">
                {t("cta.joinTitle")}
              </Typography>
              <Typography variant="h6" className="cta-subtitle">
                {t("cta.joinSubtitle")}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="cta-button"
                  startIcon={<RocketLaunch />}
                  onClick={handleJoinNow}
                  sx={{
                    py: 2,
                    fontSize: "1.2rem",
                    maxWidth: "400px",
                    mx: "auto",
                    display: "block",
                  }}
                >
                  {session ? t("cta.continueButton") : t("cta.joinButton")}
                </Button>
              </Box>

              <Typography variant="body2" className="cta-note" sx={{ mt: 3 }}>
                {t("cta.joinNote")}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default VisionaryLanding
