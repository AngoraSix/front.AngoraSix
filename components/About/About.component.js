'use client'

import {
  AccessibilityNew,
  AutoAwesome,
  Diversity3,
  ForkLeft,
  GitHub,
  Groups,
  Handshake,
  Instagram,
  LinkedIn,
  Link as LinkIcon,
  Psychology,
  Spa,
  YouTube,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fade,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
  Zoom,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import config from '../../config'
import { ROUTES, THIRD_PARTY } from '../../constants/constants'
import { useInView } from '../../hooks/useInViews'
import DiscordLogo from '../../public/logos/thirdparty/discord.svg'
import { trackLandingCTAClick } from '../../utils/analytics'

const AboutComponent = () => {
  const { t } = useTranslation('about')
  const { data: session } = useSession()

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [storyRef, storyInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [valuesRef, valuesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [communityRef, communityInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const router = useRouter()

  const values = [
    {
      icon: <Handshake sx={{ fontSize: 48, color: '#1B5993' }} />,
      title: t('values.transparency.title'),
      description: t('values.transparency.description'),
    },
    {
      icon: <AccessibilityNew sx={{ fontSize: 48, color: '#FE5F55' }} />,
      title: t('values.purpose.title'),
      description: t('values.purpose.description'),
    },
    {
      icon: <Groups sx={{ fontSize: 48, color: '#1B5993' }} />,
      title: t('values.community.title'),
      description: t('values.community.description'),
    },
    {
      icon: <ForkLeft sx={{ fontSize: 48, color: '#FE5F55' }} />,
      title: t('values.evolution.title'),
      description: t('values.evolution.description'),
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: '#1B5993' }} />,
      title: t('values.trust.title'),
      description: t('values.trust.description'),
    },
    {
      icon: <Spa sx={{ fontSize: 48, color: '#FE5F55' }} />,
      title: t('values.simplicity.title'),
      description: t('values.simplicity.description'),
    },
  ]

  const communityMembers = [
    {
      name: t('community.ger.name'),
      role: t('community.ger.role'),
      description: t('community.ger.description'),
      avatar: '/images/members/ger.jpg?height=120&width=120',
      social: {
        personal: 'https://gerroza.com',
        linkedin: 'https://www.linkedin.com/in/rozagerardo/',
        github: 'https://github.com/rozagerardo',
        instagram: 'https://www.instagram.com/gerroza/',
        stackoverflow: 'https://stackoverflow.com/users/6661361/gerardo-roza',
      },
    },
    {
      name: t('community.jor.name'),
      role: t('community.jor.role'),
      description: t('community.jor.description'),
      avatar: '/images/members/jor.jpg?height=120&width=120',
      social: {},
    },
    {
      name: t('community.juli.name'),
      role: t('community.juli.role'),
      description: t('community.juli.description'),
      avatar: '/images/members/juli.jpg?height=120&width=120',
      social: {
        linkedin: 'https://www.linkedin.com/in/julieta-arquitecta/',
        instagram: 'https://www.instagram.com/julieta_arquitecta',
      },
    },
    {
      name: t('community.marcos.name'),
      role: t('community.marcos.role'),
      description: t('community.marcos.description'),
      avatar: '/images/members/marcos.jpg?height=120&width=120',
      social: {
        linkedin: 'https://www.linkedin.com/in/marcos-raimondi/',
        github: 'https://github.com/marcosraimondi1',
      },
    },
    {
      name: t('community.tomi.name'),
      role: t('community.tomi.role'),
      description: t('community.tomi.description'),
      avatar: '/images/members/tomi.jpg?height=120&width=120',
      social: {
        linkedin: 'https://www.linkedin.com/in/tomasales/',
      },
    },
  ]

  return (
    <>
      <Head>
        <title>{t('page.title')}</title>
        <meta name="description" content={t('page.description')} />

        <meta property="og:title" key="og.title" content={t('page.title')} />
        <meta
          property="og:description"
          key="og.description"
          content={t('page.description')}
        />
        <meta
          property="og:image"
          key="og.image"
          content={config.site.head.image.logoSquare}
        />
        <meta
          property="og:url"
          key="og.url"
          content="https://angorasix.com/about"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="about-page">
        {/* Hero Section */}
        <Box ref={heroRef} className="about-hero">
          <Container maxWidth="lg">
            <Fade in={heroInView} timeout={1000}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" className="about-title">
                  {t('hero.title')}
                </Typography>
                <Typography variant="h6" className="about-subtitle">
                  {t('hero.subtitle')}
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Story Section */}
        <Box ref={storyRef} className="about-story">
          <Container maxWidth="lg">
            <Fade in={storyInView} timeout={1000}>
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative', height: 400 }}>
                    <Image
                      src="/images/road-to-vas.jpg?height=400&width=600"
                      alt={t('story.imageAlt')}
                      layout="fill"
                      objectFit="cover"
                      style={{
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    sx={{ mb: 3, color: '#1B5993', fontWeight: 'bold' }}
                  >
                    {t('story.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
                  >
                    {t('story.paragraph1')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
                  >
                    {t('story.paragraph2')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}
                  >
                    {t('story.paragraph3')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#0A2239',
                      backgroundColor: '#DCE7EA',
                      p: 2,
                      borderRadius: '8px',
                      fontWeight: 'medium',
                      fontSize: '1.1rem',
                    }}
                  >
                    💡 {t('story.birth')}
                  </Typography>
                </Grid>
              </Grid>
            </Fade>
          </Container>
        </Box>

        {/* Vision & Mission Section */}
        <Box className="about-vision-mission">
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <AutoAwesome sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    {t('vision.title')}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1.6, opacity: 0.95 }}
                  >
                    {t('vision.content')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Psychology sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    {t('mission.title')}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1.6, opacity: 0.95 }}
                  >
                    {t('mission.content')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box ref={valuesRef} className="about-values">
          <Container maxWidth="lg">
            <Fade in={valuesInView} timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                  {t('values.title')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
                >
                  {t('values.subtitle')}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Zoom in={valuesInView} timeout={1000 + index * 200}>
                    <Card className="value-card">
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 3,
                          }}
                        >
                          <Box
                            className="value-icon-wrapper"
                            sx={{ flexShrink: 0 }}
                          >
                            {value.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{ mb: 2, fontWeight: 'bold' }}
                            >
                              {value.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                            >
                              {value.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Community Section */}
        <Box ref={communityRef} className="about-community">
          <Container maxWidth="lg">
            <Fade in={communityInView} timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Diversity3 sx={{ fontSize: 64, color: '#1B5993', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                  {t('community.title')}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 800,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {t('community.subtitle')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#1B5993',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                  }}
                >
                  {t('community.philosophy')}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={2} justifyContent="center">
              {communityMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <Zoom in={communityInView} timeout={1200 + index * 200}>
                    <Card className="member-card">
                      <CardContent className="member-card-content">
                        <Box className="member-avatar-wrapper">
                          <Avatar
                            src={member.avatar}
                            className="member-avatar"
                            sx={{
                              width: 80,
                              height: 80,
                              mx: 'auto',
                              mb: 2,
                              border: '3px solid #FE5F55',
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{ mb: 1, fontWeight: 'bold', fontSize: '1rem' }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          className="member-card-role"
                          variant="subtitle2"
                          sx={{
                            mb: 2,
                            color: '#1B5993',
                            fontWeight: 'medium',
                            minHeight: '2.5rem',
                          }}
                        >
                          {member.role}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.5,
                            mb: 2,
                          }}
                        >
                          {member.description}
                        </Typography>
                        {member.social && (
                          <Box className="member-social-links">
                            {member.social.linkedin && (
                              <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="social-link"
                              >
                                <LinkedIn />
                              </a>
                            )}
                            {member.social.github && (
                              <a
                                href={member.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="social-link"
                              >
                                <GitHub />
                              </a>
                            )}
                            {member.social.instagram && (
                              <a
                                href={member.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="social-link"
                              >
                                <Instagram />
                              </a>
                            )}
                            {member.social.stackoverflow && (
                              <a
                                href={member.social.stackoverflow}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Stackoverflow"
                                className="social-link"
                              >
                                <SvgIcon
                                  sx={{ fontSize: 22 }}
                                  component={THIRD_PARTY.stackoverflow.logo}
                                  viewBox="0 0 24 24"
                                />
                              </a>
                            )}
                            {member.social.personal && (
                              <a
                                href={member.social.personal}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Personal Website"
                                className="social-link"
                              >
                                <LinkIcon />
                              </a>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Follow Us Section */}
        <Box className="about-follow-us">
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                className="about-follow-us-title"
                variant="h6"
                sx={{ fontWeight: 'bold', color: '#0A2239' }}
              >
                {t('followUs.title')}
              </Typography>
              <Box className="follow-social-links">
                <IconButton
                  href="https://linkedin.com/company/angorasix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="follow-icon-button"
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://instagram.com/angorasix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="follow-icon-button"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="https://github.com/angorasix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="follow-icon-button"
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  href="https://www.youtube.com/@angorasix"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="follow-icon-button"
                >
                  <YouTube />
                </IconButton>
                <IconButton
                  href="https://discord.gg/qc55JVMPB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="follow-icon-button"
                >
                  <SvgIcon
                    className="follow-logo"
                    sx={{ fontSize: 22 }}
                    component={DiscordLogo}
                    viewBox="0 0 24 24"
                  />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Final CTA Section */}
        <Box className="about-final-cta">
          <Container maxWidth="md">
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" className="final-cta-quote">
                  {t('finalCta.quote')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  className="final-cta-button"
                  onClick={() => {
                    trackLandingCTAClick('about_page', 'Join AngoraSix')
                    if (session) {
                      router.push(ROUTES.management.new)
                    } else {
                      router.push(ROUTES.auth.signin)
                    }
                  }}
                >
                  {t('finalCta.button')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default AboutComponent
