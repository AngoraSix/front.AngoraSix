'use client'

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
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import config from '../../config'
import { ROUTES } from '../../constants/constants'
import {
  trackConsultationServiceClick,
  trackPlatformServiceClick,
} from '../../utils/analytics'
import CalendarBookingDialog from './CalendarBookingDialog'

const Services = () => {
  const { t } = useTranslation('services')
  const router = useRouter()
  const { data: session } = useSession()
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false)

  // Check for URL parameters to auto-open dialog and scroll to section
  useEffect(() => {
    const { section, dialog } = router.query

    if (section === 'guidance') {
      const element = document.getElementById('guidance-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    if (dialog === 'true') {
      setCalendarDialogOpen(true)
    }
  }, [router.query])

  const handleGetStarted = () => {
    // Track analytics event
    trackPlatformServiceClick()
    if (session) {
      router.push(ROUTES.management.new)
    } else {
      router.push(ROUTES.auth.signin)
    }
  }

  const handleExploreMethodology = () => {
    router.push(ROUTES.methodology.overview)
  }

  const handleContactAdvisor = () => {
    // Track analytics event
    trackConsultationServiceClick()
    setCalendarDialogOpen(true)
  }

  const handleCloseCalendarDialog = () => {
    setCalendarDialogOpen(false)
    // Clean up URL parameters
    const { section, dialog, ...cleanQuery } = router.query
    router.replace(
      {
        pathname: router.pathname,
        query: cleanQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const guidanceFeatures = [
    {
      icon: <SpeedIcon />,
      title: t('guidance.agile.title'),
      description: t('guidance.agile.description'),
    },
    {
      icon: <LightbulbIcon />,
      title: t('guidance.lean.title'),
      description: t('guidance.lean.description'),
    },
    {
      icon: <PsychologyIcon />,
      title: t('guidance.design.title'),
      description: t('guidance.design.description'),
    },
    {
      icon: <BalanceIcon />,
      title: t('guidance.management.title'),
      description: t('guidance.management.description'),
    },
  ]

  const platformFeatures = [
    {
      icon: <TrendingUpIcon />,
      title: t('platform.contribution.title'),
      description: t('platform.contribution.description'),
    },
    {
      icon: <BalanceIcon />,
      title: t('platform.ownership.title'),
      description: t('platform.ownership.description'),
    },
    {
      icon: <GroupIcon />,
      title: t('platform.governance.title'),
      description: t('platform.governance.description'),
    },
    {
      icon: <AccountBalanceIcon />,
      title: t('platform.finance.title'),
      description: t('platform.finance.description'),
    },
  ]

  return (
    <>
      <Head>
        <title>{t('page.title')}</title>
        <meta name="description" content={t('page.description')} />

        <meta property="og:title" key="og.title" content={t('page.title')} />
        <meta
          property="og:description"
          key="og.description"
          content={t('page.description')}
        />
        <meta
          property="og:image"
          key="og.image"
          content={config.site.head.image.logoSquare}
        />
        <meta
          property="og:url"
          key="og.url"
          content="https://angorasix.com/services"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      <div className="services-page">
        {/* Hero Section */}
        <div className="services-hero">
          <Container maxWidth="lg">
            <div className="services-hero-content">
              <Typography variant="h1" className="services-hero-title">
                {t('hero.title')}
              </Typography>
              <Typography variant="h5" className="services-hero-subtitle">
                {t('hero.subtitle')}
              </Typography>
              <div className="services-hero-badges">
                <Chip
                  label={t('hero.badge1')}
                  className="services-badge guidance clickable"
                  onClick={() => scrollToSection('guidance-section')}
                  clickable
                />
                <Chip
                  label={t('hero.badge2')}
                  className="services-badge platform clickable"
                  onClick={() => scrollToSection('platform-section')}
                  clickable
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Guidance Services Section */}
        <div
          id="guidance-section"
          className="services-section guidance-section"
        >
          <div className="services-section-header">
            <div className="services-section-badge">
              <PsychologyIcon />
              <span>{t('guidance.badge')}</span>
            </div>
            <Typography variant="h2" className="services-section-title">
              {t('guidance.title')}
            </Typography>
            <Typography
              variant="body1"
              className="services-section-description"
            >
              {t('guidance.subtitle')}
            </Typography>
          </div>

          {/* Service Main Image */}
          <div className="services-section-image">
            <Image
              src="/images/resources/scrum-1.png"
              alt={t('guidance.title')}
              width={350}
              height={300}
              className="services-main-image"
            />
          </div>

          {/* Features Grid */}
          <Grid container spacing={3} className="services-features-grid">
            {guidanceFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="services-feature-card guidance-feature">
                  <CardContent className="services-feature-content">
                    <div className="services-feature-icon guidance-icon">
                      {feature.icon}
                    </div>
                    <Typography variant="h6" className="services-feature-title">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="services-feature-description"
                    >
                      {feature.description}
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
              className="services-cta services-guidance-cta"
              endIcon={<ArrowForwardIcon />}
            >
              {t('guidance.cta')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleExploreMethodology}
              className="services-cta services-methodology-cta"
              endIcon={<ArrowForwardIcon />}
            >
              {t('guidance.cta2')}
            </Button>
          </div>
        </div>

        {/* Platform Section */}
        <div
          id="platform-section"
          className="services-section platform-section"
        >
          <div className="services-section-header">
            <div className="services-section-badge platform-badge">
              <AutoAwesomeIcon />
              <span>{t('platform.badge')}</span>
            </div>
            <Typography variant="h2" className="services-section-title">
              {t('platform.title')}
            </Typography>
            <Typography
              variant="body1"
              className="services-section-description"
            >
              {t('platform.subtitle')}
            </Typography>
          </div>

          {/* Service Main Image */}
          <div className="services-section-image">
            <Image
              src="/images/project-stats.png"
              alt={t('platform.title')}
              width={350}
              height={300}
              className="services-main-image"
            />
          </div>

          {/* Features Grid */}
          <Grid container spacing={3} className="services-features-grid">
            {platformFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="services-feature-card platform-feature">
                  <CardContent className="services-feature-content">
                    <div className="services-feature-icon platform-icon">
                      {feature.icon}
                    </div>
                    <Typography variant="h6" className="services-feature-title">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="services-feature-description"
                    >
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
              {t('platform.cta')}
            </Button>
          </div>
        </div>

        {/* Combined Value Section */}
        <div className="services-combined">
          <div className="services-combined-content">
            <Typography variant="h2" className="services-combined-title">
              {t('combined.title')}
            </Typography>
            <Typography
              variant="body1"
              className="services-combined-description"
            >
              {t('combined.description')}
            </Typography>
            <div className="services-combined-actions">
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                className="services-combined-primary"
                endIcon={<ArrowForwardIcon />}
              >
                {t('combined.cta.primary')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleContactAdvisor}
                className="services-combined-secondary"
              >
                {t('combined.cta.secondary')}
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Booking Dialog */}
        <CalendarBookingDialog
          open={calendarDialogOpen}
          onClose={handleCloseCalendarDialog}
        />
      </div>
    </>
  )
}

export default Services
