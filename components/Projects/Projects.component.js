"use client"

import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material"
import { useRouter } from "next/router"

const ProjectsComponent = ({ projects, loading, error, session, status, t }) => {
  const router = useRouter()

  if (status === "loading" || loading) {
    return (
      <Container maxWidth="lg" className="projects-page">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (status === "unauthenticated") {
    return (
      <Container maxWidth="lg" className="projects-page">
        <Box py={8}>
          <Alert severity="info">{t("auth.required")}</Alert>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="projects-page">
        <Box py={8}>
          <Alert severity="error">
            {t("error.loading")}: {error}
          </Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="projects-page">
      <Box py={8}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t("description")}
        </Typography>

        {projects.length === 0 ? (
          <Box py={4}>
            <Alert severity="info">{t("empty.message")}</Alert>
          </Box>
        ) : (
          <Box py={4}>
            {/* Projects list will go here */}
            <Typography variant="body2" color="text.secondary">
              {t("list.placeholder")}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default ProjectsComponent
