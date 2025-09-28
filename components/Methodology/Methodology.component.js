"use client"

import {
  Build as BuildIcon,
  Close as CloseIcon,
  Explore as ExploreIcon,
  Info as InfoIcon,
  Science as ScienceIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
import { ROUTES } from "../../constants/constants"
import { trackEvent } from "../../utils/analytics"
import { getItemEnabledState, methodologyConfig, presetConfigs, staticStages } from "./methodology.config"

const stageIcons = {
  explore: ExploreIcon,
  define: BuildIcon,
  test: ScienceIcon,
  evolve: TrendingUpIcon,
}

const stageColors = {
  explore: "#1b5993",
  define: "#0a2239",
  test: "#fe5f55",
  evolve: "#0F2F4D",
}

const MethodologyPage = () => {
  const { t } = useTranslation("methodology")

  // State management
  const [selectedPreset, setSelectedPreset] = useState("startup")
  const [toggles, setToggles] = useState(presetConfigs.startup)
  const [selectedItem, setSelectedItem] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const router = useRouter()

  // Handle preset selection
  const handlePresetChange = (preset) => {
    if (preset && presetConfigs[preset]) {
      setSelectedPreset(preset)
      setToggles(presetConfigs[preset])
      trackEvent("preset_selected", { preset })
    }
  }

  // Handle individual toggle changes
  const handleToggleChange = (aspect, value) => {
    setToggles((prev) => ({
      ...prev,
      [aspect]: value,
    }))
    trackEvent("toggle_changed", { aspect, value })
  }

  // Handle item dialog - now works for both enabled and disabled items
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setDialogOpen(true)
    const isEnabled = getItemEnabledState(item, toggles)
    trackEvent("item_opened", {
      stage: item.stage,
      key: item.key,
      enabled: isEnabled,
    })
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedItem(null)
  }

  // Get module icon
  const getModuleIcon = (module) => {
    switch (module) {
      case "compass":
        return <ExploreIcon sx={{ opacity: 0.3, fontSize: "1.2rem" }} />
      case "platform":
      case "charter":
        return (
          <Box
            component="img"
            src="/logos/a6-white-500.png"
            alt="AngoraSix"
            sx={{
              width: 16,
              height: 16,
              opacity: 0.3,
              filter: "invert(1)",
            }}
          />
        )
      default:
        return null
    }
  }

  // Render mini item card
  const renderMiniItemCard = (item) => {
    const isEnabled = getItemEnabledState(item, toggles)

    return (
      <Fade in key={item.key} timeout={300}>
        <Card
          sx={{
            minWidth: 200,
            maxWidth: 280,
            opacity: isEnabled ? 1 : 0.3,
            cursor: "pointer",
            transition: "all 0.2s ease",
            backgroundColor: isEnabled ? "background.paper" : "grey.100",
            border: isEnabled ? "1px solid" : "1px solid",
            borderColor: isEnabled ? "divider" : "grey.300",
            "&:hover": {
              elevation: 3,
              transform: "translateY(-2px)",
              borderColor: isEnabled ? "primary.main" : "grey.400",
            },
          }}
          onClick={() => handleItemClick(item)}
        >
          <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  flex: 1,
                  lineHeight: 1.2,
                  fontSize: "0.85rem",
                  color: isEnabled ? "text.primary" : "text.disabled",
                }}
              >
                {t(`items.${item.key}.title`)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                {item.module && getModuleIcon(item.module)}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    )
  }

  // Render controls panel
  const renderControlsPanel = () => (
    <Box>
      {/* Presets */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            {t("presets.title")}
          </Typography>
          <Tooltip title={t("presets.tooltip")} placement="top">
            <IconButton size="small" sx={{ ml: 0.5, p: 0.25 }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {Object.keys(presetConfigs).map((preset) => (
            <Tooltip key={preset} title={t(`presets.${preset}.tooltip`)} placement="top">
              <Chip
                label={t(`presets.${preset}.label`)}
                variant={selectedPreset === preset ? "filled" : "outlined"}
                color={selectedPreset === preset ? "primary" : "default"}
                onClick={() => handlePresetChange(preset)}
                size="small"
                sx={{ cursor: "pointer", fontSize: "0.75rem" }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Toggles - Compressed */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: "1rem" }}>
          {t("aspects.title")}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(methodologyConfig.aspects).map(([aspect, options]) => (
            <Grid item xs={12} key={aspect}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>
                    {t(`aspects.${aspect}.label`)}
                  </Typography>
                  <Tooltip title={t(`aspects.${aspect}.tooltip`)}>
                    <IconButton size="small" sx={{ ml: 0.5, p: 0.25 }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                {options.length === 4 ? (
                  <Box
                    sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", height: 64 }}
                  >
                    <ToggleButton
                      value={options[0]}
                      selected={toggles[aspect] === options[0]}
                      onChange={(e) => handleToggleChange(aspect, options[0])}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        py: 0.5,
                        borderRadius: "6px 0 0 0",
                        borderRight: "0.5px solid",
                        borderBottom: "0.5px solid",
                        borderColor: "#afc1d6",
                      }}
                    >
                      {t(`aspects.${aspect}.options.${options[0]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[1]}
                      selected={toggles[aspect] === options[1]}
                      onChange={(e) => handleToggleChange(aspect, options[1])}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        py: 0.5,
                        borderRadius: "0 6px 0 0",
                        borderLeft: "0.5px solid",
                        borderBottom: "0.5px solid",
                        borderColor: "#afc1d6",
                      }}
                    >
                      {t(`aspects.${aspect}.options.${options[1]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[2]}
                      selected={toggles[aspect] === options[2]}
                      onChange={(e) => handleToggleChange(aspect, options[2])}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        py: 0.5,
                        borderRadius: "0 0 0 6px",
                        borderRight: "0.5px solid",
                        borderTop: "0.5px solid",
                        borderColor: "#afc1d6",
                      }}
                    >
                      {t(`aspects.${aspect}.options.${options[2]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[3]}
                      selected={toggles[aspect] === options[3]}
                      onChange={(e) => handleToggleChange(aspect, options[3])}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        py: 0.5,
                        borderRadius: "0 0 6px 0",
                        borderLeft: "0.5px solid",
                        borderTop: "0.5px solid",
                        borderColor: "#afc1d6",
                      }}
                    >
                      {t(`aspects.${aspect}.options.${options[3]}`)}
                    </ToggleButton>
                  </Box>
                ) : (
                  <ToggleButtonGroup
                    value={toggles[aspect]}
                    exclusive
                    onChange={(e, value) => value && handleToggleChange(aspect, value)}
                    size="small"
                    fullWidth
                    sx={{ height: 32 }}
                  >
                    {options.map((option) => (
                      <ToggleButton key={option} value={option} sx={{ fontSize: "0.7rem", py: 0.5 }}>
                        {t(`aspects.${aspect}.options.${option}`)}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )

  return (
    <Box className="MethodologyPage">
      {/* Header */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
          {t("title")}
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
          {t("subtitle")}
        </Typography>

        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            className="cta-button"
            color="secondary"
            variant="contained"
            size="large"
            onClick={() => {
              // Navigate to services and open contact modal
              router.push(`${ROUTES.services}?section=guidance&dialog=true`)
            }}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {t("cta.contact")}
          </Button>
        </Box>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Grid container spacing={3}>
          {/* Left Column - Stages (Desktop: 8/12, Mobile: 12/12) */}
          <Grid item xs={12} md={8}>
            {staticStages.map((stage) => {
              const StageIcon = stageIcons[stage.key]
              const stageColor = stageColors[stage.key]

              return (
                <Paper
                  key={stage.key}
                  elevation={2}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderLeft: `4px solid ${stageColor}`,
                    backgroundColor: `${stageColor}08`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <StageIcon sx={{ color: stageColor, mr: 1.5, fontSize: "1.5rem" }} />
                    <Typography variant="h5" sx={{ color: stageColor, fontWeight: 600, fontSize: "1.3rem" }}>
                      {t(`stages.${stage.key}.title`)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.5 }}>
                    {t(`stages.${stage.key}.description`)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {stage.items.map((item) => renderMiniItemCard(item))}
                  </Box>
                </Paper>
              )
            })}
          </Grid>

          {/* Right Column - Controls (Desktop: 4/12, Mobile: Hidden) */}
          <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                position: "sticky",
                top: 24,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
                boxShadow: 1,
              }}
            >
              {renderControlsPanel()}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile FAB */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { xs: "flex", md: "none" },
        }}
        onClick={() => setMobileDrawerOpen(true)}
      >
        <SettingsIcon />
      </Fab>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ p: 3, maxHeight: "70vh", overflow: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6">{t("controls.title")}</Typography>
            <IconButton onClick={() => setMobileDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {renderControlsPanel()}
        </Box>
      </Drawer>

      {/* Item Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5" sx={{ mr: 1 }}>
                    {t(`items.${selectedItem.key}.title`)}
                  </Typography>
                  {selectedItem.module && getModuleIcon(selectedItem.module)}
                  {!getItemEnabledState(selectedItem, toggles) && (
                    <Chip
                      label={t("item.notApplicableChip")}
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
                <IconButton onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {t(`items.${selectedItem.key}.purpose`)}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {t("dialog.whenToUse")}
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {t(`items.${selectedItem.key}.whenToUse`, { returnObjects: true }).map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {t("dialog.steps")}
              </Typography>
              <List dense sx={{ mb: 3 }}>
                {t(`items.${selectedItem.key}.steps`, { returnObjects: true }).map((step, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText primary={`${index + 1}. ${step}`} />
                  </ListItem>
                ))}
              </List>

              {t(`items.${selectedItem.key}.resources`, { returnObjects: true }).length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {t("dialog.resources")}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {t(`items.${selectedItem.key}.resources`, { returnObjects: true }).map((resource, index) => (
                      <Button key={index} variant="outlined" size="small" href={resource.url} target="_blank">
                        {resource.name}
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>{t("dialog.close")}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default MethodologyPage
