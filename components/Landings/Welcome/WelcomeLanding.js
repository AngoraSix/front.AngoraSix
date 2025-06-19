"use client"

import { useState, useEffect, useRef } from "react"
import { Typography, Box, Button, Menu, MenuItem } from "@mui/material"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import {
  BusinessCenterOutlined,
  LightbulbOutlined,
  PersonOutlined,
  GroupsOutlined,
  Language as LanguageIcon,
  KeyboardArrowDown,
} from "@mui/icons-material"

const WelcomeLanding = () => {
  const { t } = useTranslation("welcome")
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [languageAnchor, setLanguageAnchor] = useState(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% visible
      rootMargin: "0px 0px -100px 0px", // Trigger slightly before fully visible
    }

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          // Trigger cards animation after title
          setTimeout(() => setCardsVisible(true), 300)
        }
      })
    }, observerOptions)

    if (titleRef.current) {
      titleObserver.observe(titleRef.current)
    }

    return () => {
      if (titleRef.current) {
        titleObserver.unobserve(titleRef.current)
      }
    }
  }, [])

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

  const scrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight * 1, // Scroll to 100vh where second section starts
      behavior: "smooth",
    })
  }

  const pathOptions = [
    {
      id: "manager",
      title: t("paths.manager.title"),
      description: t("paths.manager.description"),
      icon: BusinessCenterOutlined,
      path: "/welcome/manager",
      color: "primary",
    },
    {
      id: "team",
      title: t("paths.team.title"),
      description: t("paths.team.description"),
      icon: LightbulbOutlined,
      path: "/welcome/venture",
      color: "primary",
    },
    {
      id: "contributor",
      title: t("paths.contributor.title"),
      description: t("paths.contributor.description"),
      icon: PersonOutlined,
      path: "/welcome/contributor",
      color: "secondary",
    },
    {
      id: "cooperative",
      title: t("paths.cooperative.title"),
      description: t("paths.cooperative.description"),
      icon: GroupsOutlined,
      path: "/welcome/cooperative",
      color: "secondary",
    },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  return (
    <Box className="welcome-landing">
      {/* Language Switcher */}
      <Box className="welcome-header">
        <Button
          className="language-switcher"
          startIcon={<LanguageIcon />}
          onClick={(event) => setLanguageAnchor(event.currentTarget)}
        >
          {router.locale}
        </Button>
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={() => setLanguageAnchor(null)}
          PaperProps={{
            style: {
              background: "linear-gradient(135deg, #0a2239 0%, #1b5993 100%)",
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

      {/* FIRST SECTION - Hero with Logo (80vh) */}
      <Box className="welcome-hero-section">
        {/* A6 Logo with Eclipse Effect */}
        <Box className="a6-logo-container">
          <div className="a6-logo-eclipse">
            <img src="/logos/a6-white-500.png" alt="AngoraSix Logo" />
          </div>
        </Box>

        {/* Welcome Message */}
        <Box className="welcome-hero-message">
          <Typography variant="h2" className="welcome-title">
            {t("welcome.title")}
          </Typography>
          <Typography variant="h5" className="welcome-subtitle">
            {t("welcome.subtitle")}
          </Typography>
        </Box>

        {/* Scroll Down Indicator */}
        <Box className="scroll-indicator" onClick={scrollToSection}>
          <Button className="scroll-button" startIcon={<KeyboardArrowDown />}>
            {t("welcome.exploreOptions")}
          </Button>
          <Box className="scroll-arrow">
            <KeyboardArrowDown />
          </Box>
        </Box>
      </Box>

      {/* SECOND SECTION - Path Selection (100vh) */}
      <Box className="welcome-paths-section">
        <Typography ref={titleRef} variant="h3" className={`paths-title ${titleVisible ? "visible" : ""}`}>
          {t("welcome.chooseYourPath")}
        </Typography>

        {/* Path Selection Cards */}
        <Box ref={cardsRef} className={`path-selection ${cardsVisible ? "visible" : ""}`}>
          {pathOptions.map((option, index) => {
            const IconComponent = option.icon
            return (
              <Box
                key={option.id}
                className={`path-card ${hoveredCard === option.id ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handlePathSelect(option.path)}
                style={{
                  transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms",
                }}
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
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default WelcomeLanding
