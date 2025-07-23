"use client"

import {
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Payment as PaymentIcon,
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
import Image from "next/image"
import { useState } from "react"

const NewProjectManagement = ({ onSubmit }) => {
  const { t } = useTranslation("management.new")
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1 - Basic Setup
    projectName: "",
    currentStage: "startup",
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

  const steps = [t("stepper.basicSetup"), t("stepper.ownershipGovernance"), t("stepper.financesRetribution")]

  const stageOptions = [
    { value: "idea", label: t("stages.idea") },
    { value: "startup", label: t("stages.startup") },
    { value: "live", label: t("stages.live") },
    { value: "other", label: t("stages.other") },
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
        status: "ACTIVE",
        bylaws: {
          ownershipGeneral: {
            isOwnershipA6Managed: formData.ownershipSetup === "angorasix",
          },
          ownershipTasks: {
            startupTasksEnabled: formData.startupTasksEnabled,
            startupTasksFadingEnabled: formData.startupTasksFading,
            startupRetributionPeriod: `P${formData.startupFadingPeriod}Y`,
            startupRetributionPattern: formData.startupFadingPattern,
            regularRetributionPeriod: `P${formData.regularFadingPeriod}Y`,
            regularRetributionPattern: formData.regularFadingPattern,
          },
          ownershipGovernance: {
            coordinationCircleEnabled: formData.coordinationCircleEnabled,
            ownershipVotingLimit: formData.ownershipVotingLimit,
            decisionMinimumQuorum: formData.decisionQuorum,
          },
          financialProfitShares: {
            profitSharesEnabled: formData.profitSharingEnabled,
            profitSharesVestingEnabled: formData.profitPayoutStrategy === "vesting",
            profitSharesVestingPeriod:
              formData.profitPayoutStrategy === "vesting" ? "MATCH_OWNERSHIP_FADING" : "IMMEDIATE",
            profitSharesVestingPattern: formData.profitVestingPattern,
          },
          financialCurrencies: {
            financialCurrencies: formData.supportedCurrencies,
            currencyVestingEnabled: formData.profitPayoutStrategy === "vesting",
            currencyVestingPeriod: formData.profitPayoutStrategy === "vesting" ? "MATCH_OWNERSHIP_FADING" : "IMMEDIATE",
            currencyVestingPattern: formData.profitVestingPattern,
          },
          financialGeneral: {
            isFinancialA6Managed: formData.financialSetup === "angorasix",
            earningDistributionTriggerType: formData.distributionTriggerType,
            earningDistributionTriggerAmount: formData.distributionTriggerAmount,
            earningDistributionTriggerCurrency: formData.distributionTriggerCurrency,
            earningDistributionReviewFrequency: formData.reEvaluationFrequency,
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
        <TextField
          fullWidth
          label={t("fields.projectName")}
          value={formData.projectName}
          onChange={(e) => handleInputChange("projectName", e.target.value)}
          error={!!errors.projectName}
          helperText={errors.projectName}
          className="form-field"
          required
        />

        <FormControl fullWidth className="form-field">
          <InputLabel>{t("fields.currentStage")}</InputLabel>
          <Select
            value={formData.currentStage}
            onChange={(e) => handleInputChange("currentStage", e.target.value)}
            label={t("fields.currentStage")}
          >
            {stageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="toggle-section">
          <div className="toggle-header">
            <Typography variant="h6">{t("fields.ownershipSetup")}</Typography>
            <Tooltip title={t("tooltips.ownershipSetup")}>
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="toggle-options">
            <div
              className={`toggle-option ${formData.ownershipSetup === "angorasix" ? "active" : ""}`}
              onClick={() => handleInputChange("ownershipSetup", "angorasix")}
            >
              <AccountBalanceIcon />
              <div>
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
              <BusinessIcon />
              <div>
                <Typography variant="subtitle1">{t("options.ownershipSetup.external")}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {t("options.ownershipSetup.externalDesc")}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="toggle-section">
          <div className="toggle-header">
            <Typography variant="h6">{t("fields.financialSetup")}</Typography>
            <Tooltip title={t("tooltips.financialSetup")}>
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className="toggle-options">
            <div
              className={`toggle-option ${formData.financialSetup === "angorasix" ? "active" : ""}`}
              onClick={() => handleInputChange("financialSetup", "angorasix")}
            >
              <PaymentIcon />
              <div>
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
              <BusinessIcon />
              <div>
                <Typography variant="subtitle1">{t("options.financialSetup.external")}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {t("options.financialSetup.externalDesc")}
                </Typography>
              </div>
            </div>
          </div>
        </div>
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
              <AccordionSummary>
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
                                  width={60}
                                  height={40}
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

            <TextField
              fullWidth
              type="number"
              label={t("fields.regularFadingPeriod")}
              value={formData.regularFadingPeriod}
              onChange={(e) => handleInputChange("regularFadingPeriod", Number.parseInt(e.target.value))}
              className="form-field"
              InputProps={{ inputProps: { min: 1, max: 20 } }}
            />

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
                      <Image src={pattern.image || "/placeholder.svg"} alt={pattern.name} width={60} height={40} />
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
          </div>

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

          <TextField
            fullWidth
            type="number"
            label={t("fields.decisionQuorum")}
            value={formData.decisionQuorum}
            onChange={(e) => handleInputChange("decisionQuorum", Number.parseInt(e.target.value))}
            className="form-field"
            InputProps={{ inputProps: { min: 1, max: 20 } }}
          />
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
              <AccordionSummary>
                <Typography>{t("accordions.profitSettings")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="accordion-content">
                  <div className="toggle-section">
                    <Typography variant="subtitle1">{t("fields.payoutStrategy")}</Typography>
                    <div className="toggle-options small">
                      <div
                        className={`toggle-option ${formData.profitPayoutStrategy === "vesting" ? "active" : ""}`}
                        onClick={() => handleInputChange("profitPayoutStrategy", "vesting")}
                      >
                        <Typography variant="body2">{t("options.payoutStrategy.vesting")}</Typography>
                      </div>
                      <div
                        className={`toggle-option ${formData.profitPayoutStrategy === "immediate" ? "active" : ""}`}
                        onClick={() => handleInputChange("profitPayoutStrategy", "immediate")}
                      >
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
                                  width={60}
                                  height={40}
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

          <div className="distribution-trigger-section">
            <Typography variant="subtitle1">{t("fields.distributionTrigger")}</Typography>
            <div className="trigger-options">
              <FormControl fullWidth className="form-field">
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

              {formData.distributionTriggerType !== "AUTOMATIC_YEARLY" && (
                <div className="trigger-amount">
                  <TextField
                    type="number"
                    label={t("fields.triggerAmount")}
                    value={formData.distributionTriggerAmount}
                    onChange={(e) => handleInputChange("distributionTriggerAmount", Number.parseInt(e.target.value))}
                    className="amount-field"
                  />
                  <FormControl className="currency-select">
                    <Select
                      value={formData.distributionTriggerCurrency}
                      onChange={(e) => handleInputChange("distributionTriggerCurrency", e.target.value)}
                    >
                      {formData.supportedCurrencies.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          </div>

          <FormControl fullWidth className="form-field">
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
        </div>
      </div>
    )
  }

  return (
    <div className="new-project-management">
      <Container maxWidth="lg" className="main-container">
        <div className="header-section">
          <Typography variant="h3" className="main-title">
            {t("title")}
          </Typography>
          <Typography variant="h6" className="main-subtitle">
            {t("subtitle")}
          </Typography>
        </div>

        <Paper className="stepper-container">
          <Stepper activeStep={activeStep} className="stepper">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <div className={`step-icon ${active ? "active" : ""} ${completed ? "completed" : ""}`}>
                      {completed ? <CheckCircleIcon /> : index + 1}
                    </div>
                  )}
                >
                  {label}
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
  )
}

NewProjectManagement.defaultProps = {
  onSubmit: () => {},
}

export default NewProjectManagement
