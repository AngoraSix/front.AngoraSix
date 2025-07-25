"use client"

import {
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Container,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import config from "../../../config"

const NewProjectManagement = ({ onSubmit, project }) => {
  const { t } = useTranslation("management.new")
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Setup
    projectName: "",
    status: "STARTUP",

    // Step 2 - Ownership & Governance
    ownershipSetup: "angorasix",
    startupTasksEnabled: true,
    startupTasksFading: true,
    startupFadingPeriod: 30,
    startupFadingPattern: "LINEAR_DOWN",
    regularFadingPeriod: 3,
    regularFadingPattern: "LINEAR_DOWN",
    coordinationCircleEnabled: true,
    ownershipVotingLimit: 35,
    decisionQuorum: 1,

    // Step 3 - Finances & Retribution
    financialSetup: "angorasix",
    profitSharingEnabled: true,
    profitPayoutStrategy: "vesting",
    profitVestingPeriod: 3,
    profitVestingPattern: "LINEAR_DOWN",
    supportedCurrencies: ["USD"],
    generalVsPerCurrency: false,
    distributionTriggerType: "TOTAL_INCOME_THRESHOLD",
    distributionTriggerAmount: 50000,
    distributionTriggerCurrency: "USD",
    reEvaluationFrequency: "EVERY_YEAR",
  })

  const [errors, setErrors] = useState({})
  const [expandedAccordions, setExpandedAccordions] = useState({
    ownershipAdvanced: false,
    financialAdvanced: false,
  })

  const bylawCategories = config.mgmtConfig.categories
  const bylawOwnershipKeys = config.mgmtConfig.ownershipBylaws
  const bylawFinancialKeys = config.mgmtConfig.financialBylaws

  const steps = [t("stepper.basicSetup"), t("stepper.ownershipGovernance"), t("stepper.financesRetribution")]

  const stageOptions = [
    { value: "IDEA", label: t("stages.idea") },
    { value: "STARTUP", label: t("stages.startup") },
    { value: "OPERATIONAL", label: t("stages.operational") },
  ]

  const fadingPatterns = [
    {
      id: "LINEAR_DOWN",
      name: t("patterns.linearDown.name"),
      description: t("patterns.linearDown.desc"),
      image: "/images/resources/linear-down.png",
    },
    {
      id: "LINEAR_UP",
      name: t("patterns.linearUp.name"),
      description: t("patterns.linearUp.desc"),
      image: "/images/resources/linear-up.png",
    },
    {
      id: "UNIFORM",
      name: t("patterns.uniform.name"),
      description: t("patterns.uniform.desc"),
      image: "/images/resources/linear-up-down.png",
    },
  ]

  const currencyOptions = ["USD", "EUR", "ETH", "BTC", "ARS", "GBP", "JPY", "CAD", "AUD"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleAccordionToggle = (accordion) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [accordion]: !prev[accordion],
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 0) {
      if (!formData.projectName.trim()) {
        newErrors.projectName = t("validation.projectNameRequired")
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Transform form data to match the expected API structure
      const transformedData = {
        name: formData.projectName,
        status: formData.status,
        bylaws: {
          [bylawCategories.ownershipGeneral]: {
            [bylawOwnershipKeys.isOwnershipA6Managed]: formData.ownershipSetup === "angorasix",
          },
          [bylawCategories.ownershipTasks]: {
            [bylawOwnershipKeys.startupTasksEnabled]: formData.startupTasksEnabled,
            [bylawOwnershipKeys.startupTasksFadingEnabled]: formData.startupTasksFading,
            [bylawOwnershipKeys.startupRetributionPeriod]: `P${formData.startupFadingPeriod}Y`,
            [bylawOwnershipKeys.startupRetributionPattern]: formData.startupFadingPattern,
            [bylawOwnershipKeys.regularRetributionPeriod]: `P${formData.regularFadingPeriod}Y`,
            [bylawOwnershipKeys.regularRetributionPattern]: formData.regularFadingPattern,
          },
          [bylawCategories.ownershipGovernance]: {
            [bylawOwnershipKeys.coordinationCircleEnabled]: formData.coordinationCircleEnabled,
            [bylawOwnershipKeys.ownershipVotingLimit]: formData.ownershipVotingLimit,
            [bylawOwnershipKeys.decisionMinimumQuorum]: formData.decisionQuorum,
          },
          [bylawCategories.financialProfitShares]: {
            [bylawFinancialKeys.profitSharesEnabled]: formData.profitSharingEnabled,
            [bylawFinancialKeys.profitSharesVestingEnabled]: formData.profitPayoutStrategy === "vesting",
            [bylawFinancialKeys.profitSharesVestingPeriod]:
              formData.profitPayoutStrategy === "vesting" ? "MATCH_OWNERSHIP_FADING" : "IMMEDIATE",
            [bylawFinancialKeys.profitSharesVestingPattern]: formData.profitVestingPattern,
          },
          [bylawCategories.financialCurrencies]: {
            [bylawFinancialKeys.financialCurrencies]: formData.supportedCurrencies,
            [bylawFinancialKeys.currencyVestingEnabled]: formData.profitPayoutStrategy === "vesting",
            [bylawFinancialKeys.currencyVestingPeriod]:
              formData.profitPayoutStrategy === "vesting" ? "MATCH_OWNERSHIP_FADING" : "IMMEDIATE",
            [bylawFinancialKeys.currencyVestingPattern]: formData.profitVestingPattern,
          },
          [bylawCategories.financialGeneral]: {
            [bylawFinancialKeys.isFinancialA6Managed]: formData.financialSetup === "angorasix",
            [bylawFinancialKeys.earningDistributionTriggerType]: formData.distributionTriggerType,
            [bylawFinancialKeys.earningDistributionTriggerAmount]: formData.distributionTriggerAmount,
            [bylawFinancialKeys.earningDistributionTriggerCurrency]: formData.distributionTriggerCurrency,
            [bylawFinancialKeys.earningDistributionReviewFrequency]: formData.reEvaluationFrequency,
          },
        },
      }

      onSubmit(transformedData)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicSetup()
      case 1:
        return renderOwnershipGovernance()
      case 2:
        return renderFinancesRetribution()
      default:
        return null
    }
  }

  const renderBasicSetup = () => (
    <div className="step-content">
      <Typography variant="h4" className="step-title">
        {t("steps.basicSetup.title")}
      </Typography>
      <Typography variant="body1" className="step-description">
        {t("steps.basicSetup.description")}
      </Typography>

      <div className="basic-setup-form">
        <div className="form-fields-container">
          <TextField
            fullWidth
            label={t("fields.projectName")}
            placeholder={t("placeholders.projectName")}
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            error={!!errors.projectName}
            helperText={errors.projectName}
            required
            className="project-name-field"
            variant="outlined"
          />

          <FormControl fullWidth className="status-field">
            <InputLabel>{t("fields.status")}</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              label={t("fields.status")}
            >
              {stageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )

  const renderOwnershipGovernance = () => (
    <div className="step-content">
      <Typography variant="h4" className="step-title">
        {t("steps.ownershipGovernance.title")}
      </Typography>
      <Typography variant="body1" className="step-description">
        {t("steps.ownershipGovernance.description")}
      </Typography>

      <div className="ownership-setup">
        {/* Primary AngoraSix Option */}
        <div className="primary-option-container">
          <div
            className={`primary-option-card ${formData.ownershipSetup === "angorasix" ? "active" : ""}`}
            onClick={() => handleInputChange("ownershipSetup", "angorasix")}
          >
            <div className="primary-card-header">
              <AccountBalanceIcon className="primary-card-icon" />
              <div className="primary-card-content">
                <Typography variant="h5" className="primary-card-title">
                  {t("options.ownershipSetup.angorasix")}
                </Typography>
                <Typography variant="body1" className="primary-card-subtitle">
                  {t("options.ownershipSetup.recommended")}
                </Typography>
              </div>
              <div className="primary-card-badge">
                <Typography variant="caption">{t("labels.recommended")}</Typography>
              </div>
            </div>
            <Typography variant="body1" className="primary-card-description">
              {t("options.ownershipSetup.angorasixDesc")}
            </Typography>
            <div className="primary-card-features">
              <Typography variant="body2">✓ {t("features.ownership.tracking")}</Typography>
              <Typography variant="body2">✓ {t("features.ownership.automation")}</Typography>
              <Typography variant="body2">✓ {t("features.ownership.governance")}</Typography>
            </div>
          </div>

          {/* Opt-out Option */}
          <div className="opt-out-section">
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleInputChange("ownershipSetup", "external")}
              className={`opt-out-button ${formData.ownershipSetup === "external" ? "active" : ""}`}
              startIcon={<BusinessIcon />}
            >
              {t("options.ownershipSetup.optOut")}
            </Button>
            {formData.ownershipSetup === "external" && (
              <div className="opt-out-message">
                <Typography variant="body2" color="textSecondary">
                  {t("options.ownershipSetup.externalDesc")}
                </Typography>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Configuration - Separate Panel */}
        {formData.ownershipSetup === "angorasix" && (
          <Paper className="advanced-settings-panel">
            <Accordion
              expanded={expandedAccordions.ownershipAdvanced}
              onChange={() => handleAccordionToggle("ownershipAdvanced")}
              className="advanced-accordion"
            >
              <AccordionSummary
                expandIcon={expandedAccordions.ownershipAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className="advanced-accordion-summary"
              >
                <SettingsIcon className="accordion-icon" />
                <div className="accordion-header-content">
                  <Typography variant="h6">{t("accordions.advancedOwnership")}</Typography>
                  <Typography variant="body2" className="accordion-subtitle">
                    {t("accordions.advancedOwnershipDesc")}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className="advanced-accordion-details">
                {renderOwnershipAdvancedSettings()}
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}
      </div>
    </div>
  )

  const renderOwnershipAdvancedSettings = () => (
    <div className="advanced-settings">
      <div className="settings-section">
        <div className="section-header">
          <Typography variant="h6">{t("sections.ownershipViaTasks")}</Typography>
          <Tooltip title={t("tooltips.ownershipViaTasks")} arrow>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>

        <FormControlLabel
          control={
            <Switch
              checked={formData.startupTasksEnabled}
              onChange={(e) => handleInputChange("startupTasksEnabled", e.target.checked)}
            />
          }
          label={t("fields.startupTasks")}
          className="form-field"
        />

        {formData.startupTasksEnabled && (
          <div className="startup-settings">
            <FormControlLabel
              control={
                <Switch
                  checked={formData.startupTasksFading}
                  onChange={(e) => handleInputChange("startupTasksFading", e.target.checked)}
                />
              }
              label={t("fields.startupFading")}
            />

            {formData.startupTasksFading && (
              <Grid container spacing={3} className="fading-settings">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label={t("fields.fadingPeriod")}
                    value={formData.startupFadingPeriod}
                    onChange={(e) => handleInputChange("startupFadingPeriod", Number.parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="pattern-selector-compact">
                    <Typography variant="subtitle1">{t("fields.fadingPattern")}</Typography>
                    <div className="pattern-options-compact">
                      {fadingPatterns.map((pattern) => (
                        <div
                          key={pattern.id}
                          className={`pattern-option-compact ${formData.startupFadingPattern === pattern.id ? "selected" : ""}`}
                          onClick={() => handleInputChange("startupFadingPattern", pattern.id)}
                        >
                          <div className="pattern-image-compact">
                            <Image
                              src={pattern.image || "/placeholder.svg"}
                              alt={pattern.name}
                              width={30}
                              height={20}
                            />
                          </div>
                          <Typography variant="caption">{pattern.name}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        )}

        <div className="regular-tasks-settings">
          <Typography variant="subtitle1" className="subsection-title">
            {t("sections.regularTasks")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label={t("fields.regularFadingPeriod")}
                value={formData.regularFadingPeriod}
                onChange={(e) => handleInputChange("regularFadingPeriod", Number.parseInt(e.target.value))}
                InputProps={{ inputProps: { min: 1, max: 20 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="pattern-selector-compact">
                <Typography variant="subtitle1">{t("fields.fadingPattern")}</Typography>
                <div className="pattern-options-compact">
                  {fadingPatterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className={`pattern-option-compact ${formData.regularFadingPattern === pattern.id ? "selected" : ""}`}
                      onClick={() => handleInputChange("regularFadingPattern", pattern.id)}
                    >
                      <div className="pattern-image-compact">
                        <Image src={pattern.image || "/placeholder.svg"} alt={pattern.name} width={30} height={20} />
                      </div>
                      <Typography variant="caption">{pattern.name}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Typography variant="h6">{t("sections.governance")}</Typography>
          <Tooltip title={t("tooltips.governance")} arrow>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.coordinationCircleEnabled}
                  onChange={(e) => handleInputChange("coordinationCircleEnabled", e.target.checked)}
                />
              }
              label={t("fields.coordinationCircle")}
            />

            <div className="slider-field">
              <Typography variant="subtitle1">
                {t("fields.ownershipVotingLimit")}: {formData.ownershipVotingLimit}%
              </Typography>
              <Slider
                value={formData.ownershipVotingLimit}
                onChange={(e, value) => handleInputChange("ownershipVotingLimit", value)}
                min={1}
                max={50}
                step={1}
                marks
                valueLabelDisplay="auto"
                className="ownership-slider"
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label={t("fields.decisionQuorum")}
              value={formData.decisionQuorum}
              onChange={(e) => handleInputChange("decisionQuorum", Number.parseInt(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 20 } }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )

  const renderFinancesRetribution = () => (
    <div className="step-content">
      <Typography variant="h4" className="step-title">
        {t("steps.financesRetribution.title")}
      </Typography>
      <Typography variant="body1" className="step-description">
        {t("steps.financesRetribution.description")}
      </Typography>

      <div className="financial-setup">
        {/* Primary AngoraSix Option */}
        <div className="primary-option-container">
          <div
            className={`primary-option-card ${formData.financialSetup === "angorasix" ? "active" : ""}`}
            onClick={() => handleInputChange("financialSetup", "angorasix")}
          >
            <div className="primary-card-header">
              <PaymentIcon className="primary-card-icon" />
              <div className="primary-card-content">
                <Typography variant="h5" className="primary-card-title">
                  {t("options.financialSetup.angorasix")}
                </Typography>
                <Typography variant="body1" className="primary-card-subtitle">
                  {t("options.financialSetup.recommended")}
                </Typography>
              </div>
              <div className="primary-card-badge">
                <Typography variant="caption">{t("labels.recommended")}</Typography>
              </div>
            </div>
            <Typography variant="body1" className="primary-card-description">
              {t("options.financialSetup.angorasixDesc")}
            </Typography>
            <div className="primary-card-features">
              <Typography variant="body2">✓ {t("features.financial.wallet")}</Typography>
              <Typography variant="body2">✓ {t("features.financial.automation")}</Typography>
              <Typography variant="body2">✓ {t("features.financial.distribution")}</Typography>
            </div>
          </div>

          {/* Opt-out Option */}
          <div className="opt-out-section">
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleInputChange("financialSetup", "external")}
              className={`opt-out-button ${formData.financialSetup === "external" ? "active" : ""}`}
              startIcon={<BusinessIcon />}
            >
              {t("options.financialSetup.optOut")}
            </Button>
            {formData.financialSetup === "external" && (
              <div className="opt-out-message">
                <Typography variant="body2" color="textSecondary">
                  {t("options.financialSetup.externalDesc")}
                </Typography>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Configuration - Separate Panel */}
        {formData.financialSetup === "angorasix" && (
          <Paper className="advanced-settings-panel">
            <Accordion
              expanded={expandedAccordions.financialAdvanced}
              onChange={() => handleAccordionToggle("financialAdvanced")}
              className="advanced-accordion"
            >
              <AccordionSummary
                expandIcon={expandedAccordions.financialAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className="advanced-accordion-summary"
              >
                <SettingsIcon className="accordion-icon" />
                <div className="accordion-header-content">
                  <Typography variant="h6">{t("accordions.advancedFinancial")}</Typography>
                  <Typography variant="body2" className="accordion-subtitle">
                    {t("accordions.advancedFinancialDesc")}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails className="advanced-accordion-details">
                {renderFinancialAdvancedSettings()}
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}
      </div>
    </div>
  )

  const renderFinancialAdvancedSettings = () => (
    <div className="advanced-settings">
      <div className="settings-section">
        <div className="section-header">
          <Typography variant="h6">{t("sections.profitSharing")}</Typography>
          <Tooltip title={t("tooltips.profitSharing")} arrow>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>

        <FormControlLabel
          control={
            <Switch
              checked={formData.profitSharingEnabled}
              onChange={(e) => handleInputChange("profitSharingEnabled", e.target.checked)}
            />
          }
          label={t("fields.profitSharing")}
        />

        {formData.profitSharingEnabled && (
          <div className="profit-settings">
            <div className="payout-strategy">
              <Typography variant="subtitle1">{t("fields.payoutStrategy")}</Typography>
              <div className="strategy-options">
                <div
                  className={`strategy-option ${formData.profitPayoutStrategy === "vesting" ? "active" : ""}`}
                  onClick={() => handleInputChange("profitPayoutStrategy", "vesting")}
                >
                  <TrendingUpIcon className="strategy-icon" />
                  <Typography variant="body2">{t("options.payoutStrategy.vesting")}</Typography>
                </div>
                <div
                  className={`strategy-option ${formData.profitPayoutStrategy === "immediate" ? "active" : ""}`}
                  onClick={() => handleInputChange("profitPayoutStrategy", "immediate")}
                >
                  <PaymentIcon className="strategy-icon" />
                  <Typography variant="body2">{t("options.payoutStrategy.immediate")}</Typography>
                </div>
              </div>
            </div>

            {formData.profitPayoutStrategy === "vesting" && (
              <Grid container spacing={3} className="vesting-settings">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label={t("fields.vestingPeriod")}
                    value={formData.profitVestingPeriod}
                    onChange={(e) => handleInputChange("profitVestingPeriod", Number.parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 1, max: 20 } }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="pattern-selector-compact">
                    <Typography variant="subtitle1">{t("fields.vestingPattern")}</Typography>
                    <div className="pattern-options-compact">
                      {fadingPatterns.map((pattern) => (
                        <div
                          key={pattern.id}
                          className={`pattern-option-compact ${formData.profitVestingPattern === pattern.id ? "selected" : ""}`}
                          onClick={() => handleInputChange("profitVestingPattern", pattern.id)}
                        >
                          <div className="pattern-image-compact">
                            <Image
                              src={pattern.image || "/placeholder.svg"}
                              alt={pattern.name}
                              width={30}
                              height={20}
                            />
                          </div>
                          <Typography variant="caption">{pattern.name}</Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        )}
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Typography variant="h6">{t("sections.currencies")}</Typography>
          <Tooltip title={t("tooltips.currencies")} arrow>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="currency-selection">
          <Typography variant="subtitle1">{t("fields.supportedCurrencies")}</Typography>
          <div className="currency-chips">
            {currencyOptions.map((currency) => (
              <Chip
                key={currency}
                label={currency}
                clickable
                color={formData.supportedCurrencies.includes(currency) ? "primary" : "default"}
                onClick={() => {
                  const newCurrencies = formData.supportedCurrencies.includes(currency)
                    ? formData.supportedCurrencies.filter((c) => c !== currency)
                    : [...formData.supportedCurrencies, currency]
                  handleInputChange("supportedCurrencies", newCurrencies)
                }}
                className="currency-chip"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Typography variant="h6">{t("sections.distributionTrigger")}</Typography>
          <Tooltip title={t("tooltips.distributionTrigger")} arrow>
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{t("fields.triggerType")}</InputLabel>
              <Select
                value={formData.distributionTriggerType}
                onChange={(e) => handleInputChange("distributionTriggerType", e.target.value)}
                label={t("fields.triggerType")}
              >
                <MenuItem value="TOTAL_INCOME_THRESHOLD">{t("triggerTypes.totalIncome")}</MenuItem>
                <MenuItem value="MONTHLY_AVERAGE_THRESHOLD">{t("triggerTypes.monthlyAverage")}</MenuItem>
                <MenuItem value="MONTHLY_PER_CONTRIBUTOR">{t("triggerTypes.monthlyPerContributor")}</MenuItem>
                <MenuItem value="AUTOMATIC_YEARLY">{t("triggerTypes.automaticYearly")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formData.distributionTriggerType !== "AUTOMATIC_YEARLY" && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label={t("fields.triggerAmount")}
                  value={formData.distributionTriggerAmount}
                  onChange={(e) => handleInputChange("distributionTriggerAmount", Number.parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>{t("fields.currency")}</InputLabel>
                  <Select
                    value={formData.distributionTriggerCurrency}
                    onChange={(e) => handleInputChange("distributionTriggerCurrency", e.target.value)}
                    label={t("fields.currency")}
                  >
                    {formData.supportedCurrencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{t("fields.reEvaluationFrequency")}</InputLabel>
              <Select
                value={formData.reEvaluationFrequency}
                onChange={(e) => handleInputChange("reEvaluationFrequency", e.target.value)}
                label={t("fields.reEvaluationFrequency")}
              >
                <MenuItem value="EVERY_6_MONTHS">{t("frequencies.every6Months")}</MenuItem>
                <MenuItem value="EVERY_YEAR">{t("frequencies.everyYear")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
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
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <div className="new-project-management">
        <Container maxWidth="lg" className="main-container">
          <div className="header-section">
            <Typography variant="h2" className="main-title">
              {project?.name ? t("titleForProject").replace("{{projectName}}", project.name) : t("title")}
            </Typography>
            <Typography variant="h5" className="main-subtitle">
              {t("subtitle")}
            </Typography>
          </div>

          <Paper className="stepper-container">
            <Stepper activeStep={activeStep} className="stepper" orientation="horizontal">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={({ active, completed }) => (
                      <div className={`step-icon ${active ? "active" : ""} ${completed ? "completed" : ""}`}>
                        {completed ? <CheckCircleIcon /> : index + 1}
                      </div>
                    )}
                  >
                    <span className="step-label">{label}</span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <div className="step-content-container">
              <Fade in key={activeStep}>
                <div>{renderStepContent(activeStep)}</div>
              </Fade>
            </div>

            <div className="step-actions">
              <Button disabled={activeStep === 0} onClick={handleBack} className="back-button">
                {t("actions.back")}
              </Button>
              <div className="spacer" />
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" onClick={handleSubmit} className="submit-button">
                  {t("actions.createProject")}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext} className="next-button">
                  {t("actions.next")}
                </Button>
              )}
            </div>
          </Paper>
        </Container>
      </div>
    </>
  )
}

NewProjectManagement.defaultProps = {
  onSubmit: () => {},
}

export default NewProjectManagement
