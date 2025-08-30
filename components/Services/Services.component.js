"use client"

import { useTranslation } from "next-i18next"
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip } from "@mui/material"
import {
  ArrowForward as ArrowForwardIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  Lightbulb as LightbulbIcon,
  Balance as BalanceIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  AccountBalance as AccountBalanceIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material"
import { useRouter } from "next/router"
import { ROUTES } from "../../constants/constants"

const Services = () => {
  const { t } = useTranslation("services")
  const router = useRouter()

  const handleGetStarted = () => {
    router.push(ROUTES.auth.signin)
  }

  const handleContactUs = () => {
    // TODO: Add contact form or email link
    window.location.href = "mailto:hello@angorasix.com"
  }

  const guidanceServices = [
    {
      icon: <SpeedIcon />,
      title: t("guidance.agile.title"),
      description: t("guidance.agile.description"),
      image: "/images/screenshots/en/step1-rules.png",
      color: "#fe5f55",
    },
    {
      icon: <LightbulbIcon />,
      title: t("guidance.lean.title"),
      description: t("guidance.lean.description"),
      image: "/images/screenshots/en/step2-integrations.png",
      color: "#1b5993",
    },
    {
      icon: <PsychologyIcon />,
      title: t("guidance.design.title"),
      description: t("guidance.design.description"),
      image: "/images/screenshots/en/result0-ownership.png",
      color: "#fe5f55",
    },
    {
      icon: <BalanceIcon />,
      title: t("guidance.management.title"),
      description: t("guidance.management.description"),
      image: "/images/screenshots/en/result1-decision.png",
      color: "#1b5993",
    },
  ]

  const platformFeatures = [
    {
      icon: <TrendingUpIcon />,
      title: t("platform.contribution.title"),
      description: t("platform.contribution.description"),
      image: "/images/contributor-stats.png",
    },
    {
      icon: <BalanceIcon />,
      title: t("platform.ownership.title"),
      description: t("platform.ownership.description"),
      image: "/images/project-stats.png",
    },
    {
      icon: <GroupIcon />,
      title: t("platform.governance.title"),
      description: t("platform.governance.description"),
      image: "/images/screenshots/en/result1-decision.png",
    },
    {
      icon: <AccountBalanceIcon />,
      title: t("platform.finance.title"),
      description: t("platform.finance.description"),
      image: "/images/screenshots/en/result2-financial.png",
    },
  ]

  return (
    <div className="services-page">
      {/* Hero Section */}
      <div className="services-hero">
        <Container maxWidth="lg">
          <div className="services-hero-content">
            <Typography variant="h1" className="services-hero-title">
              {t("hero.title")}
            </Typography>
            <Typography variant="h5" className="services-hero-subtitle">
              {t("hero.subtitle")}
            </Typography>
            <div className="services-hero-badges">
              <Chip label={t("hero.badge1")} className="services-badge guidance" />
              <Chip label={t("hero.badge2")} className="services-badge platform" />
            </div>
          </div>
        </Container>
      </div>

      <Container maxWidth="lg">
        {/* Guidance Services Section */}
        <div className="services-section guidance-section">
          <div className="services-section-header">
            <div className="services-section-badge">
              <PsychologyIcon />
              <span>{t("guidance.badge")}</span>
            </div>
            <Typography variant="h2" className="services-section-title">
              {t("guidance.title")}
            </Typography>
            <Typography variant="body1" className="services-section-description">
              {t("guidance.subtitle")}
            </Typography>
          </div>

          <Grid container spacing={4} className="services-grid">
            {guidanceServices.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="services-card guidance-card">
                  <div className="services-card-image-container">
                    <CardMedia
                      component="img"
                      image={service.image}
                      alt={service.title}
                      className="services-card-image"
                    />
                    <div className="services-card-overlay" style={{ backgroundColor: `${service.color}15` }}>
                      <div className="services-card-icon" style={{ color: service.color }}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="services-card-content">
                    <Typography variant="h5" className="services-card-title">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" className="services-card-description">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className="services-section-cta">
            <Button
              variant="outlined"
              size="large"
              onClick={handleContactUs}
              className="services-guidance-cta"
              endIcon={<ArrowForwardIcon />}
            >
              {t("guidance.cta")}
            </Button>
          </div>
        </div>

        {/* Platform Section */}
        <div className="services-section platform-section">
          <div className="services-section-header">
            <div className="services-section-badge platform-badge">
              <AutoAwesomeIcon />
              <span>{t("platform.badge")}</span>
            </div>
            <Typography variant="h2" className="services-section-title">
              {t("platform.title")}
            </Typography>
            <Typography variant="body1" className="services-section-description">
              {t("platform.subtitle")}
            </Typography>
          </div>

          <Grid container spacing={4} className="services-grid">
            {platformFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="services-card platform-card">
                  <div className="services-card-image-container">
                    <CardMedia
                      component="img"
                      image={feature.image}
                      alt={feature.title}
                      className="services-card-image"
                    />
                    <div className="services-card-overlay platform-overlay">
                      <div className="services-card-icon platform-icon">{feature.icon}</div>
                    </div>
                  </div>
                  <CardContent className="services-card-content">
                    <Typography variant="h5" className="services-card-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="services-card-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className="services-section-cta">
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              className="services-platform-cta"
              endIcon={<ArrowForwardIcon />}
            >
              {t("platform.cta")}
            </Button>
          </div>
        </div>

        {/* Combined Value Section */}
        <div className="services-combined">
          <div className="services-combined-content">
            <Typography variant="h2" className="services-combined-title">
              {t("combined.title")}
            </Typography>
            <Typography variant="body1" className="services-combined-description">
              {t("combined.description")}
            </Typography>
            <div className="services-combined-actions">
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                className="services-combined-primary"
                endIcon={<ArrowForwardIcon />}
              >
                {t("combined.cta.primary")}
              </Button>
              <Button variant="outlined" size="large" onClick={handleContactUs} className="services-combined-secondary">
                {t("combined.cta.secondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Services
