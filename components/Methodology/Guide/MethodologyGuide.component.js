"use client"

import {
  Build as BuildIcon,
  Close as CloseIcon,
  Explore as ExploreIcon,
  Handshake as HandshakeIcon,
  FiberManualRecord as CircleIcon,
  Info as InfoIcon,
  Loop as LoopIcon,
  Settings as SettingsIcon,
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
import { ROUTES } from "../../../constants/constants"
import { trackEvent } from "../../../utils/analytics"
import { getItemImportance, methodologyGuideConfig, presetConfigs, staticStages } from "./methodologyGuide.config"

const stageIcons = {
  alignment: HandshakeIcon,
  setup: BuildIcon,
  implementation: LoopIcon,
}

const stageColors = {
  alignment: "#1b5993",
  setup: "#0a2239",
  implementation: "#fe5f55",
}

const MethodologyGuidePage = () => {
  const { t } = useTranslation("methodology.guide")

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
      trackEvent("methodology_guide_preset_selected", { preset })
    }
  }

  // Handle individual toggle changes
  const handleToggleChange = (aspect, value) => {
    setToggles((prev) => ({
      ...prev,
      [aspect]: value,
    }))
    trackEvent("methodology_guide_toggle_changed", { aspect, value })
  }

  // Handle item dialog - works for both enabled and disabled items
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setDialogOpen(true)
    const importance = getItemImportance(item, toggles)
    trackEvent("methodology_guide_item_opened", {
      stage: item.stage,
      key: item.key,
      enabled: importance > 0,
      importance,
    })
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedItem(null)
  }

  // Get module icon(s)
  const getModuleIcon = (module) => {
    if (module === "both") {
      return (
        <Box className="module-icons-both">
          <ExploreIcon className="module-icon-compass" />
          <Box component="img" src="/logos/a6-white-500.png" alt="AngoraSix" className="module-icon-platform" />
        </Box>
      )
    }

    switch (module) {
      case "compass":
        return <ExploreIcon className="module-icon-compass" />
      case "platform":
        return <Box component="img" src="/logos/a6-white-500.png" alt="AngoraSix" className="module-icon-platform" />
      default:
        return null
    }
  }

  // Render importance indicator - always shows 3 circles
  const renderImportanceIndicator = (importance) => {
    const isEnabled = importance > 0

    return (
      <Box className="importance-indicator">
        {[1, 2, 3].map((level) => (
          <CircleIcon
            key={level}
            className={`importance-circle ${isEnabled && level <= importance ? "filled" : "empty"}`}
          />
        ))}
      </Box>
    )
  }

  // Render mini item card
  const renderMiniItemCard = (item) => {
    const importance = getItemImportance(item, toggles)
    const isEnabled = importance > 0

    return (
      <Card
        key={item.key}
        className={`item-card ${isEnabled ? "enabled" : "disabled"}`}
        onClick={() => handleItemClick(item)}
      >
        <CardContent className="item-card-content">
          <Box className="item-card-inner">
            <Box className="item-card-header">
              <Typography variant="subtitle2" className="item-card-title">
                {t(`items.${item.key}.title`)}
              </Typography>
              <Box className="item-card-module">{item.module && getModuleIcon(item.module)}</Box>
            </Box>
            <Box className="item-card-importance">{renderImportanceIndicator(importance)}</Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  // Render controls panel
  const renderControlsPanel = () => (
    <Box className="controls-panel-content">
      {/* Presets */}
      <Box className="presets-section">
        <Box className="presets-header">
          <Typography variant="h6" className="presets-title">
            {t("presets.title")}
          </Typography>
          <Tooltip title={t("presets.tooltip")} placement="top">
            <IconButton size="small" className="info-icon-button">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className="presets-chips">
          {Object.keys(presetConfigs).map((preset) => (
            <Tooltip key={preset} title={t(`presets.${preset}.tooltip`)} placement="top">
              <Chip
                label={t(`presets.${preset}.label`)}
                variant={selectedPreset === preset ? "filled" : "outlined"}
                color={selectedPreset === preset ? "primary" : "default"}
                onClick={() => handlePresetChange(preset)}
                size="small"
                className={`preset-chip ${selectedPreset === preset ? "selected" : ""}`}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Toggles - Compressed */}
      <Box className="aspects-section">
        <Typography variant="h6" className="aspects-title">
          {t("aspects.title")}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(methodologyGuideConfig.aspects).map(([aspect, options]) => (
            <Grid item xs={12} key={aspect}>
              <Box className="aspect-item">
                <Box className="aspect-header">
                  <Typography variant="caption" className="aspect-label">
                    {t(`aspects.${aspect}.label`)}
                  </Typography>
                  <Tooltip title={t(`aspects.${aspect}.tooltip`)}>
                    <IconButton size="small" className="info-icon-button">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                {options.length === 4 ? (
                  <Box className="toggle-grid-4">
                    <ToggleButton
                      value={options[0]}
                      selected={toggles[aspect] === options[0]}
                      onChange={(e) => handleToggleChange(aspect, options[0])}
                      size="small"
                      className="toggle-button top-left"
                    >
                      {t(`aspects.${aspect}.options.${options[0]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[1]}
                      selected={toggles[aspect] === options[1]}
                      onChange={(e) => handleToggleChange(aspect, options[1])}
                      size="small"
                      className="toggle-button top-right"
                    >
                      {t(`aspects.${aspect}.options.${options[1]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[2]}
                      selected={toggles[aspect] === options[2]}
                      onChange={(e) => handleToggleChange(aspect, options[2])}
                      size="small"
                      className="toggle-button bottom-left"
                    >
                      {t(`aspects.${aspect}.options.${options[2]}`)}
                    </ToggleButton>
                    <ToggleButton
                      value={options[3]}
                      selected={toggles[aspect] === options[3]}
                      onChange={(e) => handleToggleChange(aspect, options[3])}
                      size="small"
                      className="toggle-button bottom-right"
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
                    className="toggle-group"
                  >
                    {options.map((option) => (
                      <ToggleButton key={option} value={option} className="toggle-button">
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
    <Box className="MethodologyGuidePage">
      {/* Header */}
      <Container className="page-header" maxWidth="lg">
        <Typography variant="h1" component="h1" className="page-title">
          {t("title")}
        </Typography>

        <Typography variant="h5" className="page-subtitle">
          {t("subtitle")}
        </Typography>

        <Typography variant="body1" className="page-description">
          {t("description")}
        </Typography>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" className="page-main-content">
        <Grid container spacing={3}>
          {/* Left Column - Stages (Desktop: 8/12, Mobile: 12/12) */}
          <Grid item xs={12} md={8}>
            {staticStages.map((stage) => {
              const StageIcon = stageIcons[stage.key]
              const stageColor = stageColors[stage.key]

              return (
                <Paper key={stage.key} elevation={1} className={`stage-card stage-${stage.key}`}>
                  <Box className="stage-header">
                    <StageIcon className="stage-icon" style={{ color: stageColor }} />
                    <Typography variant="h5" className="stage-title" style={{ color: stageColor }}>
                      {t(`stages.${stage.key}.title`)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="stage-description">
                    {t(`stages.${stage.key}.description`)}
                  </Typography>
                  <Box className="stage-items">{stage.items.map((item) => renderMiniItemCard(item))}</Box>
                </Paper>
              )
            })}
          </Grid>

          {/* Right Column - Controls (Desktop: 4/12, Mobile: Hidden) */}
          <Grid item xs={12} md={4} className="controls-column">
            <Box className="controls-panel">{renderControlsPanel()}</Box>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Box className="cta-section">
          <Typography variant="h4" className="cta-title">
            {t("cta.title")}
          </Typography>
          <Typography variant="body1" className="cta-description">
            {t("cta.description")}
          </Typography>
          <Button
            className="cta-button"
            color="secondary"
            variant="contained"
            size="large"
            onClick={() => {
              router.push(`${ROUTES.services}?section=guidance&dialog=true`)
            }}
          >
            {t("cta.button")}
          </Button>
        </Box>
      </Container>

      {/* Mobile FAB */}
      <Fab className="mobile-fab" onClick={() => setMobileDrawerOpen(true)}>
        <SettingsIcon />
      </Fab>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        className="mobile-drawer"
      >
        <Box className="mobile-drawer-content">
          <Box className="mobile-drawer-header">
            <Typography variant="h6">{t("controls.title")}</Typography>
            <IconButton onClick={() => setMobileDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {renderControlsPanel()}
        </Box>
      </Drawer>

      {/* Item Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth className="item-dialog">
        {selectedItem && (
          <>
            <DialogTitle className="dialog-title">
              <Box className="dialog-title-content">
                <Box className="dialog-title-main">
                  <Typography variant="h5" className="dialog-item-title">
                    {t(`items.${selectedItem.key}.title`)}
                  </Typography>
                  {selectedItem.module && getModuleIcon(selectedItem.module)}
                  {getItemImportance(selectedItem, toggles) === 0 ? (
                    <Chip
                      label={t("item.notApplicableChip")}
                      size="small"
                      color="warning"
                      variant="outlined"
                      className="not-applicable-chip"
                    />
                  ) : (
                    <Box className="dialog-importance">
                      {renderImportanceIndicator(getItemImportance(selectedItem, toggles))}
                    </Box>
                  )}
                </Box>
                <IconButton onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent className="dialog-content">
              <Typography variant="body1" className="dialog-description">
                {t(`items.${selectedItem.key}.description`)}
              </Typography>

              <Typography variant="h6" className="dialog-section-title">
                {t("dialog.objectives")}
              </Typography>
              <List dense className="dialog-list">
                {t(`items.${selectedItem.key}.objectives`, { returnObjects: true }).map((item, index) => (
                  <ListItem key={index} className="dialog-list-item">
                    <ListItemText primary={`• ${item}`} primaryTypographyProps={{ className: "dialog-list-text" }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" className="dialog-section-title">
                {t("dialog.deliverables")}
              </Typography>
              <List dense className="dialog-list">
                {t(`items.${selectedItem.key}.deliverables`, { returnObjects: true }).map((deliverable, index) => (
                  <ListItem key={index} className="dialog-list-item">
                    <ListItemText
                      primary={`${index + 1}. ${deliverable}`}
                      primaryTypographyProps={{ className: "dialog-list-text" }}
                    />
                  </ListItem>
                ))}
              </List>

              {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).length > 0 && (
                <>
                  <Typography variant="h6" className="dialog-section-title">
                    {t("dialog.tools")}
                  </Typography>
                  <Box className="dialog-tools">
                    {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).map((tool, index) => (
                      <Chip key={index} label={tool} size="small" variant="outlined" className="tool-chip" />
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleDialogClose} variant="contained">
                {t("dialog.close")}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}

export default MethodologyGuidePage
