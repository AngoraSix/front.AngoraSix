import { useState } from "react"
import Head from "next/head"
import { Box, Typography, Button, Container, Grid, Card, CardContent, TextField, Fade, Zoom } from "@mui/material"
import {
  RocketLaunch,
  Psychology,
  AccountBalance,
  Groups,
  TrendingUp,
  CheckCircle,
  AutoAwesome,
  Handshake,
} from "@mui/icons-material"
import { useInView } from "../../../hooks/useInViews";

const VisionaryLanding = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [problemRef, problemInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [solutionRef, solutionInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [previewRef, previewInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const problems = [
    {
      icon: <RocketLaunch sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: "Lack of clear structure",
      description: "You've tried launching before, but without proper guidance and framework.",
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: "No shared vision or fair retribution",
      description: "Co-founder dynamics failed. Contributions weren't tracked fairly.",
    },
    {
      icon: <Psychology sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: "Co-founder burnout or admin overload",
      description: "You've pitched. You've recruited. You've burned out managing everything.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#FE5F55" }} />,
      title: "Repeating the same mistakes again",
      description: "Without learning from past failures, you're stuck in the same cycle.",
    },
  ]

  const solutions = [
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: "AI Support",
      description: "Knows your context. Offers next steps. Your intelligent project assistant.",
      gradient: "linear-gradient(135deg, #1B5993 0%, #0A2239 100%)",
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: "Effort Ledger",
      description: "Every task tracked transparently. No more guesswork about contributions.",
      gradient: "linear-gradient(135deg, #AFC1D6 0%, #7D99BA 100%)",
    },
    {
      icon: <Handshake sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: "Ownership & Profit Shares",
      description: "Rewards follow contribution. Fair equity distribution built-in.",
      gradient: "linear-gradient(135deg, #FE5F55 0%, #FF8A80 100%)",
    },
    {
      icon: <Psychology sx={{ fontSize: 48, color: "#1B5993" }} />,
      title: "Clarity & Guidance",
      description: "You focus on vision, we handle structure. Built-in startup incubation logic.",
      gradient: "linear-gradient(135deg, #DCE7EA 0%, #AFC1D6 100%)",
    },
  ]

  return (
    <>
      <Head>
        <title>AngoraSix - Great Ideas Need Help</title>
        <meta
          name="description"
          content="Stop failing. Start building with structure, AI guidance, and transparent collaboration."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box className="visionary-landing">
        {/* Hero Section */}
        <Box ref={heroRef} className="hero-section">
          <Container maxWidth="lg">
            <Fade in={heroInView} timeout={1000}>
              <Box className="hero-content">
                <Typography variant="h1" className="hero-title">
                  Great ideas need help.
                </Typography>
                <Typography variant="h4" className="hero-subtitle">
                  We've been there. This time, start smart—with structure, guidance, and transparency to bring your idea
                  to life.
                </Typography>
                <Button variant="contained" size="large" className="hero-cta" startIcon={<RocketLaunch />}>
                  Start Building
                </Button>
              </Box>
            </Fade>
          </Container>
        </Box>

        {/* Problem Section */}
        <Box ref={problemRef} className="problem-section">
          <Container maxWidth="lg">
            <Fade in={problemInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  Why It's Hard Alone
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  You've tried launching before. You've pitched. You've recruited. You've burned out.
                  <br />
                  You don't need to go through that again.
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="problems-grid">
              {problems.map((problem, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Zoom in={problemInView} timeout={1000 + index * 200}>
                    <Card className="problem-card">
                      <CardContent>
                        <Box className="problem-icon">{problem.icon}</Box>
                        <Typography variant="h6" className="problem-title">
                          {problem.title}
                        </Typography>
                        <Typography variant="body1" className="problem-description">
                          {problem.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Solution Section */}
        <Box ref={solutionRef} className="solution-section">
          <Container maxWidth="lg">
            <Fade in={solutionInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  This Time, You Have Us
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  You don't need to do it alone.
                </Typography>
              </Box>
            </Fade>

            <Grid container spacing={4} className="solutions-grid">
              {solutions.map((solution, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Zoom in={solutionInView} timeout={1000 + index * 200}>
                    <Card className="solution-card" sx={{ background: solution.gradient }}>
                      <CardContent>
                        <Box className="solution-icon">{solution.icon}</Box>
                        <Typography variant="h6" className="solution-title">
                          {solution.title}
                        </Typography>
                        <Typography variant="body2" className="solution-description">
                          {solution.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Platform Preview */}
        <Box ref={previewRef} className="preview-section">
          <Container maxWidth="lg">
            <Fade in={previewInView} timeout={1000}>
              <Box className="section-header">
                <Typography variant="h2" className="section-title">
                  See AngoraSix in Action
                </Typography>
                <Typography variant="h6" className="section-subtitle">
                  From idea chaos to organized success
                </Typography>
              </Box>
            </Fade>

            <Zoom in={previewInView} timeout={1200}>
              <Box className="platform-preview">
                <Box className="preview-mockup">
                  <Box className="mockup-header">
                    <Box className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </Box>
                    <Typography variant="caption">AngoraSix Dashboard</Typography>
                  </Box>
                  <Box className="mockup-content">
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Box className="mockup-chart">
                          <Typography variant="subtitle2">Project Ownership</Typography>
                          <Box className="chart-placeholder"></Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="mockup-ai">
                          <Typography variant="subtitle2">AI Assistant</Typography>
                          <Box className="ai-message">
                            <Typography variant="caption">
                              "Based on your progress, I suggest focusing on user research next."
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          </Container>
        </Box>

        {/* Who It's For */}
        <Box className="audience-section">
          <Container maxWidth="md">
            <Box className="section-header">
              <Typography variant="h2" className="section-title">
                Built for Visionaries Like You
              </Typography>
            </Box>

            <Grid container spacing={3} className="audience-grid">
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">Solo founders with unfinished projects</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">Technical/creative duos with no manager</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="audience-item">
                  <CheckCircle sx={{ fontSize: 32, color: "#1B5993", mb: 2 }} />
                  <Typography variant="h6">Visionaries who've hit roadblocks</Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h6" className="audience-tagline">
              AngoraSix is your operations partner, your productivity system, and your co-creation tool.
            </Typography>
          </Container>
        </Box>

        {/* User Story */}
        <Box className="story-section">
          <Container maxWidth="md">
            <Card className="story-card">
              <CardContent>
                <Typography variant="h5" className="story-quote">
                  "Marcos had 3 previous projects that never made it past the planning stage. With AngoraSix, he
                  launched his idea, distributed roles fairly, and is now working with a team of 4, fully aligned."
                </Typography>
                <Typography variant="subtitle1" className="story-attribution">
                  — Real AngoraSix Success Story
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box className="cta-section">
          <Container maxWidth="md">
            <Box className="cta-content">
              <Typography variant="h2" className="cta-title">
                Ready to Create Again?
              </Typography>
              <Typography variant="h6" className="cta-subtitle">
                If you're ready to create again—with confidence—AngoraSix is ready for you.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} className="cta-form">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cta-input"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  className="cta-button"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Welcome to AngoraSix!" : "Get Early Access"}
                </Button>
              </Box>

              <Typography variant="body2" className="cta-note">
                We built this because we needed it too. Join other founders who are building with clarity.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default VisionaryLanding
