'use client'

import {
  ArrowBack as ArrowBackIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  FiberManualRecord as CircleIcon,
  Close as CloseIcon,
  Explore as ExploreIcon,
  Handshake as HandshakeIcon,
  Info as InfoIcon,
  TipsAndUpdates as InsightsIcon,
  Loop as LoopIcon,
  Insights as SettingsIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import api from '../../../api'
import config from '../../../config'
import { ROUTES } from '../../../constants/constants'
import { trackEvent } from '../../../utils/analytics'
import {
  getItemImportance,
  methodologyGuideConfig,
  presetConfigs,
  staticStages,
} from './methodologyGuide.config'
import MethodologyGuideDialog from './MethodologyGuideDialog.component'

const stageIcons = {
  alignment: HandshakeIcon,
  setup: BuildIcon,
  implementation: LoopIcon,
}

const stageColors = {
  alignment: '#1b5993',
  setup: '#0a2239',
  implementation: '#fe5f55',
}

const MethodologyGuidePage = () => {
  const { t } = useTranslation('methodology.guide')
  const { data: session } = useSession()

  // State management
  const [selectedPreset, setSelectedPreset] = useState('startup')
  const [toggles, setToggles] = useState(presetConfigs.startup)
  const [selectedItem, setSelectedItem] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [snapshotDrawerOpen, setSnapshotDrawerOpen] = useState(false)
  const [snapshotFormData, setSnapshotFormData] = useState({
    name: '',
    email: '',
    internalStructure: '',
    roles: '',
    mainIssues: [],
    betaPilot: 'no',
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const router = useRouter()

  // Handle preset selection
  const handlePresetChange = (preset) => {
    if (preset && presetConfigs[preset]) {
      setSelectedPreset(preset)
      setToggles(presetConfigs[preset])
      trackEvent('methodology_guide_preset_selected', { preset })
    }
  }

  // Handle individual toggle changes
  const handleToggleChange = (aspect, value) => {
    setToggles((prev) => ({
      ...prev,
      [aspect]: value,
    }))
    trackEvent('methodology_guide_toggle_changed', { aspect, value })
  }

  // Handle item dialog - works for both enabled and disabled items
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setDialogOpen(true)
    const importance = getItemImportance(item, toggles)
    trackEvent('methodology_guide_item_opened', {
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

  const handleSnapshotDrawerOpen = () => {
    setSnapshotDrawerOpen(true)
    trackEvent('snapshot_drawer_opened', {
      event_category: 'engagement',
      event_label: 'snapshot_option_explored',
      value: 1000,
      currency: 'ARS',
    })
  }

  const handleSnapshotDrawerClose = () => {
    setSnapshotDrawerOpen(false)
    if (formSuccess) {
      setFormSuccess(false)
      setSnapshotFormData({
        name: '',
        email: '',
        internalStructure: '',
        roles: '',
        mainIssues: [],
        betaPilot: 'no',
      })
    }
  }

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false)
  }

  const handleSnapshotCtaClick = () => {
    handleSnapshotDrawerOpen()
  }

  // Handle Snapshot form field changes
  const handleSnapshotFormChange = (field, value) => {
    setSnapshotFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleIssueToggle = (issue) => {
    setSnapshotFormData((prev) => ({
      ...prev,
      mainIssues: prev.mainIssues.includes(issue)
        ? prev.mainIssues.filter((i) => i !== issue)
        : [...prev.mainIssues, issue],
    }))
  }

  // Handle Snapshot form submission
  const handleSnapshotFormSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitting(true)

    // Simulate API call - replace with actual submission
    await api.front.saveSurveyResponse(
      {
        name: snapshotFormData.name,
        email: snapshotFormData.email,
        internalStructure: snapshotFormData.internalStructure,
        roles: snapshotFormData.roles,
        mainIssues: snapshotFormData.mainIssues,
        betaPilot: snapshotFormData.betaPilot,
        toggles: toggles,
        selectedPreset: selectedPreset,
      },
      'snapshot_request_submitted'
    )

    trackEvent('snapshot_request_submitted', {
      event_category: 'engagement',
      event_label: 'snapshot_request_submitted',
      value: 10000,
      currency: 'ARS',
      conversion_intent: 'lead_generation',
    })

    api.front.wakeupMailingSvc()
    setFormSubmitting(false)
    setFormSuccess(true)
  }

  // Get module icon(s)
  const getModuleIcon = (module) => {
    if (module === 'both') {
      return (
        <Box className="module-icons-both">
          <ExploreIcon className="module-icon-compass" />
          <Box
            component="img"
            src="/logos/a6-blue.png"
            alt="AngoraSix"
            className="module-icon-platform"
          />
        </Box>
      )
    }

    switch (module) {
      case 'compass':
        return <ExploreIcon className="module-icon-compass" />
      case 'platform':
        return (
          <Box
            component="img"
            src="/logos/a6-blue.png"
            alt="AngoraSix"
            className="module-icon-platform"
          />
        )
      default:
        return null
    }
  }

  // Render importance indicator - always shows 3 circles
  const renderImportanceIndicator = (importance) => {
    const isEnabled = importance > 0

    // Determine importance level text
    let importanceLevel = ''
    if (importance === 1) importanceLevel = t('legend.low')
    else if (importance === 2) importanceLevel = t('legend.medium')
    else if (importance === 3) importanceLevel = t('legend.high')

    const indicatorContent = (
      <Box className="importance-indicator">
        {[1, 2, 3].map((level) => (
          <CircleIcon
            key={level}
            className={`importance-circle ${
              isEnabled && level <= importance ? 'filled' : 'empty'
            }`}
          />
        ))}
      </Box>
    )

    // Wrap in tooltip if enabled
    if (isEnabled && importanceLevel) {
      return (
        <Tooltip title={`${t('legend.importance')}: ${importanceLevel}`} arrow>
          {indicatorContent}
        </Tooltip>
      )
    }

    return indicatorContent
  }

  // Render mini item card
  const renderMiniItemCard = (item) => {
    const importance = getItemImportance(item, toggles)
    const isEnabled = importance > 0

    return (
      <Card
        key={item.key}
        className={`item-card ${isEnabled ? 'enabled' : 'disabled'}`}
        onClick={() => handleItemClick(item)}
      >
        <CardContent className="item-card-content">
          <Box className="item-card-inner">
            <Box className="item-card-header">
              <Typography variant="subtitle2" className="item-card-title">
                {t(`items.${item.key}.title`)}
              </Typography>
              <Box className="item-card-module">
                {item.module && getModuleIcon(item.module)}
              </Box>
            </Box>
            <Box className="item-card-importance">
              {renderImportanceIndicator(importance)}
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }

  const renderSnapshotSummary = () => (
    <Box className="snapshot-summary">
      <Typography variant="subtitle2" className="summary-title">
        {t('snapshot.summary.title')}
      </Typography>
      <Box className="summary-items">
        <Box className="summary-item">
          <Typography variant="caption" className="summary-label">
            {t('presets.title')}:
          </Typography>
          <Typography variant="body2" className="summary-value">
            {t(`presets.${selectedPreset}.label`)}
          </Typography>
        </Box>
        {Object.entries(toggles).map(([aspect, value]) => (
          <Box key={aspect} className="summary-item">
            <Typography variant="caption" className="summary-label">
              {t(`aspects.${aspect}.label`)}:
            </Typography>
            <Typography variant="body2" className="summary-value">
              {t(`aspects.${aspect}.options.${value}`)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )

  const renderSnapshotForm = () => {
    if (formSuccess) {
      return (
        <Box className="form-success">
          <CheckCircleIcon className="success-icon" />
          <Typography variant="h6">
            {t('snapshot.form.successTitle')}
          </Typography>
          <Typography variant="body2" className="snapshot-success-message">
            {t('snapshot.form.successMessage')}
          </Typography>
          <Box className="success-actions">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSnapshotDrawerClose}
              fullWidth
            >
              {t('snapshot.form.backToGuide')}
            </Button>
            <Box className="secondary-ctas">
              <Button
                variant="text"
                color="primary"
                onClick={() =>
                  router.push(`${ROUTES.services}?section=guidance&dialog=true`)
                }
                size="small"
              >
                {t('snapshot.form.learnAdvisory')}
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  if (session) {
                    router.push(ROUTES.projects.list)
                  } else {
                    router.push(`${ROUTES.auth.signin}?for=contributor`)
                  }
                }}
                size="small"
              >
                {t('snapshot.form.register')}
              </Button>
            </Box>
          </Box>
        </Box>
      )
    }

    const issueOptions = [
      'decisionMaking',
      'contributionRecognition',
      'rolesAccountability',
      'fairnessEquity',
      'participationEngagement',
      'communicationConflict',
      'other',
    ]

    return (
      <Box
        component="form"
        onSubmit={handleSnapshotFormSubmit}
        className="snapshot-form"
      >
        {/* Contact Section */}
        <Box className="form-section">
          <Typography className="section-title">
            {t('snapshot.form.contactInfo')}
          </Typography>
          <TextField
            fullWidth
            label={t('snapshot.form.nameLabel')}
            value={snapshotFormData.name}
            onChange={(e) =>
              setSnapshotFormData({ ...snapshotFormData, name: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label={t('snapshot.form.emailLabel')}
            type="email"
            value={snapshotFormData.email}
            onChange={(e) =>
              setSnapshotFormData({
                ...snapshotFormData,
                email: e.target.value,
              })
            }
            required
          />
        </Box>

        {/* Context Section */}
        <Box className="form-section">
          <Typography className="section-title">
            {t('snapshot.form.context')}
          </Typography>
          <TextField
            fullWidth
            label={t('snapshot.form.internalStructureLabel')}
            placeholder={t('snapshot.form.internalStructurePlaceholder')}
            value={snapshotFormData.internalStructure}
            onChange={(e) =>
              setSnapshotFormData({
                ...snapshotFormData,
                internalStructure: e.target.value,
              })
            }
            required
          />
          <TextField
            fullWidth
            label={t('snapshot.form.rolesLabel')}
            value={snapshotFormData.roles}
            onChange={(e) =>
              setSnapshotFormData({
                ...snapshotFormData,
                roles: e.target.value,
              })
            }
            multiline
            rows={2}
          />

          <Box className="issues-field">
            <Typography variant="body2" className="field-label">
              {t('snapshot.form.mainIssuesLabel')}
            </Typography>
            <Box className="issues-chips">
              {issueOptions.map((issue) => (
                <Chip
                  key={issue}
                  label={t(`snapshot.form.issues.${issue}`)}
                  onClick={() => handleIssueToggle(issue)}
                  color={
                    snapshotFormData.mainIssues.includes(issue)
                      ? 'primary'
                      : 'default'
                  }
                  variant={
                    snapshotFormData.mainIssues.includes(issue)
                      ? 'filled'
                      : 'outlined'
                  }
                  size="small"
                  className={
                    snapshotFormData.mainIssues.includes(issue)
                      ? 'selected'
                      : ''
                  }
                />
              ))}
            </Box>
          </Box>

          <FormControl fullWidth required>
            <Typography variant="body2" className="field-label">
              {t('snapshot.form.betaPilotLabel')}
            </Typography>
            <RadioGroup
              row
              value={snapshotFormData.betaPilot}
              onChange={(e) =>
                setSnapshotFormData({
                  ...snapshotFormData,
                  betaPilot: e.target.value,
                })
              }
              name="beta-pilot-group"
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={t('snapshot.form.betaPilotYes')}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={t('snapshot.form.betaPilotNo')}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          disabled={formSubmitting}
          className="submit-button"
        >
          {formSubmitting
            ? t('snapshot.form.submitting')
            : t('snapshot.form.submit')}
        </Button>
        <Typography variant="caption" className="drawer-privacy">
          {t('snapshot.drawer.privacy')}
        </Typography>
      </Box>
    )
  }

  const renderSnapshotCTA = () => (
    <Box className="snapshot-cta">
      <Box className="snapshot-cta-content">
        <Typography variant="h6" className="snapshot-cta-title">
          {t('snapshot.cta.title')}
        </Typography>
        <Typography variant="body2" className="snapshot-cta-description">
          {t('snapshot.cta.subtitle')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSnapshotCtaClick}
        className="snapshot-cta-button"
        startIcon={<InsightsIcon />}
      >
        {t('snapshot.cta.button')}
      </Button>
      <Typography variant="caption" className="snapshot-cta-microcopy">
        {t('snapshot.cta.microcopy')}
      </Typography>
    </Box>
  )

  // Render the controls panel
  const renderControlsPanel = () => (
    <Box className="controls-content">
      <Box className="controls-description">
        <Typography variant="body2">{t('controls.description')}</Typography>
      </Box>
      {/* Presets */}
      <Box className="presets-section">
        <Box className="presets-header">
          <Typography variant="h6" className="presets-title">
            {t('presets.title')}
          </Typography>
          <Tooltip title={t('presets.tooltip')} placement="top">
            <IconButton size="small" className="info-icon-button">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className="presets-chips">
          {Object.keys(presetConfigs).map((preset) => (
            <Tooltip
              key={preset}
              title={t(`presets.${preset}.tooltip`)}
              placement="top"
            >
              <Chip
                label={t(`presets.${preset}.label`)}
                variant={selectedPreset === preset ? 'filled' : 'outlined'}
                color={selectedPreset === preset ? 'primary' : 'default'}
                onClick={() => handlePresetChange(preset)}
                size="small"
                className={`preset-chip ${
                  selectedPreset === preset ? 'selected' : ''
                }`}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Toggles - Compressed */}
      <Box className="aspects-section">
        <Typography variant="h6" className="aspects-title">
          {t('aspects.title')}
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(methodologyGuideConfig.aspects).map(
            ([aspect, options]) => (
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
                      onChange={(e, value) =>
                        value && handleToggleChange(aspect, value)
                      }
                      size="small"
                      fullWidth
                      className="toggle-group"
                    >
                      {options.map((option) => (
                        <ToggleButton
                          key={option}
                          value={option}
                          className="toggle-button"
                        >
                          {t(`aspects.${aspect}.options.${option}`)}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>

      {/* Snapshot CTA section using unified component */}
      <Box className="snapshot-panel">
        <Divider sx={{ my: 2 }} />
        {renderSnapshotCTA()}
      </Box>
    </Box>
  )

  return (
    <>
      <Head>
        <title>{t('page.title')}</title>
        <meta name="description" content={t('page.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t('page.title')} />
        <meta
          property="og:description"
          key="og.description"
          content={t('page.description')}
        />
        <meta
          property="og:image"
          key="og.image"
          content={config.site.head.image.logoSquare}
        />
        <meta
          property="og:url"
          key="og.url"
          content="https://angorasix.com/methodology/guide"
        />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Box className="MethodologyGuidePage">
        {/* Hero Section */}
        <section className="guide-hero">
          <div className="hero-content">
            <Typography variant="h1" component="h1" className="hero-title">
              {t('title')}
            </Typography>

            <Box className="hero-description-container">
              <Typography variant="h6" className="hero-description">
                {t('subtitle1')}
              </Typography>
              <Typography variant="h6" className="hero-description">
                {t('subtitle2')}
              </Typography>
              <Typography variant="h6" className="hero-description">
                {t('subtitle3')}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              component="blockquote"
              className="hero-quote"
            >
              {t('quote')}
            </Typography>

            <Typography variant="body1" className="hero-microcopy">
              {t('microcopy')}
            </Typography>
          </div>
        </section>

        {/* Main Content */}
        <Container className="page-main-content">
          <Box className="clarification-block">
            {/* Utility Pill */}
            <Box className="utility-pill-container">
              <Paper elevation={2} className="utility-pill">
                <Typography variant="body2" className="utility-pill-text">
                  ⏱ {t('utilityPill.time')} · {t('utilityPill.noSignup')} ·{' '}
                  {t('utilityPill.realTime')}
                </Typography>
              </Paper>
            </Box>

            {/* Legend Panel */}
            <Paper elevation={1} className="legend-panel">
              <Box className="legend-content">
                <Typography variant="subtitle2" className="legend-title">
                  {t('legend.title')}
                </Typography>
                <Box className="legend-items">
                  <Box className="legend-item">
                    <Box className="importance-indicator">
                      <CircleIcon className="importance-circle filled" />
                      <CircleIcon className="importance-circle empty" />
                      <CircleIcon className="importance-circle empty" />
                    </Box>
                    <Typography variant="body2">{t('legend.low')}</Typography>
                  </Box>
                  <Box className="legend-item">
                    <Box className="importance-indicator">
                      <CircleIcon className="importance-circle filled" />
                      <CircleIcon className="importance-circle filled" />
                      <CircleIcon className="importance-circle empty" />
                    </Box>
                    <Typography variant="body2">
                      {t('legend.medium')}
                    </Typography>
                  </Box>
                  <Box className="legend-item">
                    <Box className="importance-indicator">
                      <CircleIcon className="importance-circle filled" />
                      <CircleIcon className="importance-circle filled" />
                      <CircleIcon className="importance-circle filled" />
                    </Box>
                    <Typography variant="body2">{t('legend.high')}</Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  className="legend-mobile-instruction"
                >
                  {t('legend.mobileInstruction')}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Grid container spacing={4}>
            {/* Left Column - Stages (Desktop: 8/12, Mobile: 12/12) */}
            <Grid item xs={12} md={8}>
              {staticStages.map((stage) => {
                const StageIcon = stageIcons[stage.key]
                const stageColor = stageColors[stage.key]

                return (
                  <Paper
                    key={stage.key}
                    elevation={1}
                    className={`stage-card stage-${stage.key}`}
                  >
                    <Box className="stage-header">
                      <StageIcon
                        className="stage-icon"
                        style={{ color: stageColor }}
                      />
                      <Typography
                        variant="h5"
                        className="stage-title"
                        style={{ color: stageColor }}
                      >
                        {t(`stages.${stage.key}.title`)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="stage-description">
                      {t(`stages.${stage.key}.description`)}
                    </Typography>
                    <Box className="stage-items">
                      {stage.items.map((item) => renderMiniItemCard(item))}
                    </Box>
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

        {/* Mobile FAB */}
        <Fab className="mobile-fab" onClick={() => setMobileDrawerOpen(true)}>
          <SettingsIcon />
        </Fab>

        <Drawer
          anchor="bottom"
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerClose}
          className="mobile-drawer MethodologyGuidePage"
        >
          <Box className="mobile-drawer-content">
            <Box className="mobile-drawer-header">
              <Typography variant="h6">{t('controls.title')}</Typography>
              <IconButton onClick={handleMobileDrawerClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Controls Panel */}
            {renderControlsPanel()}
          </Box>
        </Drawer>

        {/* Snapshot Drawer */}
        <Drawer
          anchor="right"
          open={snapshotDrawerOpen}
          onClose={handleSnapshotDrawerClose}
          className="snapshot-drawer"
        >
          <Box className="snapshot-drawer-content">
            <Box className="snapshot-drawer-header">
              <IconButton
                onClick={handleSnapshotDrawerClose}
                className="back-button"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" className="drawer-title">
                {t('snapshot.drawer.title')}
              </Typography>
              <IconButton onClick={handleSnapshotDrawerClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {!formSuccess && (
              <Box className="snapshot-drawer-description">
                <Typography variant="body2" className="drawer-description">
                  {t('snapshot.drawer.description')}
                </Typography>
                <ul>
                  <Typography
                    variant="body2"
                    className="drawer-description-item"
                  >
                    <li>{t('snapshot.drawer.item1')}</li>
                  </Typography>
                  <Typography
                    variant="body2"
                    className="drawer-description-item"
                  >
                    <li>{t('snapshot.drawer.item2')}</li>
                  </Typography>
                  <Typography
                    variant="body2"
                    className="drawer-description-item"
                  >
                    <li>{t('snapshot.drawer.item3')}</li>
                  </Typography>
                  <Typography
                    variant="body2"
                    className="drawer-description-item"
                  >
                    <li>{t('snapshot.drawer.item4')}</li>
                  </Typography>
                  <Typography
                    variant="body2"
                    className="drawer-description-item"
                  >
                    <li>{t('snapshot.drawer.item5')}</li>
                  </Typography>
                </ul>
              </Box>
            )}
            {!formSuccess && renderSnapshotSummary()}
            {renderSnapshotForm()}
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
