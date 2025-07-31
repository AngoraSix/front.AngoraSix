import { AccountBalance, CheckCircle, Gavel, Info, Schedule, Warning } from "@mui/icons-material"
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import { useTranslation } from "next-i18next"
import PropTypes from "prop-types"

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
  position: "relative",
  minHeight: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: "linear-gradient(90deg, #0A2239, #7D99BA 100%)",
  },
}))

const StatusCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(0, 0, 0, 0.04)",
  marginBottom: theme.spacing(3),
  overflow: "hidden",
  position: "relative",
}))

const BylawCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-2px)",
  },
}))

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const translateOrValue = (t, i18n, i18nKey, value) => {
  const resolvedValue = i18n.exists(i18nKey, {
    ns: "management.view",
  })
    ? t(i18nKey)
    : typeof value === "string" || value instanceof String
      ? capitalizeFirstLetter(value)
      : value

  return String(resolvedValue)
}

const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "startup":
    case "startup":
      return <CheckCircle sx={{ color: "#10b981" }} />
    case "pending":
    case "in_progress":
      return <Schedule sx={{ color: "#f59e0b" }} />
    case "warning":
      return <Warning sx={{ color: "#ef4444" }} />
    default:
      return <Info sx={{ color: "#6b7280" }} />
  }
}

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "completed":
      return { bg: "#dcfce7", color: "#166534" }
    case "pending":
    case "in_progress":
      return { bg: "#fef3c7", color: "#d97706" }
    case "warning":
      return { bg: "#fecaca", color: "#dc2626" }
    default:
      return { bg: "#f3f4f6", color: "#374151" }
  }
}

const ManagementCoreSection = ({ project, projectManagement }) => {
  const { t, i18n } = useTranslation("management.view")
  const theme = useTheme()
  const statusColors = getStatusColor(projectManagement.status)
  console.log("Project Management Data:", projectManagement)

  const generateBylawChip = (scope, definition) => (<Chip
    key={`${scope}-${definition}`}
    label={translateOrValue(
      t,
      i18n,
      `management.view.bylaws.${scope}.${definition}`,
      definition,
    )}
    size="small"
    sx={{
      margin: "auto 0.15rem",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      fontWeight: 500,
      fontSize: "0.8rem",
      "& .MuiChip-label": {
        px: 1.5,
      },
    }}
  />
  )

  return (
    <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Status Section */}
      <StatusCard>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
            {getStatusIcon(projectManagement.status)}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              {t("management.view.projectStatus.title")}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Chip
              label={t(`management.view.status.${projectManagement.status}`)}
              sx={{
                backgroundColor: statusColors.bg,
                color: statusColors.color,
                fontWeight: 600,
                fontSize: "0.875rem",
                height: 36,
                px: 2,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          </Box>
        </CardContent>
      </StatusCard>

      {/* Bylaws Section */}
      <StyledCard sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 3, height: "100%" }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Gavel sx={{ color: "#ffffff", fontSize: 28 }} />
            <Typography
              variant="h6"
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >

              {t("management.view.projectConstitution.title")}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {Object.entries(projectManagement.constitution.bylaws).map(([scope, bylaw]) => {
              const shouldShowDefinition = typeof bylaw.definition !== "boolean" || bylaw.definition
              const hasValue = typeof bylaw.definition !== "boolean"

              return (
                <Grid item xs={12} key={scope}>
                  <BylawCard>
                    <CardContent sx={{ p: 2.5 }}>
                      {shouldShowDefinition && (
                        <Box mb={hasValue ? 1.5 : 0}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: "#ffffff",
                              fontWeight: 600,
                              fontSize: "0.95rem",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <AccountBalance sx={{ fontSize: 18, opacity: 0.8 }} />
                            {translateOrValue(t, i18n, `management.view.bylaws.${scope}`, scope)}
                          </Typography>
                        </Box>
                      )}

                      {hasValue && (
                        <Box>
                          {Array.isArray(bylaw.definition) ? bylaw.definition.map(d => generateBylawChip(scope, d)) : (
                            generateBylawChip(scope, bylaw.definition)
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </BylawCard>
                </Grid>
              )
            })}
          </Grid>
        </CardContent>
      </StyledCard>
    </Box>
  )
}

ManagementCoreSection.defaultProps = {
  isAdmin: false,
}

ManagementCoreSection.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
}

export default ManagementCoreSection
