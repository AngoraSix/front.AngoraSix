"use client"

import {
  AutoAwesome,
  FavoriteBorder as FavoriteOutlined,
  Handshake,
  Psychology,
  Security,
  TrendingUp,
  WorkspacePremium,
} from "@mui/icons-material"
import { Box, Button, Container, Fade, Grid, Grow, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
import { trackLandingCTAClick } from "../../../utils/analytics"

const ManagerLanding = ({ translationKey }) => {
  const { t } = useTranslation(translationKey)
  const { data: session } = useSession()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()
  const { locale } = router
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
    trackLandingCTAClick("manager", ctaText)

    if (session) {
      router.push(`${ROUTES.welcome.postRegistration}?for=manager`)
    } else {
      router.push(`${ROUTES.auth.signin}?for=manager`)
    }
  }

  const problems = [
    {
      text: t("problems.delegation"),
      keywords: [],
    },
    {
      text: t("problems.trust"),
      keywords: [],
    },
    {
      text: t("problems.ai"),
      keywords: [],
    },
    {
      text: t("problems.transparency"),
      keywords: [],
    },
    {
      text: t("problems.automation"),
      keywords: [],
    },
  ]

  const howItWorksSteps = [
    {
      number: "1",
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
      image: "/images/screenshots/{{locale}}/step1-rules.png",
      imageAlt: t("howItWorks.steps.step1.imageAlt"),
    },
    {
      number: "2",
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

  const solutions = [
    {
      title: t("solutions.workBag.title"),
      description: t("solutions.workBag.description"),
      icon: <Handshake sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.blockchain.title"),
      description: t("solutions.blockchain.description"),
      icon: <Security sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.aiAssistant.title"),
      description: t("solutions.aiAssistant.description"),
      icon: <Psychology sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      title: t("solutions.motivation.title"),
      description: t("solutions.motivation.description"),
      icon: <FavoriteOutlined sx={{ fontSize: 40, color: "white" }} />,
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
  ]

  const useCases = [
    {
      title: t("useCases.entrepreneur.title"),
      description: t("useCases.entrepreneur.description"),
      icon: <TrendingUp sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.entrepreneur.quote"),
    },
    {
      title: t("useCases.founder.title"),
      description: t("useCases.founder.description"),
      icon: <WorkspacePremium sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.founder.quote"),
    },
    {
      title: t("useCases.director.title"),
      description: t("useCases.director.description"),
      icon: <AutoAwesome sx={{ fontSize: 18, color: "white" }} />,
      quote: t("useCases.director.quote"),
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
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/welcome/manager" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      {/* Hero Section - Dark Gradient + Strong Sparkles */}
      <Box className="manager-hero-section">
        <div className="sparkles-container sparkles-strong">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
          <div className="sparkle sparkle-6"></div>
          <div className="sparkle sparkle-7"></div>
          <div className="sparkle sparkle-8"></div>
        </div>

        <Container className="manager-landing-container" maxWidth="lg">
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

      {/* Problems Section - White + Subtle Sparkles */}
      <Box id="problems" data-animate className="manager-problems-section">
        <div className="sparkles-container sparkles-subtle">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
        </div>

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

      {/* How It Works Section */}
      <Box id="how-it-works" data-animate className="manager-how-it-works-section">
        <div className="sparkles-container sparkles-soft">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
        </div>

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

      {/* Solutions Section - Light Gradient + Medium Sparkles */}
      <Box id="solutions" data-animate className="manager-solutions-section">
        <div className="sparkles-container sparkles-medium">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
          <div className="sparkle sparkle-6"></div>
        </div>

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

      {/* Use Cases Section - White + Minimal Sparkles */}
      <Box id="usecases" data-animate className="manager-usecases-section">
        <div className="sparkles-container sparkles-minimal">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
        </div>

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

      {/* Final CTA - Dark Gradient + Strong Sparkles */}
      <Box className="manager-final-cta-section">
        <div className="sparkles-container sparkles-strong">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
          <div className="sparkle sparkle-6"></div>
          <div className="sparkle sparkle-7"></div>
          <div className="sparkle sparkle-8"></div>
        </div>

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

export default ManagerLanding
