"use client"

import {
  AccountBalance as AccountBalanceIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  Balance as BalanceIcon,
  Group as GroupIcon,
  Lightbulb as LightbulbIcon,
  Psychology as PsychologyIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { Button, Card, CardContent, CardMedia, Chip, Container, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import config from "../../config";
import { ROUTES } from "../../constants/constants";
import { trackConsultationServiceClick, trackPlatformServiceClick } from "../../utils/analytics";
import CalendarBookingDialog from "./CalendarBookingDialog";

const Services = ({ forProfile }) => {
  const { t } = useTranslation("services")
  const router = useRouter()
  const { data: session } = useSession()
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)

  const handleGetStarted = () => {
    // Track analytics event
    trackPlatformServiceClick()
    if (session) {
      router.push(`${ROUTES.welcome.postRegistration}${forProfile ? `?for=${forProfile}` : ""}`)
    } else {
      router.push(`${ROUTES.auth.signin}${forProfile ? `?for=${forProfile}` : ""}`)
    }
  }

  const handleContactAdvisor = () => {
    // Track analytics event
    trackConsultationServiceClick()
    setCalendarDialogOpen(true)
  }

  const handleCloseCalendarDialog = () => {
    setCalendarDialogOpen(false)
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
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/pricing" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

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
                onClick={handleContactAdvisor}
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
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleContactAdvisor}
                  className="services-combined-secondary"
                >
                  {t("combined.cta.secondary")}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Calendar Booking Dialog */}
        <CalendarBookingDialog open={calendarDialogOpen} onClose={handleCloseCalendarDialog} />
      </div>
    </>
  )
}

export default Services
