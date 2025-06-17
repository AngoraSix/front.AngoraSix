"use client"

import { useState } from "react"
import { Container, Typography, Box, IconButton, Menu, MenuItem, Fade } from "@mui/material"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import {
  LightbulbOutlined,
  GroupsOutlined,
  FavoriteOutlined,
  AttachMoneyOutlined,
  PeopleOutlined,
  LanguageOutlined,
} from "@mui/icons-material"

const WelcomeLanding = () => {
  const { t } = useTranslation("welcome")
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [languageAnchor, setLanguageAnchor] = useState(null)

  const handlePathSelect = (path) => {
    // Smooth transition before navigation
    setTimeout(() => {
      router.push(path)
    }, 300)
  }

  const handleLanguageChange = (locale) => {
    router.push(router.asPath, router.asPath, { locale })
    setLanguageAnchor(null)
  }

  const pathOptions = [
    {
      id: "visionary",
      title: t("paths.visionary.title"),
      description: t("paths.visionary.description"),
      icon: LightbulbOutlined,
      path: "/welcome/team",
      color: "primary",
    },
    {
      id: "cooperative",
      title: t("paths.cooperative.title"),
      description: t("paths.cooperative.description"),
      icon: GroupsOutlined,
      path: "/welcome/cooperative",
      color: "secondary",
    },
    {
      id: "enthusiast",
      title: t("paths.enthusiast.title"),
      description: t("paths.enthusiast.description"),
      icon: FavoriteOutlined,
      path: "/welcome/enthusiast",
      color: "primary",
    },
  ]

  const quickActions = [
    {
      id: "language",
      label: t("quickActions.language"),
      icon: LanguageOutlined,
      action: (event) => setLanguageAnchor(event.currentTarget),
    },
    {
      id: "pricing",
      label: t("quickActions.pricing"),
      icon: AttachMoneyOutlined,
      action: () => router.push("/pricing"),
    },
    {
      id: "about",
      label: t("quickActions.about"),
      icon: PeopleOutlined,
      action: () => router.push("/about"),
    },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  return (
    <Box className="welcome-landing">
      {/* Animated Background with Traveling Lines */}
      {/* Breathing Effect Background */}
      <Box className="welcome-background">
        <div className="breathing-container">
          <div className="breathing-layer breathing-layer-1"></div>
          <div className="breathing-layer breathing-layer-2"></div>
          <div className="breathing-layer breathing-layer-3"></div>
        </div>
      </Box>

      <Container maxWidth="lg" className="welcome-container">
        {/* Header with Quick Actions */}
        <Box className="welcome-header">
          <Box className="quick-actions">
            {quickActions.map((action) => (
              <IconButton key={action.id} className="quick-action-btn" onClick={action.action} title={action.label}>
                <action.icon />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box className="welcome-content">
          {/* Welcome Message */}
          <Box className="welcome-message">
            <Typography variant="h2" className="welcome-title">
              {t("welcome.title")}
            </Typography>
            <Typography variant="h5" className="welcome-subtitle">
              {t("welcome.subtitle")}
            </Typography>
          </Box>

          {/* Path Selection Cards */}
          <Box className="path-selection">
            {pathOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }} key={option.id}>
                  <Box
                    className={`path-card ${hoveredCard === option.id ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredCard(option.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handlePathSelect(option.path)}
                  >
                    <Box className="path-icon">
                      <IconComponent />
                    </Box>
                    <Typography variant="h6" className="path-title">
                      {option.title}
                    </Typography>
                    <Typography variant="body1" className="path-description">
                      {option.description}
                    </Typography>
                    <Box className="path-arrow">
                      <Typography variant="body2">→</Typography>
                    </Box>
                  </Box>
                </Fade>
              )
            })}
          </Box>

          {/* Subtle CTA */}
          <Box className="welcome-footer">
            <Typography variant="body2" className="footer-text">
              {t("welcome.footer")}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Language Menu */}
      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={() => setLanguageAnchor(null)}
        PaperProps={{
          style: {
            background: "#0a2239",
            border: "1px solid rgba(220, 231, 234, 0.2)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={router.locale === lang.code}
            style={{
              color: router.locale === lang.code ? "#fe5f55" : "#dce7ea",
              backgroundColor: router.locale === lang.code ? "rgba(254, 95, 85, 0.1)" : "transparent",
            }}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default WelcomeLanding
