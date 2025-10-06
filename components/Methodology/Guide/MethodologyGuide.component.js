"use client"

import {
  Build as BuildIcon,
  FiberManualRecord as CircleIcon,
  Close as CloseIcon,
  Explore as ExploreIcon,
  Handshake as HandshakeIcon,
  Info as InfoIcon,
  Loop as LoopIcon,
  Settings as SettingsIcon,
  KeyboardArrowRight as StartIcon,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Drawer,
  Fab,
  Grid,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
import { trackEvent } from "../../../utils/analytics"
import { getItemImportance, methodologyGuideConfig, presetConfigs, staticStages } from "./methodologyGuide.config"
import MethodologyGuideDialog from "./MethodologyGuideDialog.component"

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
  const { data: session } = useSession()

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

  const handleCTAClick = (ctaType, route) => {
    trackEvent("guide_cta_clicked", {
      event_category: "engagement",
      event_label: "methodology_guide",
      cta_type: ctaType,
    })
    router.push(route)
  }

  // Get module icon(s)
  const getModuleIcon = (module) => {
    if (module === "both") {
      return (
        <Box className="module-icons-both">
          <ExploreIcon className="module-icon-compass" />
          <Box component="img" src="/logos/a6-blue.png" alt="AngoraSix" className="module-icon-platform" />
        </Box>
      )
    }

    switch (module) {
      case "compass":
        return <ExploreIcon className="module-icon-compass" />
      case "platform":
        return <Box component="img" src="/logos/a6-blue.png" alt="AngoraSix" className="module-icon-platform" />
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
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/methodology/overview" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="MethodologyGuidePage">
        {/* Hero Section */}
        <section className="guide-hero">
          <div className="hero-content">
            <Typography variant="h1" component="h1" className="hero-title">
              {t("title")}
            </Typography>

            <Typography variant="h5" className="hero-description">
              {t("subtitle")}
            </Typography>

            <Typography variant="body2" component="blockquote" className="hero-quote">
              {t("description")}
            </Typography>
          </div>
        </section>

        {/* Main Content */}
        <Container className="page-main-content">
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
        </Container>

        {/* CTA Section */}
        <section className="ctas-section">
          <div className="ctas-content">
            <div className="ctas-header">
              <Typography variant="h4" component="h2" className="ctas-title">
                {t("cta.title")}
              </Typography>
            </div>
            <div className="ctas-buttons">
              <Button
                className="cta-button cta-primary"
                onClick={() => handleCTAClick("contact", `${ROUTES.services}?section=guidance&dialog=true`)}
              >
                <ExploreIcon sx={{ fontSize: 20 }} />
                <span>{t("cta.button")}</span>
              </Button>

              <Button
                className="cta-button cta-secondary"
                onClick={() =>
                  handleCTAClick("register", session ? ROUTES.welcome.postRegistration : ROUTES.auth.signin)
                }
              >
                <StartIcon sx={{ fontSize: 20 }} />
                <span>{t("cta.register")}</span>
              </Button>
            </div>
          </div>
        </section>

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

        {/* Item Detail Dialog - Now as separate component */}
        <MethodologyGuideDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          selectedItem={selectedItem}
          toggles={toggles}
          getModuleIcon={getModuleIcon}
          renderImportanceIndicator={renderImportanceIndicator}
        />
      </Box>
    </>
  )
}

export default MethodologyGuidePage
