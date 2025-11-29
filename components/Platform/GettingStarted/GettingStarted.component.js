'use client'

import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import config from '../../../config'
import { ROUTES } from '../../../constants/constants'

const GettingStarted = () => {
  const { t } = useTranslation('getting-started')
  const router = useRouter()
  const { data: session } = useSession()

  const handleNewProject = () => {
    router.push(ROUTES.management.new)
  }

  const handleMyProjects = () => {
    router.push(ROUTES.projects.list)
  }

  const steps = [
    {
      number: 1,
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      action: {
        text: t('steps.step1.action'),
        onClick: handleNewProject,
      },
      image: '/images/project-creation.png',
      imageAlt: t('steps.step1.title'),
      imagePosition: 'right',
    },
    {
      number: 2,
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      action: {
        text: t('steps.step2.action'),
        onClick: handleMyProjects,
      },
      image: '/images/team-collaboration.png',
      imageAlt: t('steps.step2.title'),
      imagePosition: 'left',
    },
    {
      number: 3,
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      action: null,
      image: '/images/integrations.png',
      imageAlt: t('steps.step3.title'),
      imagePosition: 'right',
    },
    {
      number: 4,
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      action: {
        text: t('steps.step4.action'),
        href: ROUTES.methodology.overview,
      },
      image: '/images/project-stats.png',
      imageAlt: t('steps.step4.title'),
      imagePosition: 'left',
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
          content="https://angorasix.com/platform/getting-started"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      <div className="GettingStartedPage">
        {/* Hero Section */}
        <div className="getting-started-hero">
          <Container maxWidth="lg">
            <div className="hero-content">
              <Typography variant="h1" className="hero-title">
                {t('hero.title')}
              </Typography>
              <Typography variant="body1" className="hero-description main">
                {t('hero.description')}
              </Typography>

              <Typography
                variant="body2"
                component="blockquote"
                className="hero-quote"
              >
                {t('hero.quote')}
              </Typography>
            </div>
          </Container>
        </div>

        {/* Advisory Section */}
        <div className="getting-started-compass-bonus">
          <Container maxWidth="lg">
            <Box className="compass-bonus">
              <Typography
                variant="caption"
                component="strong"
                className="compass-bonus-label"
              >
                {t('compass-bonus.title')}:
              </Typography>
              <Typography variant="caption" className="compass-bonus-text">
                {t('compass-bonus.description')}
              </Typography>
              <div className="compass-bonus-cta">
                <Link href={ROUTES.services} className="compass-bonus-cta-link">
                  {t('compass-bonus.cta')}
                  <ArrowForwardIcon fontSize="small" />
                </Link>
              </div>
            </Box>
          </Container>
        </div>

        {/* Steps Section */}
        <div className="steps-section">
          <Container maxWidth="lg">
            <div className="steps-container">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`step-item step-${step.imagePosition}`}
                >
                  <div className="step-content">
                    <div className="step-header">
                      <div className="step-number">{step.number}</div>
                      <Typography variant="h2" className="step-title">
                        {step.title}
                      </Typography>
                    </div>
                    <Typography variant="body1" className="step-description">
                      {step.description}
                    </Typography>
                    {step.action && (
                      <div className="step-action">
                        {step.action.href ? (
                          <Link href={step.action.href} className="step-link">
                            {step.action.text}
                            <ArrowForwardIcon />
                          </Link>
                        ) : (
                          <button
                            onClick={step.action.onClick}
                            className="step-link"
                          >
                            {step.action.text}
                            <ArrowForwardIcon />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="step-image">
                    <Image
                      src={step.image || '/placeholder.svg'}
                      alt={step.imageAlt}
                      width={600}
                      height={400}
                      className="step-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}

export default GettingStarted
