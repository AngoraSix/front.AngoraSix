"use client"

import { Groups, Security, Visibility, AccountBalance, RocketLaunch, People, Diversity3 } from "@mui/icons-material"
import { Box, Button, Card, Container, Grid, Typography, useMediaQuery, useTheme, Fade, Grow } from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { trackEvent } from "../../../utils/analytics"
import SharedNavbar from "../../common/SharedNavbar"

const TeamLanding = () => {
  const { t } = useTranslation("welcome.team")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()
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

  const handleStartBuilding = () => {
    trackEvent("team_start_building_clicked", {
      event_category: "conversion",
      event_label: "team_landing",
    })
    router.push("/welcome/team/post-registration")
  }

  const problems = [
    {
      text: t("problems.unequal"),
      icon: <Groups sx={{ color: theme.palette.secondary.main }} />,
      keywords: ["equally", "committed", "contributing"],
    },
    {
      text: t("problems.unclear"),
      icon: <Visibility sx={{ color: theme.palette.secondary.main }} />,
      keywords: ["rules", "decisions", "misunderstandings"],
    },
    {
      text: t("problems.distribution"),
      icon: <RocketLaunch sx={{ color: theme.palette.secondary.main }} />,
      keywords: ["clarity", "reinventing"],
    },
    {
      text: t("problems.management"),
      icon: <Security sx={{ color: theme.palette.secondary.main }} />,
      keywords: ["burning out", "management", "focus"],
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
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
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
      </Head>

      <SharedNavbar variant="team" />

      {/* Hero Section - Dark Gradient + Strong Flowing Lines */}
      <Box className="team-hero-section">
        <Box className="flowing-lines-background flowing-lines-strong">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
            {generateFlowingLines(
              80,
              [theme.palette.secondary.main, theme.palette.primary.main2, theme.palette.primary.light],
              [8, 12, 15, 10, 18, 6],
            )}
          </svg>
        </Box>

        <Container maxWidth="lg">
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
                <Button variant="contained" size="large" onClick={handleStartBuilding} className="hero-cta-button">
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
            {generateFlowingLines(40, [theme.palette.primary.light2, theme.palette.primary.main2], [15, 20, 25, 18])}
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

      {/* Solutions Section - Light Gradient + Medium Flowing Lines */}
      <Box id="solutions" data-animate className="team-solutions-section">
        <Box className="complex-harmonic-pattern flowing-lines-medium">
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(
              70,
              [theme.palette.secondary.main, theme.palette.primary.main, theme.palette.primary.light],
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

      {/* AngoraSix in Action Section - Light Blue + Soft Flowing Lines */}
      <Box id="angorasix-action" data-animate className="team-angorasix-section">
        <Box className="gentle-flowing-pattern flowing-lines-soft">
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(50, [theme.palette.secondary.main, theme.palette.primary.light2], [18, 22, 25, 20])}
          </svg>
        </Box>

        <Container maxWidth="lg" className="angorasix-action-container">
          <Fade in={visibleSections["angorasix-action"]} timeout={1000}>
            <Box className="angorasix-action-title-box">
              <Typography variant="h2" className="angorasix-action-title">
                {t("angorasixInAction.title")}
              </Typography>
              <Typography variant="h6" className="angorasix-action-subtitle">
                {t("angorasixInAction.subtitle")}
              </Typography>
            </Box>
          </Fade>

          <Grow in={visibleSections["angorasix-action"]} timeout={1500}>
            <Box className="angorasix-action-image-container">
              <Box
                component="img"
                src="/images/contributor-stats.png"
                alt={t("angorasixInAction.imageAlt")}
                className="angorasix-action-image"
              />
            </Box>
          </Grow>
        </Container>
      </Box>

      {/* Use Cases Section - White + Minimal Flowing Lines */}
      <Box id="usecases" data-animate className="team-usecases-section">
        <Box className="gentle-flowing-pattern flowing-lines-minimal">
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(30, [theme.palette.secondary.main, theme.palette.primary.light2], [20, 25, 30, 22])}
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
            {generateFlowingLines(60, [theme.palette.secondary.main, theme.palette.primary.main2], [12, 16, 20, 14])}
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
            <Button variant="contained" size="large" onClick={handleStartBuilding} className="final-cta-button">
              {t("finalCta.cta")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default TeamLanding
