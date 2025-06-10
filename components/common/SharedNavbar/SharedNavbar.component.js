"use client"

import { Language as LanguageIcon, Login as LoginIcon, Menu as MenuIcon } from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Cookies from "js-cookie"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"

const SharedNavbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { data: session } = useSession()
  const { t } = useTranslation("common")
  const router = useRouter()
  const { pathname, asPath, query, locale, locales } = router

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElLanguage, setAnchorElLanguage] = useState(null)

  const handleLanguageChange = async (selectedLocale) => {
    if (selectedLocale !== locale) {
      Cookies.set("NEXT_LOCALE", selectedLocale)
      await router.push({ pathname, query }, asPath, {
        locale: selectedLocale,
      })
    }
    setAnchorElLanguage(null)
  }

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
  const handleOpenLanguageMenu = (event) => setAnchorElLanguage(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)
  const handleCloseLanguageMenu = () => setAnchorElLanguage(null)

  const otherLocales = locales?.filter((l) => l !== locale) || []

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.1)",
        color: "#1B5993",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ position: "relative", width: 40, height: 40 }}>
                <Image
                  src={config.site.head.image.logoDark || "/placeholder.svg"}
                  alt="AngoraSix"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              {!isMobile && (
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                  color="primary"
                >
                  AngoraSix
                </Typography>
              )}
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {/* Navigation Links */}
              <Link href="/welcome/visionaries" style={{ textDecoration: "none" }}>
                <Button color="primary" sx={{ textTransform: "none" }}>
                  {t("navbar.shared.home")}
                </Button>
              </Link>
              <Link href="/pricing" style={{ textDecoration: "none" }}>
                <Button color="primary" sx={{ textTransform: "none" }}>
                  {t("navbar.shared.pricing")}
                </Button>
              </Link>
              <Link href="/about" style={{ textDecoration: "none" }}>
                <Button color="primary" sx={{ textTransform: "none" }}>
                  {t("navbar.shared.about")}
                </Button>
              </Link>

              {/* Language Selector */}
              {locales && locales.length > 1 && (
                <>
                  <Tooltip title={t("navbar.language.tooltip")}>
                    <Button
                      onClick={handleOpenLanguageMenu}
                      startIcon={<LanguageIcon />}
                      sx={{ textTransform: "uppercase" }}
                      color="primary"
                    >
                      {locale}
                    </Button>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElLanguage}
                    open={Boolean(anchorElLanguage)}
                    onClose={handleCloseLanguageMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {otherLocales.map((l) => (
                      <MenuItem key={l} onClick={() => handleLanguageChange(l)} sx={{ textTransform: "uppercase" }}>
                        {l}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Authentication */}
              {session ? (
                <>
                  <Tooltip title={t("navbar.settings.tooltip")}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        src={session.user?.imageThumbnail || session.user?.image}
                        alt={session.user?.name}
                        sx={{ width: 36, height: 36 }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <Link
                      href={ROUTES.projects.management.landing}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>{t("navbar.menu.projects")}</MenuItem>
                    </Link>
                    <MenuItem onClick={() => signOut()}>{t("navbar.settings.menu.logout")}</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => signIn("angorasixspring")}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderColor: "#1B5993",
                    color: "#1B5993",
                    "&:hover": {
                      backgroundColor: "#1B5993",
                      color: "white",
                    },
                  }}
                >
                  {t("navbar.shared.login")}
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Language Selector */}
              {locales && locales.length > 1 && (
                <>
                  <IconButton onClick={handleOpenLanguageMenu} sx={{ color: "#1B5993" }}>
                    <LanguageIcon />
                  </IconButton>
                  <Menu anchorEl={anchorElLanguage} open={Boolean(anchorElLanguage)} onClose={handleCloseLanguageMenu}>
                    {otherLocales.map((l) => (
                      <MenuItem key={l} onClick={() => handleLanguageChange(l)} sx={{ textTransform: "uppercase" }}>
                        {l}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Menu Button */}
              <IconButton onClick={handleOpenNavMenu} sx={{ color: "#1B5993" }}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Link href="/welcome/visionaries" style={{ textDecoration: "none", color: "inherit" }}>
                  <MenuItem onClick={handleCloseNavMenu}>{t("navbar.shared.home")}</MenuItem>
                </Link>
                <Link href="/pricing" style={{ textDecoration: "none", color: "inherit" }}>
                  <MenuItem onClick={handleCloseNavMenu}>{t("navbar.shared.pricing")}</MenuItem>
                </Link>
                <Link href="/about" style={{ textDecoration: "none", color: "inherit" }}>
                  <MenuItem onClick={handleCloseNavMenu}>{t("navbar.shared.about")}</MenuItem>
                </Link>
                {session ? (
                  [
                    <Link
                      key="dashboard"
                      href={ROUTES.projects.management.landing}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <MenuItem onClick={handleCloseNavMenu}>{t("navbar.menu.projects")}</MenuItem>
                    </Link>,
                    <MenuItem key="logout" onClick={() => signOut()}>
                      {t("navbar.settings.menu.logout")}
                    </MenuItem>,
                  ]
                ) : (
                  <MenuItem onClick={() => signIn("angorasixspring")}>{t("navbar.shared.login")}</MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default SharedNavbar
