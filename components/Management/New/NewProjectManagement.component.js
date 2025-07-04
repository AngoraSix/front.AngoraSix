"use client"

import {
  AccountBalance as AccountBalanceIcon,
  Business as BusinessIcon,
  Payment as PaymentIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fade,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"
import { useState } from "react"

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    background:
      "radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}))

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  marginBottom: theme.spacing(3),
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#0A2239",
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}))

const ToggleButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  borderRadius: 12,
  overflow: "hidden",
  border: "2px solid #e2e8f0",
  background: "#f8fafc",
}))

const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active"
})(({ theme, active }) => ({
  flex: 1,
  padding: theme.spacing(2, 3),
  borderRadius: 0,
  border: "none",
  background: active ? "#0A2239" : "transparent",
  color: active ? "#ffffff" : "#64748b",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    background: active ? "#1B5993" : "#e2e8f0",
  },
}))

const PaymentChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  background: selected ? "#0A2239" : "#f1f5f9",
  color: selected ? "#ffffff" : "#64748b",
  "&:hover": {
    background: selected ? "#1B5993" : "#e2e8f0",
  },
}))

const DistributionCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  border: selected ? "2px solid #0A2239" : "2px solid #e2e8f0",
  borderRadius: 12,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#0A2239",
    transform: "translateY(-2px)",
  },
}))

const NewProjectManagement = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    ownershipManagement: "angorasix",
    startupTasksDuration: 30,
    tasksDuration: 3,
    ownershipCap: 30,
    minimumVoters: 2,
    paymentTypes: ["profit-shares", "usd"],
    compensationType: "vesting",
    vestingPeriod: 3,
    distributionFunction: "curve-a",
    startDate: "",
    estimatedBudget: "",
    currency: "USD",
    category: "",
  })

  const [errors, setErrors] = useState({})

  const paymentOptions = [
    { id: "profit-shares", label: "Profit Shares", icon: "📊" },
    { id: "usd", label: "USD", icon: "💵" },
    { id: "eur", label: "EUR", icon: "💶" },
    { id: "eth", label: "ETH", icon: "⟠" },
  ]

  const distributionFunctions = [
    { id: "curve-a", name: "Curve A", description: "Bell curve distribution" },
    { id: "curve-b", name: "Curve B", description: "Exponential growth" },
    { id: "linear", name: "Linear", description: "Linear distribution" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handlePaymentTypeToggle = (paymentId) => {
    setFormData((prev) => ({
      ...prev,
      paymentTypes: prev.paymentTypes.includes(paymentId)
        ? prev.paymentTypes.filter((id) => id !== paymentId)
        : [...prev.paymentTypes, paymentId],
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Creating project:", formData)
      // Here would be the API call
    }
  }

  return (
    <MainContainer>
      <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#0A2239",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Create New Project
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  fontWeight: 400,
                }}
              >
                Set up your collaborative project with AngoraSix
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Main Form */}
              <Grid item xs={12} md={8}>
                {/* Core Data Section */}
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <SectionTitle>
                      <BusinessIcon />
                      Project Information
                    </SectionTitle>

                    <TextField
                      fullWidth
                      label="Project Name"
                      placeholder="Enter your project name"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      error={!!errors.projectName}
                      helperText={errors.projectName}
                      sx={{ mb: 3 }}
                      required
                    />

                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Brief description of your project"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      sx={{ mb: 3 }}
                    />

                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Estimated Budget"
                          value={formData.estimatedBudget}
                          onChange={(e) => handleInputChange("estimatedBudget", e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Select
                                  value={formData.currency}
                                  onChange={(e) => handleInputChange("currency", e.target.value)}
                                  variant="standard"
                                  sx={{ minWidth: 60 }}
                                >
                                  <MenuItem value="USD">USD</MenuItem>
                                  <MenuItem value="EUR">EUR</MenuItem>
                                  <MenuItem value="ETH">ETH</MenuItem>
                                </Select>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </StyledCard>

                {/* Decision Rules Section */}
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <SectionTitle>
                      <SecurityIcon />
                      Decision Rules
                    </SectionTitle>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Ownership Management
                      </Typography>
                      <ToggleButtonGroup>
                        <ToggleButton
                          active={formData.ownershipManagement === "angorasix"}
                          onClick={() => handleInputChange("ownershipManagement", "angorasix")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AccountBalanceIcon />
                            Manage ownership via AngoraSix
                          </Box>
                        </ToggleButton>
                        <ToggleButton
                          active={formData.ownershipManagement === "self"}
                          onClick={() => handleInputChange("ownershipManagement", "self")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <BusinessIcon />
                            Self-managed ownership
                          </Box>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>

                    {formData.ownershipManagement === "angorasix" && (
                      <Fade in>
                        <Box>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Startup Tasks Duration (years)"
                                type="number"
                                value={formData.startupTasksDuration}
                                onChange={(e) =>
                                  handleInputChange("startupTasksDuration", Number.parseInt(e.target.value))
                                }
                                InputProps={{ inputProps: { min: 1, max: 50 } }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Regular Tasks Duration (years)"
                                type="number"
                                value={formData.tasksDuration}
                                onChange={(e) => handleInputChange("tasksDuration", Number.parseInt(e.target.value))}
                                InputProps={{ inputProps: { min: 1, max: 10 } }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                  Ownership Cap per Vote: {formData.ownershipCap}%
                                </Typography>
                                <Slider
                                  value={formData.ownershipCap}
                                  onChange={(e, value) => handleInputChange("ownershipCap", value)}
                                  min={10}
                                  max={100}
                                  step={5}
                                  marks
                                  valueLabelDisplay="auto"
                                  sx={{ color: "#0A2239" }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Minimum Voters Required"
                                type="number"
                                value={formData.minimumVoters}
                                onChange={(e) => handleInputChange("minimumVoters", Number.parseInt(e.target.value))}
                                InputProps={{ inputProps: { min: 1, max: 20 } }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Fade>
                    )}
                  </CardContent>
                </StyledCard>

                {/* Finance & Compensation Section */}
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <SectionTitle>
                      <PaymentIcon />
                      Finance & Compensation
                    </SectionTitle>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Supported Payment Types
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {paymentOptions.map((option) => (
                          <PaymentChip
                            key={option.id}
                            label={`${option.icon} ${option.label}`}
                            selected={formData.paymentTypes.includes(option.id)}
                            onClick={() => handlePaymentTypeToggle(option.id)}
                            clickable
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                        Compensation Distribution
                      </Typography>
                      <ToggleButtonGroup>
                        <ToggleButton
                          active={formData.compensationType === "vesting"}
                          onClick={() => handleInputChange("compensationType", "vesting")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <ScheduleIcon />
                            Vesting
                          </Box>
                        </ToggleButton>
                        <ToggleButton
                          active={formData.compensationType === "immediate"}
                          onClick={() => handleInputChange("compensationType", "immediate")}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <TrendingUpIcon />
                            Immediate
                          </Box>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>

                    {formData.compensationType === "vesting" && (
                      <Fade in>
                        <Box>
                          <TextField
                            fullWidth
                            label="Vesting Period (years)"
                            type="number"
                            value={formData.vestingPeriod}
                            onChange={(e) => handleInputChange("vestingPeriod", Number.parseInt(e.target.value))}
                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                            sx={{ mb: 3 }}
                          />

                          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                            Distribution Function
                          </Typography>
                          <Grid container spacing={2}>
                            {distributionFunctions.map((func) => (
                              <Grid item xs={12} sm={4} key={func.id}>
                                <DistributionCard
                                  selected={formData.distributionFunction === func.id}
                                  onClick={() => handleInputChange("distributionFunction", func.id)}
                                >
                                  <Box
                                    sx={{
                                      height: 60,
                                      mb: 1,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {/* Placeholder for distribution curve visualization */}
                                    <Box
                                      sx={{
                                        width: "80%",
                                        height: 40,
                                        background: `linear-gradient(45deg, ${formData.distributionFunction === func.id ? "#0A2239" : "#e2e8f0"} 0%, ${formData.distributionFunction === func.id ? "#1B5993" : "#f1f5f9"} 100%)`,
                                        borderRadius: 1,
                                      }}
                                    />
                                  </Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {func.name}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {func.description}
                                  </Typography>
                                </DistributionCard>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Fade>
                    )}
                  </CardContent>
                </StyledCard>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <StyledCard sx={{ position: "sticky", top: 80 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#0A2239",
                        fontWeight: 600,
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <BusinessIcon />
                      Project Summary
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                        Project Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {formData.projectName || "Untitled Project"}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                        Ownership Management
                      </Typography>
                      <Chip
                        label={formData.ownershipManagement === "angorasix" ? "AngoraSix Managed" : "Self Managed"}
                        size="small"
                        sx={{
                          background: "#0A2239",
                          color: "white",
                          fontWeight: 500,
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                        Payment Types
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {formData.paymentTypes.map((type) => {
                          const option = paymentOptions.find((opt) => opt.id === type)
                          return <Chip key={type} label={option?.label} size="small" variant="outlined" />
                        })}
                      </Stack>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                        Compensation
                      </Typography>
                      <Chip
                        label={
                          formData.compensationType === "vesting" ? `Vesting (${formData.vestingPeriod}y)` : "Immediate"
                        }
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 4,
                pb: 4,
              }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#0A2239",
                    color: "#0A2239",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(45deg, #0A2239 0%, #1B5993 100%)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1B5993 0%, #0A2239 100%)",
                  },
                }}
              >
                Create Project
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </MainContainer>
  )
}

NewProjectManagement.defaultProps = {}

NewProjectManagement.propTypes = {}

export default NewProjectManagement
