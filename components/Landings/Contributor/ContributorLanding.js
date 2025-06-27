"use client"

import {
  FavoriteBorder as FavoriteOutlined,
  Handshake,
  Public,
  Security,
  TrendingUp,
  WorkOutline,
  WorkspacePremium,
} from "@mui/icons-material"
import { Box, Button, Container, Fade, Grid, Grow, Typography, useTheme } from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "../../../config"
import { trackLandingCTAClick } from "../../../utils/analytics"
import SharedNavbar from "../../common/SharedNavbar"

const ContributorLanding = ({ translationKey }) => {
  const { t } = useTranslation(translationKey)
  const theme = useTheme()
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

  const handleRegister = (ctaText) => () => {
    // Track CTA click before redirect
    trackLandingCTAClick("contributor", ctaText)

    router.push("/welcome/post-registration?for=contributor")
  }

  const problems = [
    {
      text: t("problems.meaningless"),
      keywords: ["trabajos que no te motivan", "unmotivating and unfulfilling"],
    },
    {
      text: t("problems.exploitation"),
      keywords: ["das mucho más de lo que recibís", "receiving less than you deserve"],
    },
    {
      text: t("problems.uncertainty"),
      keywords: ["garantice tu futuro", "doesn’t feel like a safe path"],
    },
    {
      text: t("problems.mismatch"),
      keywords: ["talento no está siendo aprovechado", "you could do more"],
    },
    {
      text: t("problems.income"),
      keywords: ["Querés ganar mejor", "You want better earnings"],
    },
    {
      text: t("problems.time"),
      keywords: ["No tenés tiempo para vos", "You don't have enough time"],
    },
  ]

  const solutions = [
    {
      title: t("solutions.ownership.title"),
      description: t("solutions.ownership.description"),
      icon: <Handshake sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.freedom.title"),
      description: t("solutions.freedom.description"),
      icon: <WorkOutline sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.purpose.title"),
      description: t("solutions.purpose.description"),
      icon: <FavoriteOutlined sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.transparency.title"),
      description: t("solutions.transparency.description"),
      icon: <Security sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
  ]

  const useCases = [
    {
      title: t("useCases.freelancer.title"),
      description: t("useCases.freelancer.description"),
      icon: <TrendingUp sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.freelancer.quote"),
    },
    {
      title: t("useCases.careerChange.title"),
      description: t("useCases.careerChange.description"),
      icon: <WorkspacePremium sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.careerChange.quote"),
    },
    {
      title: t("useCases.collaborator.title"),
      description: t("useCases.collaborator.description"),
      icon: <Public sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.collaborator.quote"),
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

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoDark} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/welcome/contributor" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      {/* Hero Section - Dark Gradient + Strong Tunnel */}
      <Box className="contributor-hero-section">
        <Container className="contributor-landing-container" maxWidth="lg">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 700,
                  mb: 3,
                  lineHeight: 1.1,
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
                  onClick={handleRegister(t("hero.cta"))}
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

      {/* Problems Section - White + Subtle Tunnel */}
      <Box id="problems" data-animate className="contributor-problems-section">
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
                    alignItems: "center",
                    gap: 3,
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "white",
                    border: `2px solid ${theme.palette.primary.light}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
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
                      backgroundColor: theme.palette.primary.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
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

      {/* Solutions Section - Light Gradient + Medium Tunnel */}
      <Box id="solutions" data-animate className="contributor-solutions-section">
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
              <Grid item xs={12} md={6} key={index}>
                <Grow in={visibleSections.solutions} timeout={1000 + index * 300}>
                  <Box
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
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AngoraSix in Action Section - Light Blue + Soft Tunnel */}
      <Box id="angorasix-action" data-animate className="contributor-angorasix-section">
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Fade in={visibleSections["angorasix-action"]} timeout={1000}>
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
                {t("angorasixInAction.title")}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.dark2, maxWidth: "600px", mx: "auto", mb: 6 }}
              >
                {t("angorasixInAction.subtitle")}
              </Typography>
            </Box>
          </Fade>

          <Grow in={visibleSections["angorasix-action"]} timeout={1500}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src="/images/contributor-stats.png"
                alt={t("angorasixInAction.imageAlt")}
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 3,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Box>
          </Grow>
        </Container>
      </Box>

      {/* Use Cases Section - White + Minimal Tunnel */}
      <Box id="usecases" data-animate className="contributor-usecases-section">
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
                  <Box
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
                      <Typography variant="body2" sx={{ color: theme.palette.primary.dark2, lineHeight: 1.6, mb: 2 }}>
                        {useCase.description}
                      </Typography>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "10px",
                          bgcolor: `${theme.palette.secondary.main}15`,
                          borderLeft: `3px solid ${theme.palette.secondary.main}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontStyle: "italic",
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                          }}
                        >
                          {`"${useCase.quote}"`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA - Dark Gradient + Strong Tunnel */}
      <Box className="contributor-final-cta-section">
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 3,
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
              onClick={handleRegister(t("finalCta.cta"))}
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
    </>
  )
}

export default ContributorLanding
