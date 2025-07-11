"use client"

import { AccountBalance, Diversity3, Groups, People, RocketLaunch, Security, Visibility } from "@mui/icons-material"
import { Box, Button, Card, Container, Fade, Grid, Grow, Typography, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
import { trackLandingCTAClick } from "../../../utils/analytics"

const TeamLanding = ({ translationKey }) => {
  const { t } = useTranslation(translationKey)
  const theme = useTheme()
  const router = useRouter()
  const { locale } = router
  const { data: session } = useSession()
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])


  const handleRegister = (ctaText) => () => {
    // Track CTA click before redirect
    trackLandingCTAClick("venture", ctaText)

    if (session) {
      router.push(`${ROUTES.welcome.postRegistration}?for=venture`)
    } else {
      router.push(`${ROUTES.auth.signin}?for=venture`)
    }
  }

  const problems = [
    {
      text: t("problems.unequal"),
      icon: <Groups sx={{ color: theme.palette.secondary.main }} />,
      keywords: [],
    },
    {
      text: t("problems.unclear"),
      icon: <Visibility sx={{ color: theme.palette.secondary.main }} />,
      keywords: [],
    },
    {
      text: t("problems.distribution"),
      icon: <RocketLaunch sx={{ color: theme.palette.secondary.main }} />,
      keywords: [],
    },
    {
      text: t("problems.management"),
      icon: <Security sx={{ color: theme.palette.secondary.main }} />,
      keywords: [],
    },
  ]

  const solutions = [
    {
      title: t("solutions.rules.title"),
      description: t("solutions.rules.description"),
      icon: <Groups sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.transparency.title"),
      description: t("solutions.transparency.description"),
      icon: <Visibility sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.multisig.title"),
      description: t("solutions.multisig.description"),
      icon: <AccountBalance sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #030D16 0%, #0F2F4D 100%)",
    },
  ]

  const howItWorksSteps = [
    {
      number: "01",
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
      image: "/images/screenshots/{{locale}}/step1-rules.png",
      imageAlt: t("howItWorks.steps.step1.imageAlt"),
    },
    {
      number: "02",
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
      image: "/images/screenshots/{{locale}}/step2-integrations.png",
      imageAlt: t("howItWorks.steps.step2.imageAlt"),
    },
  ]

  const howItWorksOutcomes = [
    {
      title: t("howItWorks.outcomes.outcome1.title"),
      description: t("howItWorks.outcomes.outcome1.description"),
      image: "/images/screenshots/{{locale}}/result1-decision.png",
      imageAlt: t("howItWorks.outcomes.outcome1.imageAlt"),
    },
    {
      title: t("howItWorks.outcomes.outcome2.title"),
      description: t("howItWorks.outcomes.outcome2.description"),
      image: "/images/screenshots/{{locale}}/result2-financial.png",
      imageAlt: t("howItWorks.outcomes.outcome2.imageAlt"),
    },
  ]

  const useCases = [
    {
      title: t("useCases.partners.title"),
      description: t("useCases.partners.description"),
      icon: <People sx={{ fontSize: 18, color: "white" }} />,
    },
    {
      title: t("useCases.newTeam.title"),
      description: t("useCases.newTeam.description"),
      icon: <Diversity3 sx={{ fontSize: 18, color: "white" }} />,
    },
    {
      title: t("useCases.startup.title"),
      description: t("useCases.startup.description"),
      icon: <RocketLaunch sx={{ fontSize: 18, color: "white" }} />,
    },
  ]

  const renderTextWithGlow = (text, keywords) => {
    if (!keywords || keywords.length === 0) return text

    let result = text
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi")
      result = result.replace(regex, `<span class="glow-text">$1</span>`)
    })

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  // Generate multiple flowing lines for 3D effect
  const generateFlowingLines = (count, colors, speeds) => {
    const lines = []
    for (let i = 0; i < count; i++) {
      const yOffset = (i * 600) / count
      const amplitude = 30 + (i % 3) * 20
      const frequency = 0.8 + (i % 4) * 0.3
      const phase = (i * Math.PI) / 4
      const speed = speeds[i % speeds.length]
      const color = colors[i % colors.length]
      const opacity = 0.1 + (i % 3) * 0.05

      lines.push(
        <path
          key={i}
          d={`M0,${yOffset} Q300,${yOffset - amplitude} 600,${yOffset} T1200,${yOffset}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity={opacity}
        >
          <animate
            attributeName="d"
            values={`M0,${yOffset} Q300,${yOffset - amplitude} 600,${yOffset} T1200,${yOffset};
                     M0,${yOffset + amplitude * Math.sin(phase)} Q300,${yOffset + amplitude * Math.sin(phase + frequency)} 600,${yOffset - amplitude * Math.sin(phase + frequency * 2)} T1200,${yOffset + amplitude * Math.sin(phase + frequency * 3)};
                     M0,${yOffset} Q300,${yOffset - amplitude} 600,${yOffset} T1200,${yOffset}`}
            dur={`${speed}s`}
            repeatCount="indefinite"
          />
        </path>,
      )
    }
    return lines
  }

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/welcome/venture" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      <Box className="team-landing-page">
        {/* Hero Section - Dark Gradient + Strong Flowing Lines */}
        <Box className="team-hero-section">
          <Box className="flowing-lines-background flowing-lines-strong">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
              {generateFlowingLines(
                80,
                [theme.palette.primaryWithBlackContrast.dark],
                [8, 12, 15, 10, 18, 6],
              )}
            </svg>
          </Box>

          <Container className="team-landing-container" maxWidth="lg">
            <Box className="hero-content">
              <Fade in timeout={1000}>
                <Typography variant="h1" className="hero-title">
                  {t("hero.title.part1")} <span className="highlight">{t("hero.title.highlight")}</span>.
                </Typography>
              </Fade>

              <Fade in timeout={1500}>
                <Typography variant="h5" className="hero-subtitle">
                  {t("hero.subtitle")}
                </Typography>
              </Fade>

              <Fade in timeout={2000}>
                <Box className="hero-cta-box">
                  <Button variant="contained" size="large" onClick={handleRegister(t("hero.cta"))} className="hero-cta-button">
                    {t("hero.cta")}
                  </Button>
                </Box>
              </Fade>

              <Typography variant="body1" className="hero-subtitle2">
                {t("hero.subtitle2")}
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Problems Section - White + Subtle Flowing Lines */}
        <Box id="problems" data-animate className="team-problems-section">
          <Box className="harmonic-lines-pattern flowing-lines-subtle">
            <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
              {generateFlowingLines(40, [], [15, 20, 25, 18])}
            </svg>
          </Box>

          <Container maxWidth="lg" className="problems-container">
            <Fade in={visibleSections.problems} timeout={1000}>
              <Box className="problems-title-box">
                <Typography variant="h2" className="problems-title">
                  {t("problems.title")}
                </Typography>
                <Typography variant="h6" className="problems-subtitle">
                  {t("problems.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Box className="problems-list">
              {problems.map((problem, index) => (
                <Grow in={visibleSections.problems} timeout={1000 + index * 200} key={index}>
                  <Box className="problem-item">
                    <Box className="problem-check" />
                    <Typography variant="body1" className="problem-text">
                      {renderTextWithGlow(problem.text, problem.keywords)}
                    </Typography>
                  </Box>
                </Grow>
              ))}
            </Box>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box id="how-it-works" data-animate className="team-how-it-works-section">
          <Box className="gentle-flowing-pattern flowing-lines-soft">
            <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="none">
              {generateFlowingLines(50, [theme.palette.primary.light, theme.palette.primaryWithBlackContrast.dark], [18, 22, 25, 20])}
            </svg>
          </Box>

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Fade in={visibleSections["how-it-works"]} timeout={1000}>
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 3,
                  }}
                >
                  {t("howItWorks.title")}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.dark2,
                    maxWidth: "600px",
                    mx: "auto",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  {t("howItWorks.subtitle")}
                </Typography>
              </Box>
            </Fade>

            {/* Steps */}
            <Box>
              {howItWorksSteps.map((step, index) => (
                <Grow in={visibleSections["how-it-works"]} timeout={1000 + index * 400} key={index}>
                  <Box
                    className={`how-it-works-step step-${index + 1}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 4, md: 6 },
                      flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                    }}
                  >
                    {/* Content Side */}
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: { xs: "center", md: "left" },
                        maxWidth: { xs: "100%", md: "500px" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 3,
                          justifyContent: { xs: "center", md: index % 2 === 0 ? "flex-start" : "flex-end" },
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {step.number}
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {step.title}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.primary.dark2,
                          lineHeight: 1.7,
                          fontSize: "1.1rem",
                          textAlign: { xs: "center", md: "left" },
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>

                    {/* Image Side */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: { xs: "100%", md: "500px" },
                      }}
                    >
                      <Box
                        component="img"
                        src={step.image.replace("{{locale}}", locale)}
                        alt={step.imageAlt}
                        sx={{
                          width: "100%",
                          maxWidth: "750px",
                          height: "auto",
                          borderRadius: 3,
                          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                          backgroundColor: "#ffffff",
                        }}
                      />
                    </Box>
                  </Box>
                </Grow>
              ))}
              {/* Arrow for desktop */}
              <Box
                className="to-results-arrow"
                sx={{
                  display: { xs: "none", md: "block" },
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  ↓
                </Box>
              </Box>
            </Box>

            {/* Results Section */}
            <Fade in={visibleSections["how-it-works"]} timeout={1500}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {t("howItWorks.outcomes.title")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4}>
              {howItWorksOutcomes.map((outcome, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Grow in={visibleSections["how-it-works"]} timeout={1500 + index * 300}>
                    <Box
                      sx={{
                        p: 4,
                        height: "100%",
                        backgroundColor: "white",
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          mb: 2,
                          textAlign: "center",
                        }}
                      >
                        {outcome.title}
                      </Typography>

                      <Box
                        component="img"
                        src={outcome.image.replace("{{locale}}", locale)}
                        alt={outcome.imageAlt}
                        sx={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 3,
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.primary.dark2,
                          lineHeight: 1.6,
                          textAlign: "left",
                        }}
                      >
                        {outcome.description}
                      </Typography>
                    </Box>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Solutions Section - Light Gradient + Medium Flowing Lines */}
        <Box id="solutions" data-animate className="team-solutions-section">
          <Box className="complex-harmonic-pattern flowing-lines-medium">
            <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
              {generateFlowingLines(
                70,
                [theme.palette.primary.main, theme.palette.primary.dark],
                [12, 16, 20, 14, 18],
              )}
            </svg>
          </Box>

          <Container maxWidth="lg" className="solutions-container">
            <Fade in={visibleSections.solutions} timeout={1000}>
              <Box className="solutions-title-box">
                <Typography variant="h2" className="solutions-title">
                  {t("solutions.title")}
                </Typography>
                <Typography variant="h6" className="solutions-subtitle">
                  {t("solutions.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="solutions-grid">
              {solutions.map((solution, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Grow in={visibleSections.solutions} timeout={1000 + index * 300}>
                    <Card className="solution-card" style={{ background: solution.gradient }}>
                      <Box className="solution-icon">{solution.icon}</Box>
                      <Typography variant="h5" className="solution-card-title">
                        {solution.title}
                      </Typography>
                      <Typography variant="body1" className="solution-card-description">
                        {solution.description}
                      </Typography>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Use Cases Section - White + Minimal Flowing Lines */}
        <Box id="usecases" data-animate className="team-usecases-section">
          <Box className="gentle-flowing-pattern flowing-lines-minimal">
            <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
              {generateFlowingLines(30, [], [20, 25, 30, 22])}
            </svg>
          </Box>

          <Container maxWidth="lg" className="use-cases-container">
            <Fade in={visibleSections.usecases} timeout={1000}>
              <Box className="use-cases-title-box">
                <Typography variant="h2" className="use-cases-title">
                  {t("useCases.title")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="use-cases-grid">
              {useCases.map((useCase, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Grow in={visibleSections.usecases} timeout={1000 + index * 200}>
                    <Card className="use-case-card">
                      <Box className="use-case-icon-box">{useCase.icon}</Box>
                      <Box className="use-case-content">
                        <Typography variant="h6" className="use-case-card-title">
                          {useCase.title}
                        </Typography>
                        <Typography variant="body2" className="use-case-card-description">
                          {useCase.description}
                        </Typography>
                      </Box>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Final CTA - Dark Gradient + Strong Flowing Lines */}
        <Box className="team-final-cta-section">
          <Box className="final-harmonic-pattern flowing-lines-strong">
            <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
              {generateFlowingLines(60, [theme.palette.secondary.main, theme.palette.secondary.main], [12, 16, 20, 14])}
            </svg>
          </Box>

          <Container maxWidth="md">
            <Box className="final-cta-content">
              <Typography variant="h2" className="final-cta-title">
                {t("finalCta.title.part1")} <span className="highlight">{t("finalCta.title.highlight")}</span>.
              </Typography>
              <Typography variant="h6" className="final-cta-subtitle">
                {t("finalCta.subtitle")}
              </Typography>
              <Button variant="contained" size="large" onClick={handleRegister(t("finalCta.cta"))} className="final-cta-button">
                {t("finalCta.cta")}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default TeamLanding
