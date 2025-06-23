"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { Box, Typography, Button, Paper, Link, Slide } from "@mui/material"
import { styled } from "@mui/material/styles"

const CookieConsentContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  boxShadow: theme.shadows[8],
}))

const CookieConsent = () => {
  const { t } = useTranslation("common.legal")
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <Slide direction="up" in={showConsent} mountOnEnter unmountOnExit>
      <CookieConsentContainer elevation={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {t("cookies.message")}{" "}
              <Link href="/legal/privacy-policy" color="primary" underline="hover">
                {t("cookies.learnMore")}
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleDecline}>
              {t("cookies.decline")}
            </Button>
            <Button variant="contained" size="small" onClick={handleAccept}>
              {t("cookies.accept")}
            </Button>
          </Box>
        </Box>
      </CookieConsentContainer>
    </Slide>
  )
}

export default CookieConsent
