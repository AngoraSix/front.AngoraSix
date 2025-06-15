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
  const { t } = useTranslation("team")
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
      text: t("problems.starting"),
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

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 3D Flowing Lines Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.6,
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
            {generateFlowingLines(
              80,
              [theme.palette.secondary.main, theme.palette.primary.main2, theme.palette.primary.light],
              [8, 12, 15, 10, 18, 6],
            )}
          </svg>
        </Box>

        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1,
                  "& .highlight": {
                    color: theme.palette.secondary.main,
                    animation: "pulse 2s ease-in-out infinite",
                  },
                }}
              >
                {t("hero.title.part1")} <span className="highlight">{t("hero.title.highlight")}</span>.
              </Typography>
            </Fade>

            <Fade in timeout={1500}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: "800px",
                  mx: "auto",
                  opacity: 0.95,
                }}
              >
                {t("hero.subtitle")}
              </Typography>
            </Fade>

            <Fade in timeout={2000}>
              <Box sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStartBuilding}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "0 6px 25px rgba(254, 95, 85, 0.4)",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 30px rgba(254, 95, 85, 0.5)",
                    },
                  }}
                >
                  {t("hero.cta")}
                </Button>
              </Box>
            </Fade>

            <Typography variant="body1" sx={{ opacity: 0.8, fontStyle: "italic" }}>
              {t("hero.subtitle2")}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Problems Section - Checklist Style */}
      <Box
        id="problems"
        data-animate
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Harmonic Lines Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(
              60,
              [theme.palette.primary.light2, theme.palette.primary.main2],
              [12, 16, 20, 14, 18],
            )}
          </svg>
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={visibleSections.problems} timeout={1000}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 3,
                }}
              >
                {t("problems.title")}
              </Typography>
              <Typography variant="h6" sx={{ color: theme.palette.primary.dark2, maxWidth: "600px", mx: "auto" }}>
                {t("problems.subtitle")}
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ maxWidth: "800px", mx: "auto" }}>
            {problems.map((problem, index) => (
              <Grow in={visibleSections.problems} timeout={1000 + index * 200} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 3,
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "white",
                    border: `2px solid ${theme.palette.primary.light2}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(10px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      backgroundColor: `${theme.palette.primary.light2}15`,
                      "& .problem-check": {
                        backgroundColor: theme.palette.secondary.main,
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    className="problem-check"
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.light2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.5,
                      transition: "all 0.3s ease",
                      "&::after": {
                        content: '"?"',
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      "& .glow-text": {
                        background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.light})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 600,
                        animation: "textGlow 3s ease-in-out infinite",
                      },
                    }}
                  >
                    {renderTextWithGlow(problem.text, problem.keywords)}
                  </Typography>
                </Box>
              </Grow>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Solutions Section - Gradient Cards with Snake Line */}
      <Box
        id="solutions"
        data-animate
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main2} 0%, ${theme.palette.primary.light2} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Complex Harmonic Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.4,
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(
              100,
              [theme.palette.secondary.main, theme.palette.primary.main, theme.palette.primary.light],
              [10, 14, 18, 22, 8, 16, 12],
            )}
          </svg>
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={visibleSections.solutions} timeout={1000}>
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
                {t("solutions.title")}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, maxWidth: "600px", mx: "auto", fontWeight: 500 }}
              >
                {t("solutions.subtitle")}
              </Typography>
            </Box>
          </Fade>

          {/* Snake Line SVG */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "10%",
              right: "10%",
              height: "2px",
              zIndex: 0,
              display: { xs: "none", md: "block" },
            }}
          >
            <svg width="100%" height="100px" style={{ position: "absolute", top: "-50px" }}>
              <path
                d="M0,50 Q200,20 400,50 T800,50"
                stroke={theme.palette.secondary.main}
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
                opacity="0.6"
              >
                <animate attributeName="stroke-dashoffset" values="0;-30" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </Box>

          <Grid container spacing={4} sx={{ position: "relative", zIndex: 1 }}>
            {solutions.map((solution, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={visibleSections.solutions} timeout={1000 + index * 300}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      borderRadius: 3,
                      background: solution.gradient,
                      color: "white",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
                        "& .solution-icon": {
                          transform: "scale(1.2) rotate(10deg)",
                          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                        },
                      },
                    }}
                  >
                    <Box
                      className="solution-icon"
                      sx={{
                        mb: 3,
                        transition: "all 0.4s ease",
                        color: "white",
                      }}
                    >
                      {solution.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "white" }}>
                      {solution.title}
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
                      {solution.description}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Use Cases Section - Simple Cards with Graphics */}
      <Box
        id="usecases"
        data-animate
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gentle Flowing Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.25,
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {generateFlowingLines(
              70,
              [theme.palette.secondary.main, theme.palette.primary.light2],
              [15, 20, 25, 18, 12],
            )}
          </svg>
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={visibleSections.usecases} timeout={1000}>
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
                {t("useCases.title")}
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4} sx={{ position: "relative", zIndex: 1 }}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={visibleSections.usecases} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      p: 4,
                      height: "100%",
                      textAlign: "center",
                      border: `2px solid ${theme.palette.primary.light2}`,
                      borderRadius: 3,
                      backgroundColor: "white",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        backgroundColor: `${theme.palette.secondary.main}15`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.secondary.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      {useCase.icon}
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 2 }}>
                        {useCase.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.primary.dark2, lineHeight: 1.6 }}>
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

      {/* Final CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Final Harmonic Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5,
            zIndex: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
            {generateFlowingLines(50, [theme.palette.secondary.main, theme.palette.primary.main2], [12, 16, 20, 14])}
          </svg>
        </Box>

        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 3,
                "& .highlight": {
                  color: theme.palette.secondary.main,
                },
              }}
            >
              {t("finalCta.title.part1")} <span className="highlight">{t("finalCta.title.highlight")}</span>.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {t("finalCta.subtitle")}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartBuilding}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 6px 25px rgba(254, 95, 85, 0.4)",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 30px rgba(254, 95, 85, 0.5)",
                },
              }}
            >
              {t("finalCta.cta")}
            </Button>
          </Box>
        </Container>
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes textGlow {
          0%, 100% { 
            filter: brightness(1);
          }
          50% { 
            filter: brightness(1.3) drop-shadow(0 0 5px rgba(254, 95, 85, 0.5));
          }
        }
      `}</style>
    </>
  )
}

export default TeamLanding
