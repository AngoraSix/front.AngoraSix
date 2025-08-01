import {
  AccountBalance,
  Gavel,
  Info,
  Lightbulb,
  Rocket,
  Business as BusinessOperationalIcon,
  Group,
  AttachMoney,
  Payment,
  AccountBalance as GovernanceIcon,
} from "@mui/icons-material"
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material"
import { useTranslation } from "next-i18next"
import PropTypes from "prop-types"

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
    case "idea":
      return <Lightbulb className="status-icon status-icon-idea" />
    case "startup":
      return <Rocket className="status-icon status-icon-startup" />
    case "operational":
      return <BusinessOperationalIcon className="status-icon status-icon-operational" />
    default:
      return <Info className="status-icon status-icon-default" />
  }
}

const getCategoryIcon = (categoryKey) => {
  switch (categoryKey) {
    case "OWNERSHIP.GENERAL":
      return <AccountBalance className="category-icon" />
    case "OWNERSHIP.GOVERNANCE":
      return <GovernanceIcon className="category-icon" />
    case "OWNERSHIP.TASKS":
      return <Group className="category-icon" />
    case "FINANCIAL.GENERAL":
      return <AttachMoney className="category-icon" />
    case "FINANCIAL.PROFIT_SHARES":
      return <Payment className="category-icon" />
    case "FINANCIAL.CURRENCIES":
      return <AttachMoney className="category-icon" />
    default:
      return <AccountBalance className="category-icon" />
  }
}

const ManagementCoreSection = ({ project, projectManagement }) => {
  const { t, i18n } = useTranslation("management.view")
  console.log("Project Management Data:", projectManagement)

  const generateBylawChip = (bylawKey, definition) => {
    let displayValue = definition

    // Handle boolean values
    if (typeof definition === "boolean") {
      displayValue = definition ? "true" : "false"
    }

    // Handle array values
    if (Array.isArray(definition)) {
      return definition.map((item, index) => (
        <Chip
          key={`${bylawKey}-${index}`}
          label={translateOrValue(t, i18n, `management.view.bylaws.values.${item}`, item)}
          size="small"
          className="bylaw-chip"
        />
      ))
    }

    return (
      <Chip
        key={bylawKey}
        label={translateOrValue(t, i18n, `management.view.bylaws.values.${displayValue}`, displayValue)}
        size="small"
        className="bylaw-chip"
      />
    )
  }

  // Define the order of categories to display
  const categoryOrder = [
    "OWNERSHIP.GENERAL",
    "OWNERSHIP.GOVERNANCE",
    "OWNERSHIP.TASKS",
    "FINANCIAL.GENERAL",
    "FINANCIAL.PROFIT_SHARES",
    "FINANCIAL.CURRENCIES",
  ]

  // Get bylaws in the specified order
  const orderedBylaws = categoryOrder
    .map((categoryKey) => ({
      categoryKey,
      bylaws: projectManagement.constitution.bylaws[categoryKey] || {},
    }))
    .filter((category) => Object.keys(category.bylaws).length > 0)

  return (
    <div className="management-core-section">
      {/* Status Section */}
      <Card className="status-card">
        <CardContent className="status-card-content">
          <Box className="status-header">
            {getStatusIcon(projectManagement.status)}
            <Typography variant="subtitle1" className="status-title">
              {t("management.view.projectStatus.title")}
            </Typography>
          </Box>

          <Box className="status-chip-container">
            <Chip
              label={t(`management.view.status.${projectManagement.status}`)}
              className={`status-chip status-chip-${projectManagement.status.toLowerCase()}`}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Bylaws Section */}
      <Card className="bylaws-card">
        <CardContent className="bylaws-card-content">
          <Box className="bylaws-header">
            <Gavel className="bylaws-icon" />
            <Typography variant="h6" className="bylaws-title">
              {t("management.view.projectConstitution.title")}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {orderedBylaws.map(({ categoryKey, bylaws }) => (
              <Grid item xs={12} key={categoryKey}>
                <Card className="category-card">
                  <CardContent className="category-card-content">
                    <Box className="category-header">
                      {getCategoryIcon(categoryKey)}
                      <Typography variant="h6" className="category-title">
                        {t(`management.view.bylaws.categories.${categoryKey.replace(".", "_")}`)}
                      </Typography>
                    </Box>

                    <Box className="bylaws-list">
                      {Object.entries(bylaws).map(([bylawKey, bylawValue]) => {
                        // Skip if the bylaw is false (for boolean values)
                        if (typeof bylawValue === "boolean" && !bylawValue) {
                          return null
                        }

                        return (
                          <Box key={bylawKey} className="bylaw-item">
                            <Typography variant="subtitle2" className="bylaw-label">
                              {t(`management.view.bylaws.${bylawKey}`)}
                            </Typography>
                            <Box className="bylaw-chips-container">{generateBylawChip(bylawKey, bylawValue)}</Box>
                          </Box>
                        )
                      })}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
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
