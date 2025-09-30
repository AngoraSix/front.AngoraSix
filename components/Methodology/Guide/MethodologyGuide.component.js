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
        <Box sx={{ display: "flex", gap: 0.25 }}>
          <ExploreIcon sx={{ opacity: 0.4, fontSize: "1rem" }} />
          <Box
            component="img"
            src="/logos/a6-white-500.png"
            alt="AngoraSix"
            sx={{
              width: 14,
              height: 14,
              opacity: 0.4,
              filter: "invert(1)",
            }}
          />
        </Box>
      )
    }

    switch (module) {
      case "compass":
        return <ExploreIcon sx={{ opacity: 0.4, fontSize: "1rem" }} />
      case "platform":
        return (
          <Box
            component="img"
            src="/logos/a6-white-500.png"
            alt="AngoraSix"
            sx={{
              width: 14,
              height: 14,
              opacity: 0.4,
              filter: "invert(1)",
            }}
          />
        )
      default:
        return null
    }
  }

  // Render importance indicator - always shows 3 circles
  const renderImportanceIndicator = (importance) => {
    const isEnabled = importance > 0

    return (
      <Box sx={{ display: "flex", gap: 0.25, alignItems: "center" }}>
        {[1, 2, 3].map((level) => (
          <CircleIcon
            key={level}
            sx={{
              fontSize: "0.5rem",
              color: isEnabled && level <= importance ? "#1b5993" : "#dce7ea",
              transition: "color 0.4s ease",
            }}
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
        sx={{
          minWidth: 200,
          maxWidth: 280,
          opacity: isEnabled ? 1 : 0.35,
          cursor: "pointer",
          backgroundColor: isEnabled ? "background.paper" : "grey.50",
          border: "1px solid",
          borderColor: isEnabled ? "divider" : "grey.300",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            elevation: 3,
            transform: "translateY(-2px)",
            borderColor: isEnabled ? "primary.main" : "grey.400",
            boxShadow: isEnabled ? "0 4px 12px rgba(27, 89, 147, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={() => handleItemClick(item)}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  flex: 1,
                  lineHeight: 1.3,
                  fontSize: "0.85rem",
                  color: isEnabled ? "text.primary" : "text.disabled",
                  transition: "color 0.4s ease",
                }}
              >
                {t(`items.${item.key}.title`)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                {item.module && getModuleIcon(item.module)}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>{renderImportanceIndicator(importance)}</Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  // Render controls panel
  const renderControlsPanel = () => (
    <Box>
      {/* Presets */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
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
                sx={{
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: selectedPreset === preset ? 600 : 400,
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Toggles - Compressed */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: "1rem", fontWeight: 600 }}>
          {t("aspects.title")}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(methodologyGuideConfig.aspects).map(([aspect, options]) => (
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
    <Box className="MethodologyGuidePage">
      {/* Header */}
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          {t("subtitle")}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          {t("description")}
        </Typography>
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
                  elevation={1}
                  sx={{
                    mb: 3,
                    p: { xs: 2, md: 3 },
                    borderLeft: `4px solid ${stageColor}`,
                    backgroundColor: `${stageColor}08`,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <StageIcon sx={{ color: stageColor, mr: 1.5, fontSize: "1.75rem" }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: stageColor,
                        fontWeight: 700,
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      {t(`stages.${stage.key}.title`)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2.5,
                      lineHeight: 1.6,
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                    }}
                  >
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
                top: 100,
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

        {/* CTA Section */}
        <Box
          sx={{
            mt: 6,
            p: { xs: 3, md: 4 },
            bgcolor: "primary.main",
            borderRadius: 3,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            {t("cta.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              mb: 3,
              opacity: 0.95,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
            }}
          >
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
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            {t("cta.button")}
          </Button>
        </Box>
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
            <DialogTitle
              sx={{
                bgcolor: "primary.light2",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {t(`items.${selectedItem.key}.title`)}
                  </Typography>
                  {selectedItem.module && getModuleIcon(selectedItem.module)}
                  {getItemImportance(selectedItem, toggles) === 0 ? (
                    <Chip label={t("item.notApplicableChip")} size="small" color="warning" variant="outlined" />
                  ) : (
                    <Box sx={{ ml: 1 }}>{renderImportanceIndicator(getItemImportance(selectedItem, toggles))}</Box>
                  )}
                </Box>
                <IconButton onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                {t(`items.${selectedItem.key}.description`)}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                {t("dialog.objectives")}
              </Typography>
              <List dense sx={{ mb: 3 }}>
                {t(`items.${selectedItem.key}.objectives`, { returnObjects: true }).map((item, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemText
                      primary={`• ${item}`}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                {t("dialog.deliverables")}
              </Typography>
              <List dense sx={{ mb: 3 }}>
                {t(`items.${selectedItem.key}.deliverables`, { returnObjects: true }).map((deliverable, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemText
                      primary={`${index + 1}. ${deliverable}`}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        lineHeight: 1.6,
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    {t("dialog.tools")}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                    {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).map((tool, index) => (
                      <Chip key={index} label={tool} size="small" variant="outlined" />
                    ))}
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: "grey.50" }}>
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
