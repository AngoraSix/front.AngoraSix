"use client"

import { useTranslation } from "next-i18next"
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import { trackEvent } from "../../utils/analytics"

const ContributorPostRegistration = () => {
  const { t } = useTranslation("welcome.contributor.post-registration")
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    joinBeta: false,
    acceptTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email.trim() || !formData.acceptTerms) return

    setIsSubmitting(true)
    try {
      trackEvent("contributor_waitlist_submitted", {
        event_category: "conversion",
        event_label: "contributor_post_registration",
        email: formData.email,
        joinBeta: formData.joinBeta,
      })

      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToLanding = () => {
    router.push("/welcome/contributor")
  }

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 700,
                mb: 3,
              }}
            >
              {t("success.title")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {t("success.message")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 6, opacity: 0.8 }}>
              {t("success.next_steps")}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBackToLanding}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                },
              }}
            >
              {t("success.back_button")}
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f9fa 0%, #dce7ea 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(10, 34, 57, 0.15)",
            border: "1px solid #DCE7EA",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
              color: "white",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {t("form.title")}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {t("form.subtitle")}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t("form.fields.firstName")}
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t("form.fields.lastName")}
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    label={t("form.fields.email")}
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.joinBeta}
                        onChange={handleInputChange("joinBeta")}
                        sx={{
                          color: "#1B5993",
                          "&.Mui-checked": {
                            color: "#FE5F55",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#7D99BA" }}>
                        {t("form.fields.joinBeta")}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        checked={formData.acceptTerms}
                        onChange={handleInputChange("acceptTerms")}
                        sx={{
                          color: "#1B5993",
                          "&.Mui-checked": {
                            color: "#FE5F55",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#7D99BA" }}>
                        {t("form.fields.acceptTerms")}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || !formData.email.trim() || !formData.acceptTerms}
                    sx={{
                      bgcolor: "#FE5F55",
                      color: "white",
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "10px",
                      "&:hover": {
                        bgcolor: "#e54e45",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        bgcolor: "#AFC1D6",
                        color: "#7D99BA",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                variant="text"
                onClick={handleBackToLanding}
                sx={{
                  color: "#7D99BA",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#1B5993",
                  },
                }}
              >
                {t("form.back_to_landing")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default ContributorPostRegistration
