'use client'

import Campaign from '@mui/icons-material/Campaign'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ROUTES } from '../../../constants/constants'
import { trackLoginClick } from '../../../utils/analytics'

const AuthSignin = ({ forProfile }) => {
  const { t } = useTranslation('auth.signin')
  const router = useRouter()
  const { locale } = router
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      trackLoginClick(forProfile)
      await signIn('angorasixspring', {
        callbackUrl: `${locale === 'es' ? '/es' : ''}${ROUTES.management.new}`,
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t('page.title')}</title>
        <meta name="description" content={t('page.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box className="auth-signin-container">
        {/* Flowing Lines Background - Copied from WelcomeLanding */}
        <Box className="welcome-background">
          <div className="flowing-lines">
            <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <path d="M0,400 Q300,200 600,400 T1200,400" />
              <path d="M0,300 Q400,100 800,300 T1200,300" />
              <path d="M0,500 Q200,300 400,500 T1200,500" />
            </svg>
          </div>
        </Box>

        <Container maxWidth="md" className="auth-signin-content">
          {' '}
          {/* Changed maxWidth to md */}
          {/* Header Section */}
          <Box className="auth-signin-header">
            <Box className="auth-signin-logo">
              <Image
                src="/logos/a6-white-500.png"
                alt="AngoraSix"
                width={80}
                height={80}
                priority
              />{' '}
              {/* Changed to white logo */}
            </Box>
            <Typography variant="h3" className="auth-signin-title">
              {t('welcome.title')}
            </Typography>
          </Box>
          <Box className="auth-signin-main">
            {/* Login Card */}
            <Card className="auth-signin-card" elevation={3}>
              <CardContent className="auth-signin-card-content">
                <Typography variant="h6" className="auth-signin-card-title">
                  {t('login.title')}
                </Typography>
                <Typography
                  variant="body2"
                  className="auth-signin-card-description"
                >
                  {t('login.description')}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="auth-signin-google-button"
                  startIcon={
                    <Box className="google-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </Box>
                  }
                >
                  {isLoading ? t('login.signing_in') : t('login.google_button')}
                </Button>

                <Box className="auth-signin-divider">
                  <Divider>
                    <Typography variant="body2" color="text.secondary">
                      {t('login.or')}
                    </Typography>
                  </Divider>
                </Box>

                <Typography variant="body2" className="auth-signin-help">
                  {t('login.help_text')}{' '}
                  <Link
                    href="mailto:team@angorasix.com"
                    color="primary"
                    underline="hover"
                    variant="body2"
                    sx={{ fontWeight: 'medium' }}
                  >
                    team@angorasix.com
                  </Link>
                </Typography>
              </CardContent>
            </Card>

            {/* Beta Program Promotion */}
            <Card className="auth-signin-beta-card" elevation={2}>
              <CardContent className="auth-signin-beta-content">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  className="auth-signin-beta-header"
                >
                  <Campaign className="celebration-icon" />
                  <Typography variant="h6" className="auth-signin-beta-title">
                    {t('beta.title')}
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  className="auth-signin-beta-description"
                >
                  {t('beta.description')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Footer */}
          <Box className="auth-signin-footer">
            <Typography variant="body2" color="primary.contrastText">
              {t('footer.text')}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default AuthSignin
