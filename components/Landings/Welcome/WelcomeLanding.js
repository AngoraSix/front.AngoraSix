"use client"

import {
  AccessibilityNewOutlined,
  BusinessCenterOutlined,
  GroupsOutlined,
  KeyboardArrowDown,
  Language as LanguageIcon,
  LightbulbOutlined,
} from "@mui/icons-material"
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
import { trackExploreOptionsClick } from "../../../utils/analytics"

const WelcomeLanding = () => {
  const { t } = useTranslation("welcome")
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [languageAnchor, setLanguageAnchor] = useState(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  const { data: session } = useSession()

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
    // Track explore options click
    trackExploreOptionsClick()

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
      id: "cooperative",
      title: t("paths.cooperative.title"),
      description: t("paths.cooperative.description"),
      icon: GroupsOutlined,
      path: "/welcome/community-driven",
      color: "secondary",
    },
    {
      id: "contributor",
      title: t("paths.contributor.title"),
      description: t("paths.contributor.description"),
      icon: AccessibilityNewOutlined,
      path: "/welcome/contributor",
      color: "secondary",
    },
  ]

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="welcome-landing">
        {/* Language Switcher */}
        <Box className="welcome-header">
          {/* Access Button - Only show when user is logged in */}
          {session && (
            <Button
              className="access-button"
              onClick={() => router.push(ROUTES.welcome.postRegistration)}
              sx={{
                mr: 2,
                color: "#dce7ea",
                borderColor: "#fe5f55",
                "&:hover": {
                  backgroundColor: "rgba(254, 95, 85, 0.1)",
                  borderColor: "#fe5f55",
                  color: "#fe5f55",
                },
              }}
              variant="outlined"
            >
              {t("welcome.access")}
            </Button>
          )}
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
                background: "linear-gradient(135deg, #030D16 0%, #0a2239 100%)",
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
    </>
  )
}

export default WelcomeLanding
