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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import config from '../../config';
import { ROUTES } from '../../constants/constants';
import { resolveRoute } from '../../utils/api/apiHelper';
import Notifications from './Notifications';

const Navbar = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;
  const loading = status === 'loading';
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const handleChange = async (selectedLocale) => {
    if (selectedLocale != locale) {
      Cookies.set('NEXT_LOCALE', selectedLocale);
      await router.push({ pathname, query }, asPath, {
        locale: selectedLocale,
      });
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
            <Box
              className="Navbar__Logo__Container"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Image
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
                placeholder="blur"
                blurDataURL={config.site.head.image.logo}
                sx={{ priority: { xs: false, md: true } }}
                fill
                sizes="(max-width: 768px) 2.5em,
                  (max-width: 1200px) 2.5em,
                  2.5em"
              />
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
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
              </Menu>
            </Box>
            <Box
              className="Navbar__Logo__Container"
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <Image
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
                placeholder="blur"
                blurDataURL={config.site.head.image.logo}
                sx={{ priority: { xs: true, md: false } }}
                fill
                object-fit="contain"
                sizes="(max-width: 768px) 2.5em,
                  (max-width: 1200px) 2.5em,
                  2.5em"
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>
            {/* LANGUAGE */}
            <Box className="Navbar__Language" sx={{ flexGrow: 0 }}>
              <Tooltip title={t('navbar.language.tooltip')}>
                <Button
                  onClick={handleOpenLanguageMenu}
                  sx={{ p: 0, color: 'primary.contrastText' }}
                  size="large"
                  variant="text"
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
                  <MenuItem
                    key={l}
                    value={l}
                    onClick={async () => await handleChange(l)}
                  >
                    {l.toUpperCase()}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* NOTIFICATIONS */}
            <Notifications />
            {/* PROFILE ICON */}
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
                      src={session.user?.imageThumbnail || session.user?.image}
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
                  onClick={() => signIn('angorasixspring')}
                  variant="contained"
                  sx={{
                    backgroundColor: 'primary.dark',
                    display: { xs: 'none', sm: 'flex' },
                  }}
                  startIcon={<LoginIcon />}
                  alt="login"
                >
                  {t('navbar.settings.menu.login')}
                </Button>
                <IconButton
                  className="Navbar__Login__Icon"
                  onClick={() => signIn('angorasixspring')}
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
