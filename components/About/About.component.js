"use client"

import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Fade, Zoom } from "@mui/material"
import { Psychology, Groups, AccountBalance, Handshake, AutoAwesome, Diversity3 } from "@mui/icons-material"
import { useInView } from "../../hooks/useInViews"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import SharedNavbar from "../common/SharedNavbar"

const AboutComponent = () => {
  const { t } = useTranslation("about")

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [storyRef, storyInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [communityRef, communityInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const values = [
    {
      icon: <Handshake sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
    },
    {
      icon: <Groups sx={{ fontSize: 48, color: "#FE5F55" }} />,
      title: t("values.purpose.title"),
      description: t("values.purpose.description"),
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("values.community.title"),
      description: t("values.community.description"),
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: "#FE5F55" }} />,
      title: t("values.evolution.title"),
      description: t("values.evolution.description"),
    },
    {
      icon: <Psychology sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: t("values.trust.title"),
      description: t("values.trust.description"),
    },
    {
      icon: <Handshake sx={{ fontSize: 48, color: "#FE5F55" }} />,
      title: t("values.simplicity.title"),
      description: t("values.simplicity.description"),
    },
  ]

  const communityMembers = [
    {
      name: t("community.member1.name"),
      role: t("community.member1.role"),
      description: t("community.member1.description"),
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: t("community.member2.name"),
      role: t("community.member2.role"),
      description: t("community.member2.description"),
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: t("community.member3.name"),
      role: t("community.member3.role"),
      description: t("community.member3.description"),
      avatar: "/placeholder.svg?height=120&width=120",
    },
    {
      name: t("community.member4.name"),
      role: t("community.member4.role"),
      description: t("community.member4.description"),
      avatar: "/placeholder.svg?height=120&width=120",
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
      </Head>
      <Box className="about-page" sx={{ pt: 10, pb: 8 }}>
        {/* Hero Section */}
        <Box ref={heroRef} className="about-hero" sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <Fade in={heroInView} timeout={1000}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" className="about-title" sx={{ mb: 4, fontWeight: "bold" }}>
                  {t("hero.title")}
                </Typography>
                <Typography variant="h5" sx={{ mb: 6, color: "text.secondary", maxWidth: 800, mx: "auto" }}>
                  {t("hero.subtitle")}
                </Typography>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Story Section */}
        <Box ref={storyRef} className="about-story" sx={{ mb: 10 }}>
          <Container maxWidth="lg">
            <Fade in={storyInView} timeout={1000}>
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: "relative", height: 400 }}>
                    <img
                      src="/images/recalculando.jpg?height=400&width=600"
                      alt={t("story.imageAlt")}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h4" sx={{ mb: 3, color: "#1B5993", fontWeight: "bold" }}>
                    {t("story.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7 }}>
                    {t("story.paragraph1")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7 }}>
                    {t("story.paragraph2")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: "rgba(254, 95, 85, 0.1)",
                      color: "#FE5F55",
                      p: 2,
                      borderRadius: "8px",
                      fontWeight: "medium",
                      fontSize: "1.1rem",
                    }}
                  >
                    💡 {t("story.birth")}
                  </Typography>
                </Grid>
              </Grid>
            </Fade>
          </Container>
        </Box>

        {/* Vision & Mission Section */}
        <Box sx={{ mb: 10, backgroundColor: "#1B5993", color: "white", py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "center" }}>
                  <AutoAwesome sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                    {t("vision.title")}
                  </Typography>
                  <Typography variant="h6" sx={{ lineHeight: 1.6, opacity: 0.95 }}>
                    {t("vision.content")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: "center" }}>
                  <Psychology sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                    {t("mission.title")}
                  </Typography>
                  <Typography variant="h6" sx={{ lineHeight: 1.6, opacity: 0.95 }}>
                    {t("mission.content")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box ref={valuesRef} className="about-values" sx={{ mb: 10, backgroundColor: "#f8f9fa", py: 8 }}>
          <Container maxWidth="lg">
            <Fade in={valuesInView} timeout={1000}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
                  {t("values.title")}
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
                  {t("values.subtitle")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Zoom in={valuesInView} timeout={1000 + index * 200}>
                    <Card
                      sx={{
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                          <Box sx={{ flexShrink: 0 }}>{value.icon}</Box>
                          <Box>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                              {value.title}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
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
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Diversity3 sx={{ fontSize: 64, color: "#1B5993", mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold" }}>
                  {t("community.title")}
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 800, mx: "auto", mb: 2 }}>
                  {t("community.subtitle")}
                </Typography>
                <Typography variant="body1" sx={{ color: "#FE5F55", fontWeight: "bold", fontSize: "1.1rem" }}>
                  {t("community.philosophy")}
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} justifyContent="center">
              {communityMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Zoom in={communityInView} timeout={1200 + index * 200}>
                    <Card
                      sx={{
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Avatar
                          src={member.avatar}
                          sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                            border: "3px solid #1B5993",
                          }}
                        />
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem" }}>
                          {member.name}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: "#FE5F55", fontWeight: "medium" }}>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                          {member.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default AboutComponent
