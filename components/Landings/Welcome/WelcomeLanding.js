"use client"

import { useState } from "react"
import { Container, Typography, Box, Fade } from "@mui/material"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { LightbulbOutlined, GroupsOutlined, FavoriteOutlined } from "@mui/icons-material"

const WelcomeLanding = () => {
  const { t } = useTranslation("welcome")
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState(null)

  const handlePathSelect = (path) => {
    // Smooth transition before navigation
    setTimeout(() => {
      router.push(path)
    }, 300)
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

  return (
    <Box className="welcome-landing">
      {/* Flowing Lines Background - Same as TeamLanding */}
      <Box className="welcome-background">
        <div className="flowing-lines">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <path d="M0,400 Q300,200 600,400 T1200,400" />
            <path d="M0,300 Q400,100 800,300 T1200,300" />
            <path d="M0,500 Q200,300 400,500 T1200,500" />
          </svg>
        </div>
      </Box>

      <Container maxWidth="lg" className="welcome-container">
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
    </Box>
  )
}

export default WelcomeLanding
