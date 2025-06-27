"use client"
import {
  AutoAwesome,
  Check,
  Handshake,
  RocketLaunch,
  Science,
  Star,
  Support,
  TrendingUp,
  Verified,
} from "@mui/icons-material" // Added Handshake icon
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
} from "@mui/material"
import { signIn, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import config from "../../config"
import { ROUTES } from "../../constants/constants"
import {
  trackBetaProgramClick,
  trackCustomPlanClick,
  trackFreePlanClick,
  trackPlusPlanClick,
} from "../../utils/analytics" // Added trackCustomPlanClick

const PricingComponent = () => {
  const { t } = useTranslation("pricing")
  const { data: session } = useSession()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handlePlanSelect = (planType) => {
    // Track plan selection before redirect
    if (planType === "free") {
      trackFreePlanClick()
    } else if (planType === "plus") {
      trackPlusPlanClick()
    } else if (planType === "custom") {
      // Added custom plan tracking
      trackCustomPlanClick()
    }

    if (session) {
      // User is logged in, redirect to post-registration
      router.push(ROUTES.welcome.postRegistration)
    } else {
      // User needs to sign in
      signIn("angorasixspring")
    }
  }

  const handleBetaProgram = () => {
    trackBetaProgramClick()

    if (session) {
      router.push(ROUTES.welcome.postRegistration)
    } else {
      signIn("angorasixspring")
    }
  }

  const freeFeatures = [
    t("plans.free.features.contributors"),
    t("plans.free.features.tasks"),
    t("plans.free.features.notifications"),
    t("plans.free.features.support"),
    t("plans.free.features.workspace"),
  ]

  const plusFeatures = [
    t("plans.plus.features.all"),
    t("plans.plus.features.unlimited"),
    t("plans.plus.features.ai"),
    t("plans.plus.features.tracking"),
    t("plans.plus.features.integrations"),
    t("plans.plus.features.workflows"),
    t("plans.plus.features.support"),
  ]

  const customFeatures = [
    // New custom features list
    t("plans.custom.features.all"),
    t("plans.custom.features.tailored"),
    t("plans.custom.features.dedicated"),
    t("plans.custom.features.advanced"),
    t("plans.custom.features.enterprise"),
  ]

  const PlanCard = (
    { plan, isPlus = false, isCustom = false }, // Added isCustom prop
  ) => (
    <Card
      className={`pricing-plan-card ${isPlus ? "pricing-plan-plus" : isCustom ? "pricing-plan-custom" : "pricing-plan-free"}`}
    >
      {isPlus && <Chip label={t("plans.plus.badge")} className="pricing-beta-badge" />}

      <CardContent className="pricing-plan-content">
        <Box className="pricing-plan-header">
          {isPlus ? (
            <AutoAwesome className="pricing-plan-icon plus" />
          ) : isCustom ? ( // Conditional rendering for custom icon
            <Handshake className="pricing-plan-icon custom" />
          ) : (
            <RocketLaunch className="pricing-plan-icon free" />
          )}

          <Typography variant="h4" className="pricing-plan-title">
            {plan.title}
          </Typography>

          <Box className="pricing-plan-price">
            {isPlus ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <Typography variant="h2" className="pricing-price-main">
                  {plan.regularPrice}
                </Typography>
              </Box>
            ) : isCustom ? ( // Conditional rendering for custom price
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
                {t("plans.plus.subtitle")}
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ color: "secondary.main", fontWeight: "bold", ml: 0.5 }}
                >
                  {t("plans.plus.currentPrice")}
                </Typography>
              </Typography>
            )}
            {!isPlus &&
              !isCustom && ( // Conditional rendering for free plan period
                <Typography variant="body2" className="pricing-price-period">
                  {t("plans.free.period")}
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
                )}{" "}
                {/* Conditional rendering for custom feature icon */}
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>

      <CardActions className="pricing-plan-actions">
        <Button
          fullWidth
          variant={isPlus || isCustom ? "contained" : "outlined"} // Custom plan uses contained variant
          size="large"
          onClick={() => handlePlanSelect(isCustom ? "custom" : isPlus ? "plus" : "free")} // Updated onClick for custom plan
          className={`pricing-plan-cta ${isPlus ? "cta-plus" : isCustom ? "cta-custom" : "cta-free"}`} // Added custom CTA class
        >
          {plan.cta}
        </Button>
      </CardActions>
    </Card>
  )

  const plans = [
    {
      title: t("plans.free.title"),
      price: t("plans.free.price"),
      cta: t("plans.free.cta"),
      features: freeFeatures,
    },
    {
      title: t("plans.plus.title"),
      regularPrice: t("plans.plus.regularPrice"),
      currentPrice: t("plans.plus.currentPrice"),
      cta: t("plans.plus.cta"),
      features: plusFeatures,
    },
    {
      // New Custom Plan
      title: t("plans.custom.title"),
      price: t("plans.custom.price"),
      cta: t("plans.custom.cta"),
      features: customFeatures,
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

      <Box className="pricing-page">
        <Container maxWidth="lg" className="pricing-container">
          {/* Hero Section */}
          <Box className="pricing-hero">
            <Typography variant="h3" className="pricing-hero-title">
              {t("hero.title")}
            </Typography>
            <Typography variant="h6" className="pricing-hero-subtitle">
              {t("hero.subtitle")}
            </Typography>
          </Box>

          {/* Beta Program Panel */}
          <Box className="pricing-beta-panel">
            <Box className="beta-panel-content">
              <Box className="beta-panel-header">
                <Science className="beta-panel-icon" />
                <Typography variant="h4" className="beta-panel-title">
                  {t("betaProgram.title")}
                </Typography>
              </Box>

              <Typography variant="body1" className="beta-panel-description">
                {t("betaProgram.description")}
              </Typography>

              <Box className="beta-benefits">
                <Box className="beta-benefit">
                  <Verified className="beta-benefit-icon" />
                  <Typography variant="body2">{t("betaProgram.benefits.premium")}</Typography>
                </Box>
                <Box className="beta-benefit">
                  <TrendingUp className="beta-benefit-icon" />
                  <Typography variant="body2">{t("betaProgram.benefits.evolution")}</Typography>
                </Box>
                <Box className="beta-benefit">
                  <Support className="beta-benefit-icon" />
                  <Typography variant="body2">{t("betaProgram.benefits.priority")}</Typography>
                </Box>
              </Box>

              <Button variant="contained" size="large" onClick={handleBetaProgram} className="beta-panel-cta">
                {t("betaProgram.cta")}
              </Button>
              <Typography
                variant="caption"
                color="primary.contrastText"
                sx={{ mt: 1, display: "block", textAlign: "center" }}
              >
                {t("betaProgram.limitedSpots")}
              </Typography>
            </Box>
          </Box>

          {/* Plans Section */}
          <Box className="pricing-plans-section">
            {isMobile ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="pricing-plans-swiper"
                initialSlide={1}
              >
                {plans.map((plan, index) => (
                  <SwiperSlide key={index}>
                    <PlanCard plan={plan} isPlus={index === 1} isCustom={index === 2} /> {/* Pass isCustom prop */}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Grid container spacing={4} className="pricing-plans-grid">
                {plans.map((plan, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    {" "}
                    {/* Changed md to 4 for 3 columns */}
                    <PlanCard plan={plan} isPlus={index === 1} isCustom={index === 2} /> {/* Pass isCustom prop */}
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default PricingComponent
