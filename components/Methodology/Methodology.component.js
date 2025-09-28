"use client"

import { useState } from "react"
import { useTranslation } from "next-i18next"
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Drawer,
  IconButton,
  Tooltip,
  Fab,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  Paper,
} from "@mui/material"
import {
  Close as CloseIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Explore as ExploreIcon,
  Build as BuildIcon,
  Science as ScienceIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import { trackEvent } from "../../utils/analytics"
import { methodologyConfig, presetConfigs, getItemEnabledState, staticStages } from "./methodology.config"

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
  evolve: "#7d99ba",
}

const MethodologyPage = () => {
  const { t } = useTranslation("methodology")

  // State management
  const [selectedPreset, setSelectedPreset] = useState("startup")
  const [toggles, setToggles] = useState(presetConfigs.startup)
  const [selectedItem, setSelectedItem] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

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

  // Handle item dialog
  const handleItemClick = (item) => {
    const isEnabled = getItemEnabledState(item, toggles)
    if (!isEnabled) return

    setSelectedItem(item)
    setDialogOpen(true)
    trackEvent("item_opened", {
      stage: item.stage,
      key: item.key,
    })
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedItem(null)
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
            cursor: isEnabled ? "pointer" : "default",
            transition: "all 0.2s ease",
            backgroundColor: isEnabled ? "background.paper" : "grey.100",
            border: isEnabled ? "1px solid" : "1px solid",
            borderColor: isEnabled ? "divider" : "grey.300",
            "&:hover": isEnabled
              ? {
                  elevation: 3,
                  transform: "translateY(-2px)",
                  borderColor: "primary.main",
                }
              : {},
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
                {item.title}
              </Typography>
              {!isEnabled && (
                <Tooltip title={t("item.notApplicable")}>
                  <InfoIcon color="disabled" fontSize="small" sx={{ ml: 0.5 }} />
                </Tooltip>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {item.module && (
                <Chip
                  label={t(`modules.${item.module}`)}
                  size="small"
                  color="secondary"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    opacity: isEnabled ? 1 : 0.5,
                  }}
                />
              )}
              {isEnabled && (
                <Button size="small" sx={{ fontSize: "0.7rem", minWidth: "auto", p: 0.5 }}>
                  {t("item.seeMore")}
                </Button>
              )}
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
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: "1rem" }}>
          {t("presets.title")}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {Object.keys(presetConfigs).map((preset) => (
            <Chip
              key={preset}
              label={t(`presets.${preset}`)}
              variant={selectedPreset === preset ? "filled" : "outlined"}
              color={selectedPreset === preset ? "primary" : "default"}
              onClick={() => handlePresetChange(preset)}
              size="small"
              sx={{ cursor: "pointer", fontSize: "0.75rem" }}
            />
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
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link href="/" color="inherit">
            {t("common:home")}
          </Link>
          <Typography color="text.primary">{t("title")}</Typography>
        </Breadcrumbs>

        <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.5rem" } }}>
          {t("title")}
        </Typography>

        <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
          {t("subtitle")}
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
                <Typography variant="h5">{selectedItem.title}</Typography>
                <IconButton onClick={handleDialogClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedItem.purpose}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {t("dialog.whenToUse")}
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {selectedItem.whenToUse?.map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {t("dialog.steps")}
              </Typography>
              <List dense sx={{ mb: 3 }}>
                {selectedItem.steps?.map((step, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText primary={`${index + 1}. ${step}`} />
                  </ListItem>
                ))}
              </List>

              {selectedItem.resources && selectedItem.resources.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {t("dialog.resources")}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {selectedItem.resources.map((resource, index) => (
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
