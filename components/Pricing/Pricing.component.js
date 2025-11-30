'use client'
import {
  AutoAwesome,
  Check,
  Handshake,
  RocketLaunch,
  Star,
  VolunteerActivism,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import config from '../../config'
import { ROUTES } from '../../constants/constants'
import {
  trackCustomPlanClick,
  trackFreePlanClick,
  trackPlusPlanClick,
} from '../../utils/analytics'

const PricingComponent = () => {
  const { t } = useTranslation('pricing')
  const { data: session } = useSession()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Refs for scrolling
  const platformRef = useRef(null)
  const advisoryRef = useRef(null)

  const handlePlanSelect = (planType) => {
    if (planType === 'free') {
      trackFreePlanClick()
    } else if (planType === 'plus') {
      trackPlusPlanClick()
    } else if (planType === 'custom') {
      trackCustomPlanClick()
    }
    if (session) {
      router.push(ROUTES.management.new)
    } else {
      router.push(ROUTES.auth.signin)
    }
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const freeFeatures = [
    { base: t('plans.free.features.contributors') },
    { base: t('plans.free.features.tasks') },
    { base: t('plans.free.features.notifications') },
    { base: t('plans.free.features.tools') },
    {
      base: t('plans.free.features.support.base'),
      link: t('plans.free.features.support.link'),
    },
    { base: t('plans.free.features.workspace') },
  ]

  const plusFeatures = [
    { base: t('plans.plus.features.all') },
    { base: t('plans.plus.features.unlimited') },
    { base: t('plans.plus.features.ai') },
    { base: t('plans.plus.features.tracking') },
    { base: t('plans.plus.features.integrations') },
    { base: t('plans.plus.features.workflows') },
    { base: t('plans.plus.features.support') },
  ]

  const customFeatures = [
    { base: t('plans.custom.features.all') },
    { base: t('plans.custom.features.tailored') },
    { base: t('plans.custom.features.dedicated') },
    { base: t('plans.custom.features.advanced') },
    { base: t('plans.custom.features.enterprise') },
  ]

  const advisoryFeatures = [
    { base: t('advisory.features.methodology') },
    { base: t('advisory.features.structure') },
    { base: t('advisory.features.guidance') },
    { base: t('advisory.features.ongoing') },
  ]

  const PlanCard = ({ plan, isPlus = false, isCustom = false }) => (
    <Card
      className={`pricing-plan-card ${
        isPlus
          ? 'pricing-plan-plus'
          : isCustom
          ? 'pricing-plan-custom'
          : 'pricing-plan-free'
      }`}
    >
      {isPlus && (
        <Chip label={t('plans.plus.badge')} className="pricing-beta-badge" />
      )}

      <CardContent className="pricing-plan-content">
        <Box className="pricing-plan-header">
          {isPlus ? (
            <AutoAwesome className="pricing-plan-icon plus" />
          ) : isCustom ? (
            <Handshake className="pricing-plan-icon custom" />
          ) : (
            <RocketLaunch className="pricing-plan-icon free" />
          )}

          <Typography variant="h4" className="pricing-plan-title">
            {plan.title}
          </Typography>

          <Box className="pricing-plan-price">
            {isPlus ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="h2" className="pricing-price-main">
                  {plan.regularPrice}
                </Typography>
              </Box>
            ) : isCustom ? (
              <Typography variant="h2" className="pricing-price-main">
                {plan.price}
              </Typography>
            ) : (
              <Typography variant="h2" className="pricing-price-main">
                {plan.price}
              </Typography>
            )}
            {isPlus && (
              <Typography variant="body1" className="pricing-price-subtitle">
                {t('plans.plus.subtitle')}
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ color: 'secondary.main', fontWeight: 'bold', ml: 0.5 }}
                >
                  {t('plans.plus.currentPrice')}
                </Typography>
              </Typography>
            )}
            {!isPlus && !isCustom && (
              <Typography variant="body2" className="pricing-price-period">
                {t('plans.free.period')}
              </Typography>
            )}
          </Box>
        </Box>

        <Divider className="pricing-plan-divider" />

        <List className="pricing-features-list">
          {plan.features.map((feature, index) => (
            <ListItem key={index} className="pricing-feature-item">
              <ListItemIcon className="pricing-feature-icon">
                {isPlus ? (
                  <Star className="feature-icon plus" />
                ) : isCustom ? (
                  <Check className="feature-icon custom" />
                ) : (
                  <Check className="feature-icon free" />
                )}
              </ListItemIcon>
              {feature.link ? (
                <ListItemText
                  primary={
                    <Typography component={'span'}>
                      {feature.base}
                      <Link className="feature-link" href="/services">
                        {feature.link}
                      </Link>
                    </Typography>
                  }
                />
              ) : (
                <ListItemText primary={feature.base} />
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>

      <CardActions className="pricing-plan-actions">
        <Button
          fullWidth
          variant={isPlus || isCustom ? 'contained' : 'outlined'}
          size="large"
          onClick={() =>
            handlePlanSelect(isCustom ? 'custom' : isPlus ? 'plus' : 'free')
          }
          className={`pricing-plan-cta ${
            isPlus ? 'cta-plus' : isCustom ? 'cta-custom' : 'cta-free'
          }`}
        >
          {plan.cta}
        </Button>
      </CardActions>
    </Card>
  )

  const plans = [
    {
      title: t('plans.free.title'),
      price: t('plans.free.price'),
      cta: t('plans.free.cta'),
      features: freeFeatures,
    },
    {
      title: t('plans.plus.title'),
      regularPrice: t('plans.plus.regularPrice'),
      currentPrice: t('plans.plus.currentPrice'),
      cta: t('plans.plus.cta'),
      features: plusFeatures,
    },
    {
      title: t('plans.custom.title'),
      price: t('plans.custom.price'),
      cta: t('plans.custom.cta'),
      features: customFeatures,
    },
  ]

  const initialSlide = 1

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
          content="https://angorasix.com/pricing"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>

      <Box className="pricing-page">
        {/* Hero Section with Navigation */}
        <Box className="pricing-hero">
          <Container maxWidth="lg">
            <Box className="hero-content">
              <Typography variant="h3" className="pricing-hero-title">
                {t('hero.title')}
              </Typography>
              <Typography variant="h6" className="pricing-hero-subtitle">
                {t('hero.subtitle')}
              </Typography>

              {/* Navigation Links */}
              <Box className="pricing-hero-badges">
                <Chip
                  label={t('navigation.platform')}
                  className="pricing-badge guidance clickable"
                  onClick={() => scrollToSection(platformRef)}
                  clickable
                />
                <Chip
                  label={t('navigation.advisory')}
                  className="pricing-badge platform clickable"
                  onClick={() => scrollToSection(advisoryRef)}
                  clickable
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Platform Plans Section */}
        <Box ref={platformRef} className="pricing-section">
          <Typography variant="h3" className="pricing-section-title">
            {t('platform.title')}
          </Typography>
          <Typography variant="body1" className="pricing-section-subtitle">
            {t('platform.subtitle')}
          </Typography>

          <Box className="pricing-plans-section">
            {isMobile ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="pricing-plans-swiper"
                initialSlide={initialSlide}
              >
                {plans.map((plan, index) => (
                  <SwiperSlide key={index}>
                    <PlanCard
                      plan={plan}
                      isPlus={index === 1}
                      isCustom={index === 2}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Grid container spacing={4} className="pricing-plans-grid">
                {plans.map((plan, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <PlanCard
                      plan={plan}
                      isPlus={index === 1}
                      isCustom={index === 2}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>

        {/* Advisory Services Section */}
        <Box ref={advisoryRef} className="pricing-advisory-section">
          <Box className="advisory-header">
            <Typography variant="h3" className="pricing-section-title">
              {t('advisory.title')}
            </Typography>
          </Box>

          <Typography variant="h5" className="advisory-subtitle">
            {t('advisory.subtitle')}
          </Typography>

          <Card className="advisory-pwyw-card">
            <CardContent className="advisory-pwyw-content">
              <Box className="pwyw-header">
                <VolunteerActivism className="pwyw-icon" />
                <Typography variant="h4" className="pwyw-title">
                  {t('advisory.pwyw.title')}
                </Typography>
              </Box>

              <Typography variant="body1" className="pwyw-description">
                {t('advisory.pwyw.description')}
              </Typography>

              <Divider className="pwyw-divider" />

              <Typography variant="h6" className="pwyw-section-title">
                {t('advisory.pwyw.whatWeOffer')}
              </Typography>

              <List className="advisory-features-list">
                {advisoryFeatures.map((feature, index) => (
                  <ListItem key={index} className="advisory-feature-item">
                    <ListItemIcon className="advisory-feature-icon">
                      <Check className="feature-icon advisory" />
                    </ListItemIcon>
                    <ListItemText primary={feature.base} />
                  </ListItem>
                ))}
              </List>

              <Box className="pwyw-principles">
                <Typography variant="h6" className="pwyw-section-title">
                  {t('advisory.pwyw.principles.title')}
                </Typography>
                <Box className="pwyw-principle">
                  <Typography variant="body2" className="pwyw-principle-text">
                    <strong>
                      {t('advisory.pwyw.principles.access.title')}:
                    </strong>{' '}
                    {t('advisory.pwyw.principles.access.description')}
                  </Typography>
                </Box>
                <Box className="pwyw-principle">
                  <Typography variant="body2" className="pwyw-principle-text">
                    <strong>
                      {t('advisory.pwyw.principles.trust.title')}:
                    </strong>{' '}
                    {t('advisory.pwyw.principles.trust.description')}
                  </Typography>
                </Box>
                <Box className="pwyw-principle">
                  <Typography variant="body2" className="pwyw-principle-text">
                    <strong>
                      {t('advisory.pwyw.principles.sustainability.title')}:
                    </strong>{' '}
                    {t('advisory.pwyw.principles.sustainability.description')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions className="advisory-pwyw-actions">
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() =>
                  router.push(`${ROUTES.services}?section=guidance&dialog=true`)
                }
                className="advisory-cta"
              >
                {t('advisory.cta')}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </>
  )
}

export default PricingComponent
