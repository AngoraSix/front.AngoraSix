import LanguageIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import config from '../../config';
import { resolveRoute, ROUTES } from '../../constants';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;
  const loading = status === 'loading';
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);

  const handleChange = (selectedLocale) => {
    if (selectedLocale != locale) {
      Cookies.set('NEXT_LOCALE', selectedLocale);
      router.push({ pathname, query }, asPath, { locale: selectedLocale });
    }
    setAnchorElLanguage(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const otherLocales = locales.filter((l) => l != locale);

  return (
    <React.Fragment>
      <LinearProgress className="Navbar__ProgressBar" color="primary" />

      <AppBar className="Navbar Navbar__Container" position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <img
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem
                  key="projects"
                  onClick={() =>
                    router.push(ROUTES.projects.presentations.list)
                  }
                >
                  <Typography
                    textAlign="center"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    {t('navbar.menu.projects')}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <img
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link href={ROUTES.projects.presentations.list}>
                <Button
                  className="Navbar__Menu__Item"
                  variant="text"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t('navbar.menu.projects')}
                </Button>
              </Link>
            </Box>

            <Box className="Navbar__Language" sx={{ flexGrow: 0 }}>
              <Tooltip title={t('navbar.language.tooltip')}>
                <Button
                  onClick={handleOpenLanguageMenu}
                  sx={{ p: 0 }}
                  size="large"
                  variant="text"
                  sx={{
                    color: 'primary.contrastText',
                  }}
                  startIcon={<LanguageIcon />}
                >
                  {locale.toUpperCase()}
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-lang"
                anchorEl={anchorElLanguage}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguageMenu}
              >
                {otherLocales.map((l) => (
                  <MenuItem key={l} value={l} onClick={() => handleChange(l)}>
                    {l.toUpperCase()}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {session ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={t('navbar.settings.tooltip')}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    size="large"
                  >
                    <Avatar
                      alt={t('navbar.settings.avatar.alt')}
                      src={session.user?.image}
                      sx={{ width: 50, height: 50 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link
                    href={resolveRoute(ROUTES.profile.view, session.user?.id)}
                  >
                    <MenuItem key="profile">
                      <Typography textAlign="center">
                        {t('navbar.settings.menu.profile')}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem key="logout" onClick={() => signOut()}>
                    <Typography textAlign="center">
                      {t('navbar.settings.menu.logout')}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={() => signIn('angorasixkeycloak')}
                  variant="contained"
                  sx={{ backgroundColor: 'primary.dark' }}
                  startIcon={<LoginIcon />}
                  alt="login"
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  {t('navbar.settings.menu.login')}
                </Button>
                <IconButton
                  className="Navbar__Login__Icon"
                  onClick={() => signIn('angorasixkeycloak')}
                  aria-label="login"
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <LoginIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Another Toolbar just to fit the fixed position of Navbar */}
      <Toolbar />
    </React.Fragment>
  );
};

Navbar.propTypes = {};

export default Navbar;
