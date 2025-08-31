"use client"

import {
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  Balance as BalanceIcon,
  Lightbulb as LightbulbIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
import { trackConsultationServiceClick } from "../../../utils/analytics"

const IdeasLanding = ({ translationKey }) => {
  const { t } = useTranslation(translationKey)
  const router = useRouter()
  const { data: session } = useSession()

  const handleBookCall = () => {
    // Track analytics event
    trackConsultationServiceClick("welcome_ideas")
    // Navigate to services page with guidance section and open dialog
    router.push(`${ROUTES.services}?section=guidance&dialog=true`)
  }

  const handleRegister = (ctaText = "hero.cta") => () => {
    // Track CTA click before redirect
    trackLandingCTAClick("ideas", ctaText)

    if (session) {
      router.push(`${ROUTES.welcome.postRegistration}?for=ideas`)
    } else {
      router.push(`${ROUTES.auth.signin}?for=ideas`)
    }
  }

  const processSteps = [
    {
      icon: <PsychologyIcon />,
      title: t("process.assess.title"),
      description: t("process.assess.description"),
      color: "#1b5993",
    },
    {
      icon: <BalanceIcon />,
      title: t("process.define.title"),
      description: t("process.define.description"),
      color: "#fe5f55",
    },
    {
      icon: <SpeedIcon />,
      title: t("process.methodology.title"),
      description: t("process.methodology.description"),
      color: "#1b5993",
    },
    {
      icon: <AutoAwesomeIcon />,
      title: t("process.platform.title"),
      description: t("process.platform.description"),
      color: "#fe5f55",
    },
    {
      icon: <TrendingUpIcon />,
      title: t("process.metrics.title"),
      description: t("process.metrics.description"),
      color: "#1b5993",
    },
  ]

  const benefits = [
    {
      icon: <LightbulbIcon />,
      title: t("benefits.clarity.title"),
      description: t("benefits.clarity.description"),
    },
    {
      icon: <BalanceIcon />,
      title: t("benefits.fairness.title"),
      description: t("benefits.fairness.description"),
    },
    {
      icon: <SpeedIcon />,
      title: t("benefits.momentum.title"),
      description: t("benefits.momentum.description"),
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/welcome/ideas" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      <div className="ideas-landing">
        {/* Hero Section */}
        <div className="ideas-hero">
          <div className="ideas-hero-container">
            <div className="ideas-hero-content">
              <div className="ideas-hero-text">
                <Typography variant="h1" className="ideas-hero-title">
                  {t("hero.title")}
                </Typography>
                <Typography variant="h5" className="ideas-hero-subtitle">
                  {t("hero.subtitle")}
                </Typography>
                <Typography variant="body1" className="ideas-hero-description">
                  {t("hero.description")}
                </Typography>
                <div className="ideas-hero-ctas">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleBookCall}
                    className="ideas-hero-button primary"
                    endIcon={<ArrowForwardIcon />}
                  >
                    {t("hero.cta.primary")}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleRegister}
                    className="ideas-hero-button secondary"
                  >
                    {t("hero.cta.secondary")}
                  </Button>
                </div>
              </div>
              <div className="ideas-hero-image">
                <Image
                  src="/images/resources/scrum-1.png"
                  alt={t("hero.title")}
                  width={400}
                  height={350}
                  className="ideas-hero-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="ideas-value-section">
          <div className="ideas-section-header">
            <Typography variant="h2" className="ideas-section-title">
              {t("value.title")}
            </Typography>
            <Typography variant="body1" className="ideas-section-description">
              {t("value.subtitle")}
            </Typography>
          </div>

          <div className="ideas-benefits-container">
            <Grid container spacing={4} className="ideas-benefits-grid">
              {benefits.map((benefit, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card className="ideas-benefit-card">
                    <CardContent className="ideas-benefit-content">
                      <div className="ideas-benefit-icon">{benefit.icon}</div>
                      <Typography variant="h6" className="ideas-benefit-title">
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" className="ideas-benefit-description">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

        {/* Process Section */}
        <div className="ideas-process-section">
          <div className="ideas-section-header">
            <Typography variant="h2" className="ideas-section-title">
              {t("process.title")}
            </Typography>
            <Typography variant="body1" className="ideas-section-description">
              {t("process.subtitle")}
            </Typography>
          </div>

          <div className="ideas-process-container">
            <div className="ideas-process-steps">
              {processSteps.map((step, index) => (
                <div key={index} className="ideas-process-step">
                  <div className="ideas-step-number" style={{ backgroundColor: step.color }}>
                    {index + 1}
                  </div>
                  <div className="ideas-step-content">
                    <div className="ideas-step-icon" style={{ color: step.color }}>
                      {step.icon}
                    </div>
                    <div className="ideas-step-text">
                      <Typography variant="h6" className="ideas-step-title">
                        {step.title}
                      </Typography>
                      <Typography variant="body2" className="ideas-step-description">
                        {step.description}
                      </Typography>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && <div className="ideas-step-connector"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Section */}
        <div className="ideas-partnership-section">
          <div className="ideas-partnership-container">
            <div className="ideas-partnership-content">
              <div className="ideas-partnership-text">
                <Typography variant="h2" className="ideas-partnership-title">
                  {t("partnership.title")}
                </Typography>
                <Typography variant="body1" className="ideas-partnership-description">
                  {t("partnership.description")}
                </Typography>
                <Typography variant="body1" className="ideas-partnership-description">
                  {t("partnership.approach")}
                </Typography>
              </div>
              <div className="ideas-partnership-image">
                <Image
                  src="/images/project-stats.png"
                  alt={t("partnership.title")}
                  width={350}
                  height={300}
                  className="ideas-partnership-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="ideas-cta-section">
          <div className="ideas-cta-content">
            <Typography variant="h2" className="ideas-cta-title">
              {t("cta.title")}
            </Typography>
            <Typography variant="body1" className="ideas-cta-description">
              {t("cta.description")}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleBookCall}
              className="ideas-cta-button"
              endIcon={<ArrowForwardIcon />}
            >
              {t("cta.button")}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default IdeasLanding
