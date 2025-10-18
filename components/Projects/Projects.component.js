"use client"

import { Alert, Box, Button, Card, CardContent, Container, Grid, Typography, Chip, Divider } from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import config from "../../config"
import { useSession } from "next-auth/react"
import AddIcon from "@mui/icons-material/Add"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import GroupIcon from "@mui/icons-material/Group"

const ProjectsComponent = ({ managements }) => {
  const { t } = useTranslation("projects")
  const { data: session } = useSession()
  const router = useRouter()

  // Separate projects by admin/member role
  const adminProjects = managements.collection.filter((mgmt) => {
    const member = mgmt.members?.find((m) => m.contributorId === session?.user?.id)
    return member?.roles?.includes("admin")
  })

  const memberProjects = managements.collection.filter((mgmt) => {
    const member = mgmt.members?.find((m) => m.contributorId === session?.user?.id)
    return member && !member.roles?.includes("admin")
  })

  const handleProjectClick = (managementId) => {
    router.push(`/managements/${managementId}`)
  }

  const handleCreateProject = () => {
    router.push("/managements/new")
  }

  const renderProjectCard = (mgmt, isAdmin) => {
    const activeMembers = mgmt.members?.filter((m) => m.status === "active") || []

    return (
      <Grid item xs={12} sm={6} md={4} key={mgmt.id}>
        <Card
          className="project-card"
          onClick={() => handleProjectClick(mgmt.id)}
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4,
            },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
              <Typography variant="h6" component="h3" fontWeight="bold">
                {mgmt.project?.name || t("project.unnamed")}
              </Typography>
              {isAdmin && (
                <Chip
                  icon={<AdminPanelSettingsIcon fontSize="small" />}
                  label={t("role.admin")}
                  color="primary"
                  size="small"
                />
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <GroupIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {t("members.count", { count: activeMembers.length })}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Chip label={t(`status.${mgmt.status?.toUpperCase()}`)} size="small" variant="outlined" />
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <ArrowForwardIcon color="action" fontSize="small" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/projects" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="projects-page">
        <Container maxWidth="lg" className="projects-container">
          <Box py={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
              <Box>
                <Typography variant="h3" component="h1" gutterBottom>
                  {t("title")}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t("description")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreateProject}
                size="large"
              >
                {t("actions.create")}
              </Button>
            </Box>

            {managements.collection.length === 0 ? (
              <Box py={4}>
                <Alert severity="info">
                  <Typography variant="body1">{t("empty.message")}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateProject}
                    sx={{ mt: 2 }}
                  >
                    {t("empty.action")}
                  </Button>
                </Alert>
              </Box>
            ) : (
              <>
                {/* Admin Projects Section */}
                {adminProjects.length > 0 && (
                  <Box mb={6}>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                      <AdminPanelSettingsIcon color="primary" />
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {t("sections.admin.title")}
                      </Typography>
                      <Chip label={adminProjects.length} color="primary" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {t("sections.admin.description")}
                    </Typography>
                    <Grid container spacing={3}>
                      {adminProjects.map((mgmt) => renderProjectCard(mgmt, true))}
                    </Grid>
                  </Box>
                )}

                {/* Divider between sections if both exist */}
                {adminProjects.length > 0 && memberProjects.length > 0 && <Divider sx={{ my: 4 }} />}

                {/* Member Projects Section */}
                {memberProjects.length > 0 && (
                  <Box mb={4}>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                      <GroupIcon color="action" />
                      <Typography variant="h5" component="h2" fontWeight="bold">
                        {t("sections.member.title")}
                      </Typography>
                      <Chip label={memberProjects.length} variant="outlined" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {t("sections.member.description")}
                    </Typography>
                    <Grid container spacing={3}>
                      {memberProjects.map((mgmt) => renderProjectCard(mgmt, false))}
                    </Grid>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ProjectsComponent
