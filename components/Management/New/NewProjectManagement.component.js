"use client"

import {
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Payment as PaymentIcon,
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
    ownershipSetup: "angorasix",
    financialSetup: "angorasix",

    // Step 2 - Ownership & Governance
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
  const [expandedAccordions, setExpandedAccordions] = useState({})

  const bylawCategories = config.mgmtConfig.categories;
  const bylawOwnershipKeys = config.mgmtConfig.ownershipBylaws;
  const bylawFinancialKeys = config.mgmtConfig.financialBylaws;

  const steps = [t("stepper.basicSetup"), t("stepper.ownershipGovernance"), t("stepper.financesRetribution")]

  const stageOptions = [
    { value: "IDEA", label: t("stages.idea") },
    { value: "STARTUP", label: t("stages.startup") },
    { value: "OPERATIONAL", label: t("stages.live") },]

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
            [bylawFinancialKeys.currencyVestingPeriod]: formData.profitPayoutStrategy === "vesting" ? "MATCH_OWNERSHIP_FADING" : "IMMEDIATE",
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
      <Typography variant="h5" className="step-title">
        {t("steps.basicSetup.title")}
      </Typography>
      <Typography variant="body1" className="step-description">
        {t("steps.basicSetup.description")}
      </Typography>

      <div className="form-section">
        {/* Project Name and Stage - Side by side on desktop */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label={t("fields.projectName")}
              value={formData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              error={!!errors.projectName}
              helperText={errors.projectName}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>{t("fields.status")}</InputLabel>
              <Select
                value={formData.currentStage}
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
          </Grid>
        </Grid>

        {/* Ownership and Financial Setup - Side by side on desktop */}
        <Grid container spacing={3} className="setup-toggles">
          <Grid item xs={12} lg={6}>
            <div className="toggle-section">
              <div className="toggle-header">
                <Typography variant="h6">{t("fields.ownershipSetup")}</Typography>
                <Tooltip title={t("tooltips.ownershipSetup")} arrow>
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="toggle-options vertical">
                <div
                  className={`toggle-option ${formData.ownershipSetup === "angorasix" ? "active" : ""}`}
                  onClick={() => handleInputChange("ownershipSetup", "angorasix")}
                >
                  <AccountBalanceIcon className="toggle-icon" />
                  <div className="toggle-content">
                    <Typography variant="subtitle1">{t("options.ownershipSetup.angorasix")}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t("options.ownershipSetup.angorasixDesc")}
                    </Typography>
                  </div>
                </div>
                <div
                  className={`toggle-option ${formData.ownershipSetup === "external" ? "active" : ""}`}
                  onClick={() => handleInputChange("ownershipSetup", "external")}
                >
                  <BusinessIcon className="toggle-icon" />
                  <div className="toggle-content">
                    <Typography variant="subtitle1">{t("options.ownershipSetup.external")}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t("options.ownershipSetup.externalDesc")}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={6}>
            <div className="toggle-section">
              <div className="toggle-header">
                <Typography variant="h6">{t("fields.financialSetup")}</Typography>
                <Tooltip title={t("tooltips.financialSetup")} arrow>
                  <IconButton size="small">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="toggle-options vertical">
                <div
                  className={`toggle-option ${formData.financialSetup === "angorasix" ? "active" : ""}`}
                  onClick={() => handleInputChange("financialSetup", "angorasix")}
                >
                  <PaymentIcon className="toggle-icon" />
                  <div className="toggle-content">
                    <Typography variant="subtitle1">{t("options.financialSetup.angorasix")}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t("options.financialSetup.angorasixDesc")}
                    </Typography>
                  </div>
                </div>
                <div
                  className={`toggle-option ${formData.financialSetup === "external" ? "active" : ""}`}
                  onClick={() => handleInputChange("financialSetup", "external")}
                >
                  <BusinessIcon className="toggle-icon" />
                  <div className="toggle-content">
                    <Typography variant="subtitle1">{t("options.financialSetup.external")}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t("options.financialSetup.externalDesc")}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )

  const renderOwnershipGovernance = () => {
    if (formData.ownershipSetup !== "angorasix") {
      return (
        <div className="step-content">
          <Typography variant="h5" className="step-title">
            {t("steps.ownershipGovernance.title")}
          </Typography>
          <Typography variant="body1" className="step-description">
            {t("steps.ownershipGovernance.externalMessage")}
          </Typography>
        </div>
      )
    }

    return (
      <div className="step-content">
        <Typography variant="h5" className="step-title">
          {t("steps.ownershipGovernance.title")}
        </Typography>
        <Typography variant="body1" className="step-description">
          {t("steps.ownershipGovernance.description")}
        </Typography>

        <div className="form-section">
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
            <Accordion
              expanded={expandedAccordions.startupSettings}
              onChange={() => handleAccordionToggle("startupSettings")}
              className="settings-accordion"
            >
              <AccordionSummary
                expandIcon={expandedAccordions.startupSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className="accordion-summary"
              >
                <Typography>{t("accordions.startupSettings")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="accordion-content">
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
                    <>
                      <TextField
                        fullWidth
                        type="number"
                        label={t("fields.fadingPeriod")}
                        value={formData.startupFadingPeriod}
                        onChange={(e) => handleInputChange("startupFadingPeriod", Number.parseInt(e.target.value))}
                        className="form-field"
                        InputProps={{ inputProps: { min: 1, max: 100 } }}
                      />

                      <div className="pattern-selector">
                        <Typography variant="subtitle1" className="pattern-title">
                          {t("fields.fadingPattern")}
                        </Typography>
                        <div className="pattern-options">
                          {fadingPatterns.map((pattern) => (
                            <div
                              key={pattern.id}
                              className={`pattern-option ${formData.startupFadingPattern === pattern.id ? "selected" : ""}`}
                              onClick={() => handleInputChange("startupFadingPattern", pattern.id)}
                            >
                              <div className="pattern-image">
                                <Image
                                  src={pattern.image || "/placeholder.svg"}
                                  alt={pattern.name}
                                  width={50}
                                  height={30}
                                />
                              </div>
                              <Typography variant="subtitle2">{pattern.name}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {pattern.description}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          )}

          <div className="regular-tasks-section">
            <Typography variant="subtitle1" className="section-subtitle">
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
            </Grid>

            <div className="pattern-selector">
              <Typography variant="subtitle1" className="pattern-title">
                {t("fields.fadingPattern")}
              </Typography>
              <div className="pattern-options">
                {fadingPatterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className={`pattern-option ${formData.regularFadingPattern === pattern.id ? "selected" : ""}`}
                    onClick={() => handleInputChange("regularFadingPattern", pattern.id)}
                  >
                    <div className="pattern-image">
                      <Image src={pattern.image || "/placeholder.svg"} alt={pattern.name} width={50} height={30} />
                    </div>
                    <Typography variant="subtitle2">{pattern.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {pattern.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                className="form-field"
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
  }

  const renderFinancesRetribution = () => {
    if (formData.financialSetup !== "angorasix") {
      return (
        <div className="step-content">
          <Typography variant="h5" className="step-title">
            {t("steps.financesRetribution.title")}
          </Typography>
          <Typography variant="body1" className="step-description">
            {t("steps.financesRetribution.externalMessage")}
          </Typography>
        </div>
      )
    }

    return (
      <div className="step-content">
        <Typography variant="h5" className="step-title">
          {t("steps.financesRetribution.title")}
        </Typography>
        <Typography variant="body1" className="step-description">
          {t("steps.financesRetribution.description")}
        </Typography>

        <div className="form-section">
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
            className="form-field"
          />

          {formData.profitSharingEnabled && (
            <Accordion
              expanded={expandedAccordions.profitSettings}
              onChange={() => handleAccordionToggle("profitSettings")}
              className="settings-accordion"
            >
              <AccordionSummary
                expandIcon={expandedAccordions.profitSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className="accordion-summary"
              >
                <Typography>{t("accordions.profitSettings")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="accordion-content">
                  <div className="toggle-section">
                    <Typography variant="subtitle1">{t("fields.payoutStrategy")}</Typography>
                    <div className="toggle-options horizontal">
                      <div
                        className={`toggle-option ${formData.profitPayoutStrategy === "vesting" ? "active" : ""}`}
                        onClick={() => handleInputChange("profitPayoutStrategy", "vesting")}
                      >
                        <TrendingUpIcon className="toggle-icon" />
                        <Typography variant="body2">{t("options.payoutStrategy.vesting")}</Typography>
                      </div>
                      <div
                        className={`toggle-option ${formData.profitPayoutStrategy === "immediate" ? "active" : ""}`}
                        onClick={() => handleInputChange("profitPayoutStrategy", "immediate")}
                      >
                        <PaymentIcon className="toggle-icon" />
                        <Typography variant="body2">{t("options.payoutStrategy.immediate")}</Typography>
                      </div>
                    </div>
                  </div>

                  {formData.profitPayoutStrategy === "vesting" && (
                    <>
                      <TextField
                        fullWidth
                        type="number"
                        label={t("fields.vestingPeriod")}
                        value={formData.profitVestingPeriod}
                        onChange={(e) => handleInputChange("profitVestingPeriod", Number.parseInt(e.target.value))}
                        className="form-field"
                        InputProps={{ inputProps: { min: 1, max: 20 } }}
                      />

                      <div className="pattern-selector">
                        <Typography variant="subtitle1" className="pattern-title">
                          {t("fields.vestingPattern")}
                        </Typography>
                        <div className="pattern-options">
                          {fadingPatterns.map((pattern) => (
                            <div
                              key={pattern.id}
                              className={`pattern-option ${formData.profitVestingPattern === pattern.id ? "selected" : ""}`}
                              onClick={() => handleInputChange("profitVestingPattern", pattern.id)}
                            >
                              <div className="pattern-image">
                                <Image
                                  src={pattern.image || "/placeholder.svg"}
                                  alt={pattern.name}
                                  width={50}
                                  height={30}
                                />
                              </div>
                              <Typography variant="subtitle2">{pattern.name}</Typography>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          )}

          <div className="section-header">
            <Typography variant="h6">{t("sections.currencies")}</Typography>
            <Tooltip title={t("tooltips.currencies")} arrow>
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div className="currency-section">
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

          <div className="section-header">
            <Typography variant="h6">{t("sections.distributionTrigger")}</Typography>
            <Tooltip title={t("tooltips.distributionTrigger")} arrow>
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div className="distribution-trigger-section">
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
      </div>
    )
  }

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
            <Typography variant="h3" className="main-title">
              {project?.name ? t("titleForProject").replace("{{projectName}}", project.name) : t("title")}
            </Typography>
            <Typography variant="h6" className="main-subtitle">
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
  onSubmit: () => { },
}

export default NewProjectManagement
