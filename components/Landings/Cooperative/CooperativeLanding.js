"use client"

import { Groups, Visibility, AltRoute as Eco, FavoriteBorder as FavoriteOutlined, Public as PublicOutlined, Stars } from "@mui/icons-material"
import { Box, Button, Card, Container, Grid, Typography, useMediaQuery, useTheme, Fade, Grow } from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { trackEvent } from "../../../utils/analytics"
import SharedNavbar from "../../common/SharedNavbar"

const CooperativeLanding = () => {
  const { t } = useTranslation("cooperative")
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
    trackEvent("cooperative_start_building_clicked", {
      event_category: "conversion",
      event_label: "cooperative_landing",
    })
    router.push("/welcome/cooperative/post-registration")
  }

  const problems = [
    {
      text: t("problems.misalignment"),
      keywords: ["dinero", "alineación", "valores"],
    },
    {
      text: t("problems.findingAllies"),
      keywords: ["personas", "visión", "pensamiento"],
    },
    {
      text: t("problems.internalConflicts"),
      keywords: ["conflictos", "desacuerdos", "equipo"],
    },
    {
      text: t("problems.authenticity"),
      keywords: ["descentralización", "auténtica", "alternativo"],
    },
  ]

  const solutions = [
    {
      title: t("solutions.authentic.title"),
      description: t("solutions.authentic.description"),
      icon: <Eco sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.transparency.title"),
      description: t("solutions.transparency.description"),
      icon: <Visibility sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.decentralized.title"),
      description: t("solutions.decentralized.description"),
      icon: <PublicOutlined sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
  ]

  const useCases = [
    {
      title: t("useCases.opensource.title"),
      description: t("useCases.opensource.description"),
      icon: <Groups sx={{ fontSize: 18, color: "white" }} />,
    },
    {
      title: t("useCases.cooperative.title"),
      description: t("useCases.cooperative.description"),
      icon: <FavoriteOutlined sx={{ fontSize: 18, color: "white" }} />,
    },
    {
      title: t("useCases.social.title"),
      description: t("useCases.social.description"),
      icon: <Stars sx={{ fontSize: 18, color: "white" }} />,
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

  // Generate breathing effect circles
  const generateBreathingCircles = (count, colors, sizes) => {
    const circles = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = sizes[i % sizes.length]
      const color = colors[i % colors.length]
      const delay = Math.random() * 4

      circles.push(
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={size} fill={color} opacity="0.1">
          <animate
            attributeName="r"
            values={`${size};${size * 1.5};${size}`}
            dur="6s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.05;0.15;0.05"
            dur="6s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>,
      )
    }
    return circles
  }

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SharedNavbar variant="cooperative" />

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
        {/* Breathing Effect Background */}
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
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {generateBreathingCircles(
              25,
              [theme.palette.secondary.main, theme.palette.primary.main2, theme.palette.primary.light],
              [2, 3, 4, 5],
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
                    animation: "breathe 4s ease-in-out infinite",
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
        {/* Gentle Breathing Pattern */}
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
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {generateBreathingCircles(15, [theme.palette.primary.light2, theme.palette.primary.main2], [1.5, 2, 2.5])}
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
                        content: '"!"',
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

      {/* Solutions Section - Gradient Cards */}
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
        {/* Complex Breathing Pattern */}
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
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {generateBreathingCircles(
              30,
              [theme.palette.secondary.main, theme.palette.primary.main, theme.palette.primary.light],
              [1, 2, 3, 4],
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
        {/* Gentle Breathing Pattern */}
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
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {generateBreathingCircles(
              20,
              [theme.palette.secondary.main, theme.palette.primary.light2],
              [1.5, 2.5, 3.5],
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
        {/* Final Breathing Pattern */}
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
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {generateBreathingCircles(15, [theme.palette.secondary.main, theme.palette.primary.main2], [2, 3, 4])}
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
        @keyframes breathe {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.05);
          }
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

export default CooperativeLanding
