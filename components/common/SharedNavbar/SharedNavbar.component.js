'use client'

import {
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  Login as LoginIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
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
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Cookies from 'js-cookie'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import config from '../../../config'
import { ROUTES } from '../../../constants/constants'
import { trackLandingCTAClick } from '../../../utils/analytics'

const SharedNavbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { data: session } = useSession()

  const { t } = useTranslation('common')
  const router = useRouter()
  const { pathname, asPath, query, locale, locales } = router

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElLanguage, setAnchorElLanguage] = useState(null)
  const [anchorElResources, setAnchorElResources] = useState(null)

  const handleLanguageChange = async (selectedLocale) => {
    if (selectedLocale !== locale) {
      Cookies.set('NEXT_LOCALE', selectedLocale)
      await router.push({ pathname, query }, asPath, {
        locale: selectedLocale,
      })
    }
    setAnchorElLanguage(null)
  }

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
  const handleOpenLanguageMenu = (event) =>
    setAnchorElLanguage(event.currentTarget)
  const handleOpenResourcesMenu = (event) => {
    event.preventDefault()
    setAnchorElResources(event.currentTarget)
  }
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)
  const handleCloseLanguageMenu = () => setAnchorElLanguage(null)
  const handleCloseResourcesMenu = () => setAnchorElResources(null)

  const otherLocales = locales?.filter((l) => l !== locale) || []

  // My Projects moved to user avatar menu
  const getNavigationItems = () => {
    return [
      {
        id: 'resources',
        label: t('navbar.shared.resources.main'),
        submenu: [
          {
            href: '/platform/getting-started',
            label: t('navbar.shared.resources.gettingStarted'),
          },
          {
            href: '/methodology/overview',
            label: t('navbar.shared.resources.methodology'),
          },
          {
            href: '/methodology/guide',
            label: t('navbar.shared.resources.guide'),
          },
        ],
      },
      {
        href: '/services',
        label: t('navbar.shared.services'),
      },
      {
        href: '/pricing',
        label: t('navbar.shared.pricing'),
      },
      {
        href: '/about',
        label: t('navbar.shared.about'),
      },
    ]
  }

  const navigationItems = getNavigationItems()

  const rootHref = ROUTES.home

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(135deg, #030D16 0%, #0F2F4D 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(220, 231, 234, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{ justifyContent: 'space-between', py: 1, minHeight: '70px' }}
        >
          {/* Logo */}
          <Link href={rootHref} style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative', width: 40, height: 40 }}>
                <Image
                  src={
                    config.site.head.image.logoLight ||
                    config.site.head.image.logo ||
                    '/placeholder.svg' ||
                    '/placeholder.svg'
                  }
                  alt="AngoraSix"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              {!isMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '1.4rem',
                      lineHeight: 1.3,
                    }}
                  >
                    AngoraSix
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 300,
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontStyle: 'italic',
                      lineHeight: 0.85,
                    }}
                  >
                    {t('navbar.shared.tagline')}
                  </Typography>
                </Box>
              )}
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Navigation Links */}
              {navigationItems.map((item) =>
                item.submenu ? (
                  <Box key={item.id}>
                    <Button
                      onClick={handleOpenResourcesMenu}
                      endIcon={<ExpandMoreIcon />}
                      sx={{
                        textTransform: 'none',
                        color: '#DCE7EA',
                        fontSize: '1rem',
                        fontWeight: 500,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(254, 95, 85, 0.1)',
                          color: '#FE5F55',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={anchorElResources}
                      open={Boolean(anchorElResources)}
                      onClose={handleCloseResourcesMenu}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      PaperProps={{
                        sx: {
                          background:
                            'linear-gradient(135deg, #0A2239 0%, #0F2F4D 100%)',
                          border: '1px solid rgba(220, 231, 234, 0.2)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)',
                          mt: 1,
                          minWidth: '220px',
                        },
                      }}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          style={{ textDecoration: 'none' }}
                        >
                          <MenuItem
                            onClick={handleCloseResourcesMenu}
                            sx={{
                              color: '#DCE7EA',
                              padding: '12px 20px',
                              '&:hover': {
                                backgroundColor: 'rgba(254, 95, 85, 0.1)',
                                color: '#FE5F55',
                              },
                            }}
                          >
                            {subitem.label}
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Link
                    href={item.href}
                    style={{ textDecoration: 'none' }}
                    key={item.href}
                  >
                    <Button
                      sx={{
                        textTransform: 'none',
                        color: '#DCE7EA',
                        fontSize: '1rem',
                        fontWeight: 500,
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(254, 95, 85, 0.1)',
                          color: '#FE5F55',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              )}

              {/* Language Selector */}
              {locales && locales.length > 1 && (
                <>
                  <Tooltip title={t('navbar.shared.language.tooltip')}>
                    <Button
                      onClick={handleOpenLanguageMenu}
                      startIcon={<LanguageIcon />}
                      sx={{
                        textTransform: 'uppercase',
                        color: '#DCE7EA',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        minWidth: 'auto',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(175, 193, 214, 0.1)',
                          color: '#AFC1D6',
                        },
                      }}
                    >
                      {locale}
                    </Button>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElLanguage}
                    open={Boolean(anchorElLanguage)}
                    onClose={handleCloseLanguageMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        background:
                          'linear-gradient(135deg, #0A2239 0%, #0F2F4D 100%)',
                        border: '1px solid rgba(220, 231, 234, 0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        mt: 1,
                      },
                    }}
                  >
                    {otherLocales.map((l) => (
                      <MenuItem
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        sx={{
                          textTransform: 'uppercase',
                          color: '#DCE7EA',
                          '&:hover': {
                            backgroundColor: 'rgba(254, 95, 85, 0.1)',
                            color: '#FE5F55',
                          },
                        }}
                      >
                        {l}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Authentication */}
              {session ? (
                <>
                  <Tooltip title={t('navbar.shared.settings.tooltip')}>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        border: '2px solid rgba(254, 95, 85, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#FE5F55',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Avatar
                        src={
                          session.user?.imageThumbnail || session.user?.image
                        }
                        alt={session.user?.name}
                        sx={{ width: 36, height: 36 }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        background:
                          'linear-gradient(135deg, #0A2239 0%, #0F2F4D 100%)',
                        border: '1px solid rgba(220, 231, 234, 0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        mt: 1,
                        minWidth: '180px',
                      },
                    }}
                  >
                    <Link
                      href={ROUTES.projects.list}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuItem
                        onClick={handleCloseUserMenu}
                        sx={{
                          color: '#DCE7EA',
                          padding: '12px 20px',
                          '&:hover': {
                            backgroundColor: 'rgba(254, 95, 85, 0.1)',
                            color: '#FE5F55',
                          },
                        }}
                      >
                        {t('navbar.shared.projects')}
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => signOut()}
                      sx={{
                        color: '#DCE7EA',
                        padding: '12px 20px',
                        '&:hover': {
                          backgroundColor: 'rgba(254, 95, 85, 0.1)',
                          color: '#FE5F55',
                        },
                      }}
                    >
                      {t('navbar.shared.settings.logout')}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => {
                    trackLandingCTAClick('navbar_login', 'navbar-login')
                    router.push(ROUTES.auth.signin)
                  }}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    borderColor: '#FE5F55',
                    color: '#FE5F55',
                    fontWeight: 600,
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#FE5F55',
                      color: '#ffffff',
                      borderColor: '#FE5F55',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(254, 95, 85, 0.3)',
                    },
                  }}
                >
                  {t('navbar.shared.login')}
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Language Selector */}
              {locales && locales.length > 1 && (
                <>
                  <IconButton
                    onClick={handleOpenLanguageMenu}
                    sx={{
                      color: '#DCE7EA',
                      '&:hover': {
                        backgroundColor: 'rgba(175, 193, 214, 0.1)',
                        color: '#AFC1D6',
                      },
                    }}
                  >
                    <LanguageIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElLanguage}
                    open={Boolean(anchorElLanguage)}
                    onClose={handleCloseLanguageMenu}
                    PaperProps={{
                      sx: {
                        background:
                          'linear-gradient(135deg, #0A2239 0%, #0F2F4D 100%)',
                        border: '1px solid rgba(220, 231, 234, 0.2)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                      },
                    }}
                  >
                    {otherLocales.map((l) => (
                      <MenuItem
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        sx={{
                          textTransform: 'uppercase',
                          color: '#DCE7EA',
                          '&:hover': {
                            backgroundColor: 'rgba(254, 95, 85, 0.1)',
                            color: '#FE5F55',
                          },
                        }}
                      >
                        {l}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {/* Menu Button */}
              <IconButton
                onClick={handleOpenNavMenu}
                sx={{
                  color: '#DCE7EA',
                  '&:hover': {
                    backgroundColor: 'rgba(254, 95, 85, 0.1)',
                    color: '#FE5F55',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    background:
                      'linear-gradient(135deg, #0A2239 0%, #0F2F4D 100%)',
                    border: '1px solid rgba(220, 231, 234, 0.2)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    mt: 1,
                    minWidth: '220px',
                  },
                }}
              >
                {/* Resources Group */}
                {navigationItems.map((item) =>
                  item.submenu ? (
                    <Box key={item.id}>
                      <MenuItem
                        sx={{
                          color: '#AFC1D6',
                          fontWeight: 600,
                          pointerEvents: 'none',
                          fontSize: '0.85rem',
                          paddingTop: '12px',
                          paddingBottom: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {item.label}
                      </MenuItem>
                      {item.submenu.map((subitem) => (
                        <Link
                          href={subitem.href}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                          key={subitem.href}
                        >
                          <MenuItem
                            onClick={handleCloseNavMenu}
                            sx={{
                              color: '#DCE7EA',
                              paddingLeft: '24px',
                              '&:hover': {
                                backgroundColor: 'rgba(254, 95, 85, 0.1)',
                                color: '#FE5F55',
                              },
                            }}
                          >
                            {subitem.label}
                          </MenuItem>
                        </Link>
                      ))}
                    </Box>
                  ) : (
                    <Link
                      href={item.href}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      key={item.href}
                    >
                      <MenuItem
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: '#DCE7EA',
                          '&:hover': {
                            backgroundColor: 'rgba(254, 95, 85, 0.1)',
                            color: '#FE5F55',
                          },
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </Link>
                  )
                )}

                {/* Profile Group - only shown when logged in */}
                {session ? (
                  <Box>
                    <MenuItem
                      sx={{
                        color: '#AFC1D6',
                        fontWeight: 600,
                        pointerEvents: 'none',
                        fontSize: '0.85rem',
                        paddingTop: '16px',
                        paddingBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderTop: '1px solid rgba(220, 231, 234, 0.1)',
                        marginTop: '8px',
                      }}
                    >
                      {t('navbar.shared.profile')}
                    </MenuItem>
                    <Link
                      href={ROUTES.projects.list}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <MenuItem
                        onClick={handleCloseNavMenu}
                        sx={{
                          color: '#DCE7EA',
                          paddingLeft: '24px',
                          '&:hover': {
                            backgroundColor: 'rgba(254, 95, 85, 0.1)',
                            color: '#FE5F55',
                          },
                        }}
                      >
                        {t('navbar.shared.projects')}
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={() => {
                        handleCloseNavMenu()
                        signOut()
                      }}
                      sx={{
                        color: '#DCE7EA',
                        paddingLeft: '24px',
                        '&:hover': {
                          backgroundColor: 'rgba(254, 95, 85, 0.1)',
                          color: '#FE5F55',
                        },
                      }}
                    >
                      {t('navbar.shared.settings.logout')}
                    </MenuItem>
                  </Box>
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu()
                      trackLandingCTAClick('navbar_login', 'navbar-login')
                      router.push(ROUTES.auth.signin)
                    }}
                    sx={{
                      color: '#FE5F55',
                      fontWeight: 600,
                      marginTop: '8px',
                      borderTop: '1px solid rgba(220, 231, 234, 0.1)',
                      paddingTop: '16px',
                      '&:hover': {
                        backgroundColor: 'rgba(254, 95, 85, 0.1)',
                      },
                    }}
                  >
                    {t('navbar.shared.login')}
                  </MenuItem>
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
