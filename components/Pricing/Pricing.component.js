"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Head from "next/head"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material"
import { Check, Star, RocketLaunch, AutoAwesome } from "@mui/icons-material"
import CountdownTimer from "../common/CountdownTimer"
import { ROUTES } from "../../constants/constants"
import SharedNavbar from "../common/SharedNavbar"

const PricingComponent = () => {
  const { t } = useTranslation("pricing")
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Set launch date (example: 30 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30)

  const handlePlanSelect = (planType) => {
    // Track event for analytics
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "plan_selected", {
        event_category: "pricing",
        event_label: planType,
        value: planType === "plus" ? 1 : 0,
      })
    }

    setSelectedPlan(planType)

    if (session) {
      // User is logged in, redirect to dashboard
      router.push(ROUTES.projects.management.landing)
    } else {
      // User needs to sign in
      signIn("angorasixspring")
    }
  }

  const freeFeatures = [
    t("plans.free.features.basic"),
    t("plans.free.features.contributors"),
    t("plans.free.features.tasks"),
    t("plans.free.features.notifications"),
    t("plans.free.features.support"),
  ]

  const plusFeatures = [
    t("plans.plus.features.all"),
    t("plans.plus.features.unlimited"),
    t("plans.plus.features.ai"),
    t("plans.plus.features.ownership"),
    t("plans.plus.features.integrations"),
    t("plans.plus.features.workflows"),
    t("plans.plus.features.support"),
    t("plans.plus.features.beta"),
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
      </Head>
      <Box className="pricing-page" sx={{ pt: 10, pb: 8 }}>
        {/* Countdown Banner */}
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <CountdownTimer
            targetDate={launchDate.toISOString()}
            variant="banner"
            onComplete={() => {
              if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
                window.gtag("event", "countdown_completed", {
                  event_category: "engagement",
                  event_label: "pricing_page",
                })
              }
            }}
          />
        </Container>

        <Container maxWidth="lg">
          {/* Header */}
          <Box className="pricing-header" sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" className="pricing-title" sx={{ mb: 3 }}>
              {t("header.title")}
            </Typography>
            <Typography variant="h6" className="pricing-subtitle" sx={{ mb: 4, color: "text.secondary" }}>
              {t("header.subtitle")}
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} justifyContent="center">
            {/* Free Plan */}
            <Grid item xs={12} md={6} lg={5}>
              <Card
                className="pricing-card pricing-card-free"
                sx={{
                  height: "100%",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: "2px solid #1B5993",
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 32px rgba(27, 89, 147, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <RocketLaunch sx={{ fontSize: 48, color: "#1B5993", mb: 2 }} />
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                      {t("plans.free.title")}
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 1, color: "#1B5993" }}>
                      {t("plans.free.price")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("plans.free.period")}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <List dense>
                    {freeFeatures.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Check sx={{ fontSize: 20, color: "#1B5993" }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => handlePlanSelect("free")}
                    sx={{
                      py: 1.5,
                      borderColor: "#1B5993",
                      color: "#1B5993",
                      "&:hover": {
                        backgroundColor: "#1B5993",
                        color: "white",
                      },
                    }}
                  >
                    {t("plans.free.cta")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Plus Plan */}
            <Grid item xs={12} md={6} lg={5}>
              <Card
                className="pricing-card pricing-card-plus"
                sx={{
                  height: "100%",
                  border: "2px solid #FE5F55",
                  position: "relative",
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 32px rgba(254, 95, 85, 0.2)",
                  "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow: "0 12px 40px rgba(254, 95, 85, 0.3)",
                  },
                }}
              >
                {/* Popular Badge */}
                <Chip
                  label={t("plans.plus.badge")}
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#FE5F55",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />

                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <AutoAwesome sx={{ fontSize: 48, color: "#FE5F55", mb: 2 }} />
                    <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                      {t("plans.plus.title")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          opacity: 0.7,
                        }}
                      >
                        {t("plans.plus.regularPrice")}
                      </Typography>
                      <Typography variant="h3" sx={{ color: "#FE5F55", fontWeight: "bold" }}>
                        {t("plans.plus.earlyBirdPrice")}
                      </Typography>
                    </Box>
                    <Chip
                      label={t("plans.plus.earlyBirdLabel")}
                      size="small"
                      sx={{ backgroundColor: "#FE5F55", color: "white" }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <List dense>
                    {plusFeatures.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Star sx={{ fontSize: 20, color: "#FE5F55" }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handlePlanSelect("plus")}
                    sx={{
                      py: 1.5,
                      backgroundColor: "#FE5F55",
                      "&:hover": {
                        backgroundColor: "#E54A41",
                      },
                    }}
                  >
                    {t("plans.plus.cta")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              {t("faq.title")}
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#1B5993" }}>
                    {t("faq.earlyBird.question")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t("faq.earlyBird.answer")}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#1B5993" }}>
                    {t("faq.changePlan.question")}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t("faq.changePlan.answer")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default PricingComponent
