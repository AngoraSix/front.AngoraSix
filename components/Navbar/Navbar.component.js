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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;
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
        <Container className='Navbar__Container__Internal' maxWidth="xl">
          <Toolbar className='Navbar__Toolbar'>
            {/* MENU */}
            <Box className="Navbar__Element Navbar__Menu">
              {isMobile ? (<><IconButton
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
                >
                  <MenuItem
                    key="managements"
                    onClick={() =>
                      router.push(ROUTES.projects.management.landing)
                    }
                  >
                    <Typography
                      textAlign="center"
                      onClick={handleCloseNavMenu}
                    >
                      {t('navbar.menu.projects')}
                    </Typography>
                  </MenuItem>
                </Menu></>) : (<Link href={ROUTES.projects.management.landing}>
                  <Button
                    className="Navbar__Menu__Item"
                    variant="text"
                    sx={{ color: 'primary.contrastText' }}
                    onClick={handleCloseNavMenu}
                  >
                    {t('navbar.menu.projects')}
                  </Button>
                </Link>)}
            </Box>
            {/* LOGO */}
            {isMobile ? (<Box
              className="Navbar__Element Navbar__Logo"
            >
              <Link
                href="/"
              >
                <Box
                  className="Navbar__Logo__Container"
                >
                  <Image
                    className="Navbar__Logo"
                    src={config.site.head.image.logo}
                    alt="Cooperativemos!"
                    title="Cooperativemos!"
                    placeholder="blur"
                    blurDataURL={config.site.head.image.logo}
                    fill
                    sizes="(max-width: 600px) 2.5rem,
                    2.5rem"
                  />
                </Box>
              </Link>
            </Box>) : (<Box
              className="Navbar__Element Navbar__Logo"
            >
              <Link href="/">
                <Box
                  className="Navbar__Logo__Container"
                >
                  <Image
                    className="Navbar__Logo"
                    src={config.site.head.image.logo}
                    alt="Cooperativemos!"
                    title="Cooperativemos!"
                    placeholder="blur"
                    blurDataURL={config.site.head.image.logo}
                    fill
                    sizes="(max-width: 600px) 2.5rem,
                    2.5rem"
                  />
                </Box>
              </Link>
            </Box>)}
            {/* LANGUAGE */}
            <Box className="Navbar__Element Navbar__Language">
              {isMobile ? (<><Tooltip title={t('navbar.language.tooltip')}>
                <IconButton
                  onClick={handleOpenLanguageMenu}
                  size="large"
                  variant="text"
                  sx={{ color: 'primary.contrastText' }}
                >
                  <LanguageIcon />
                </IconButton>
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
                </Menu></>) : (<><Tooltip title={t('navbar.language.tooltip')}>
                  <Button
                    onClick={handleOpenLanguageMenu}
                    sx={{ color: 'primary.contrastText' }}
                    size="large"
                    variant="text"
                    startIcon={<LanguageIcon />}
                  >
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='body1'>
                      {locale.toUpperCase()}
                    </Typography>
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
                  </Menu></>)}
            </Box>
            {/* NOTIFICATIONS */}
            <Box className="Navbar__Element Navbar__Notifications">
              <Notifications />
            </Box>
            {/* PROFILE ICON */}
            {session ? (
              <Box className="Navbar__Element Navbar__Session__Data">
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
            ) : (<Box className="Navbar__Element Navbar__Session__Login">
              {isMobile ? <IconButton
                className="Navbar__Login__Icon"
                onClick={() => signIn('angorasixspring')}
                aria-label="login"
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <LoginIcon />
              </IconButton> : <Button
                onClick={() => signIn('angorasixspring')}
                variant="contained"
                color="secondary"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                }}
                startIcon={<LoginIcon />}
                alt="login"
              >
                {t('navbar.settings.menu.login')}
              </Button>}
            </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Another Toolbar just to fit the fixed position of Navbar */}
      <Toolbar />
    </React.Fragment >
  );
};

Navbar.propTypes = {};

export default Navbar;
