"use client"

import {
  AccountBalance,
  Add,
  AdminPanelSettings,
  Business,
  Campaign,
  Celebration,
  CheckCircle,
  Code,
  Diamond,
  Email,
  Error,
  Error as ErrorIcon,
  GitHub,
  Group,
  Instagram,
  LinkedIn,
  Message,
  Person,
  Phone,
  Psychology,
  Send,
  Speed,
  Star,
  Support,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import Build from "@mui/icons-material/Build"; // Keep this one if still used elsewhere or for consistency
import DesignServices from "@mui/icons-material/DesignServices"; // Keep this one if still used elsewhere or for consistency
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect, useState } from "react";
import api from "../../api";
import { ROUTES } from "../../constants/constants";
import {
  trackBetaDialogOpen,
  trackBetaFormSubmit,
  trackContactMessageSubmit,
  trackNewsletterSignupClick,
  trackSocialFollowClick,
} from "../../utils/analytics";

// Import SVG logos
import Link from "next/link";
import AsanaLogo from "../../public/logos/thirdparty/asana.svg";
import ClickUpLogo from "../../public/logos/thirdparty/clickup.svg";
import GithubProjectsLogo from "../../public/logos/thirdparty/github.svg";
import JiraLogo from "../../public/logos/thirdparty/jira.svg";
import NotionLogo from "../../public/logos/thirdparty/notion.svg";
import SpreadsheetLogo from "../../public/logos/thirdparty/spreadsheet.svg";
import TrelloLogo from "../../public/logos/thirdparty/trello.svg";

const PostRegistration = () => {
  // Removed existingBetaApplication prop
  const { t } = useTranslation("post-registration")
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false)
  const [messageSubmitted, setMessageSubmitted] = useState(false)
  const [betaDialogOpen, setBetaDialogOpen] = useState(false)
  const [betaFormData, setBetaFormData] = useState({
    profileType: "",
    otherProfileType: "",
    // Project owner fields
    projectStage: "",
    teamSize: "",
    role: [],
    otherRole: "",
    managementTools: [],
    otherManagementTool: "",
    otherTools: "",
    // Contributor fields
    workInterests: [],
    otherWorkInterest: "",
    dedicationLevel: "",
    currentWork: "",
    // Common fields
    expectations: "",
    contactMethod: "email",
    contactValue: "",
  })
  const [betaFormErrors, setBetaFormErrors] = useState({})
  const [isSubmittingBeta, setIsSubmittingBeta] = useState(false)
  const [betaSubmitted, setBetaSubmitted] = useState(false) // Initialize as false
  const [errorRetrievingBeta, setErrorRetrievingBeta] = useState(false) // Initialize as false
  const [isLoadingBetaApplication, setIsLoadingBetaApplication] = useState(true) // New loading state
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false); // New state for consent checkbox

  // Beta program launch date (30 days from now)
  const betaLaunchDate = new Date("2025-09-01T00:00:00")

  // Profile type options
  const profileTypeOptions = [
    {
      id: "project_owner",
      icon: <Business />,
      title: t("betaDialog.profileTypes.projectOwner.title"),
      description: t("betaDialog.profileTypes.projectOwner.description"),
    },
    {
      id: "contributor",
      icon: <Person />,
      title: t("betaDialog.profileTypes.contributor.title"),
      description: t("betaDialog.profileTypes.contributor.description"),
    },
    {
      id: "other",
      icon: <Add />,
      title: t("betaDialog.profileTypes.other.title"),
      description: t("betaDialog.profileTypes.other.description"),
    },
  ]

  // Project stage options
  const projectStageOptions = [
    { id: "idea", label: t("betaDialog.projectStage.idea") },
    { id: "building_team", label: t("betaDialog.projectStage.buildingTeam") },
    { id: "working", label: t("betaDialog.projectStage.working") },
    { id: "has_users", label: t("betaDialog.projectStage.hasUsers") },
    { id: "other", label: t("betaDialog.projectStage.other") },
  ]

  // Team size options
  const teamSizeOptions = [
    { id: "solo", label: t("betaDialog.teamSize.solo") },
    { id: "small", label: t("betaDialog.teamSize.small") },
    { id: "medium", label: t("betaDialog.teamSize.medium") },
    { id: "large", label: t("betaDialog.teamSize.large") },
  ]

  // Role options
  const roleOptions = [
    { id: "founder", label: t("betaDialog.role.founder"), icon: <Business /> },
    { id: "partner", label: t("betaDialog.role.partner"), icon: <Group /> },
    { id: "coordinator", label: t("betaDialog.role.coordinator"), icon: <AdminPanelSettings /> },
    { id: "developer", label: t("betaDialog.role.developer"), icon: <Code /> },
    { id: "designer", label: t("betaDialog.role.designer"), icon: <DesignServices /> },
    { id: "other", label: t("betaDialog.role.other"), icon: <Add /> },
  ]

  // Management tools options
  const managementToolsOptions = [
    {
      id: "trello",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={TrelloLogo} viewBox="0 0 24 24" />,
      label: "Trello",
    },
    {
      id: "jira",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={JiraLogo} viewBox="0 0 24 24" />,
      label: "Jira",
    },
    {
      id: "notion",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={NotionLogo} viewBox="0 0 24 24" />,
      label: "Notion",
    },
    {
      id: "asana",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={AsanaLogo} viewBox="0 0 24 24" />,
      label: "Asana",
    },
    {
      id: "clickup",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={ClickUpLogo} viewBox="0 0 24 24" />,
      label: "ClickUp",
    },
    {
      id: "github-projects",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={GithubProjectsLogo} viewBox="0 0 24 24" />,
      label: "Github Projects",
    },
    {
      id: "excel",
      icon: <SvgIcon className="tool-logo" sx={{ fontSize: 22 }} component={SpreadsheetLogo} viewBox="0 0 24 24" />,
      label: "Excel / Google Sheets",
    },
    { id: "other", icon: <Build className="tool-logo" />, label: t("betaDialog.managementTools.other") },
  ]

  // Work interests options
  const workInterestsOptions = [
    { id: "development", icon: <Code />, label: t("betaDialog.workInterests.development") },
    { id: "design", icon: <DesignServices />, label: t("betaDialog.workInterests.design") },
    { id: "communication", icon: <Campaign />, label: t("betaDialog.workInterests.communication") },
    { id: "strategy", icon: <Psychology />, label: t("betaDialog.workInterests.strategy") },
    { id: "organization", icon: <AdminPanelSettings />, label: t("betaDialog.workInterests.organization") },
    { id: "finance", icon: <AccountBalance />, label: t("betaDialog.workInterests.finance") },
    { id: "other", icon: <Add />, label: t("betaDialog.workInterests.other") },
  ]

  // Dedication level options
  const dedicationLevelOptions = [
    { id: "few_hours", label: t("betaDialog.dedicationLevel.fewHours") },
    { id: "part_time", label: t("betaDialog.dedicationLevel.partTime") },
    { id: "full_time", label: t("betaDialog.dedicationLevel.fullTime") },
    { id: "not_sure", label: t("betaDialog.dedicationLevel.notSure") },
  ]

  // Current work options
  const currentWorkOptions = [
    { id: "fixed_job", label: t("betaDialog.currentWork.fixedJob") },
    { id: "freelancer", label: t("betaDialog.currentWork.freelancer") },
    { id: "looking", label: t("betaDialog.currentWork.looking") },
    { id: "prefer_not_answer", label: t("betaDialog.currentWork.preferNotAnswer") },
  ]

  // Contact method options
  const contactMethods = [
    { id: "email", icon: <Email />, label: t("betaDialog.contact.email") },
    { id: "phone", icon: <Phone />, label: t("betaDialog.contact.phone") },
    { id: "whatsapp", icon: <WhatsApp />, label: t("betaDialog.contact.whatsapp") },
  ]

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return
    if (!session || session.error === "SessionExpired" || session.error === "RefreshAccessTokenError") {
      signIn('angorasixspring')
      return
    }
    if (session?.user?.email) {
      setEmail(session.user.email)
      setBetaFormData((prev) => ({
        ...prev,
        contactValue: session.user.email,
      }))
    }
  }, [session, status])

  // Client-side data fetching for existingBetaApplication
  useEffect(() => {
    const fetchBetaApplication = async () => {
      if (status === "authenticated" && !session.error && session?.user?.email) {
        setIsLoadingBetaApplication(true)
        try {
          // This call will go to /api/surveys/[surveyKey]/responses/index.js
          const surveyResponse = await api.front.getSurveyResponse("beta-applications")
          setBetaSubmitted(!!surveyResponse) // Set betaSubmitted based on response
        } catch (error) {
          if (error.response?.status === 404) {
            setBetaSubmitted(false)
          } else {
            console.error("Error fetching beta application:", error)
            setErrorRetrievingBeta(true);
          }
        } finally {
          setIsLoadingBetaApplication(false)
        }
      } else if (status === "unauthenticated") {
        setIsLoadingBetaApplication(false) // Not authenticated, so no existing application to check
      }
    }

    fetchBetaApplication()
  }, [session, status])

  if (status === "loading" || !session) {
    return null
  }

  const validateBetaForm = () => {
    const errors = {}

    if (!betaFormData.profileType) {
      errors.profileType = t("betaDialog.errors.profileTypeRequired")
    }

    if (betaFormData.profileType === "other" && !betaFormData.otherProfileType.trim()) {
      errors.otherProfileType = t("betaDialog.errors.otherProfileTypeRequired")
    }

    // Project owner validations
    if (betaFormData.profileType === "project_owner") {
      if (!betaFormData.projectStage) {
        errors.projectStage = t("betaDialog.errors.projectStageRequired")
      }
      if (!betaFormData.teamSize) {
        errors.teamSize = t("betaDialog.errors.teamSizeRequired")
      }
      if (betaFormData.role.length === 0) {
        errors.role = t("betaDialog.errors.roleRequired")
      }
      if (betaFormData.role.includes("other") && !betaFormData.otherRole.trim()) {
        errors.otherRole = t("betaDialog.errors.otherRoleRequired")
      }
      if (betaFormData.managementTools.length === 0) {
        errors.managementTools = t("betaDialog.errors.managementToolsRequired")
      }
      if (betaFormData.managementTools.includes("other") && !betaFormData.otherManagementTool.trim()) {
        errors.otherManagementTool = t("betaDialog.errors.otherManagementToolRequired")
      }
    }

    // Contributor validations
    if (betaFormData.profileType === "contributor") {
      if (betaFormData.workInterests.length === 0) {
        errors.workInterests = t("betaDialog.errors.workInterestsRequired")
      }
      if (betaFormData.workInterests.includes("other") && !betaFormData.otherWorkInterest.trim()) {
        errors.otherWorkInterest = t("betaDialog.errors.otherWorkInterestRequired")
      }
      if (!betaFormData.dedicationLevel) {
        errors.dedicationLevel = t("betaDialog.errors.dedicationLevelRequired")
      }
      if (!betaFormData.currentWork) {
        errors.currentWork = t("betaDialog.errors.currentWorkRequired")
      }
    }

    // Common validations
    if (!betaFormData.expectations.trim()) {
      errors.expectations = t("betaDialog.errors.expectationsRequired")
    }

    if (!betaFormData.contactValue.trim()) {
      errors.contactValue = t("betaDialog.errors.contactValueRequired")
    }

    if (!consentChecked) {
      errors.consentChecked = t("betaDialog.errors.consentRequired");
    }

    setBetaFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!subscribeNewsletter) return

    trackNewsletterSignupClick()
    setIsSubmittingNewsletter(true)

    try {
      await api.front.suscribe(email, {
        newsletterList: true,
        source: "post_registration",
      })
      setNewsletterSubmitted(true)
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  const handleMessageSubmit = async (e) => {
    e.preventDefault()
    setIsSubmittingMessage(true)

    trackContactMessageSubmit()

    try {
      await api.front.saveSurveyResponse(
        {
          message,
          source: "post_registration",
          userEmail: session?.user?.email,
        },
        "contact-messages",
      )
      setMessageSubmitted(true)
      setMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsSubmittingMessage(false)
    }
  }

  const handleBetaDialogOpenClick = () => {
    trackBetaDialogOpen()
    setBetaDialogOpen(true)
  }

  const handleProfileTypeSelect = (profileType) => {
    setBetaFormData((prev) => ({
      ...prev,
      profileType,
      // Reset conditional fields when changing profile type
      projectStage: "",
      teamSize: "",
      role: [],
      otherRole: "",
      managementTools: [],
      otherManagementTool: "",
      otherTools: "",
      workInterests: [],
      otherWorkInterest: "",
      dedicationLevel: "",
      currentWork: "",
    }))
    // Clear errors when user makes changes
    if (betaFormErrors.profileType) {
      setBetaFormErrors((prev) => ({ ...prev, profileType: null }))
    }
  }

  const handleRoleToggle = (roleId) => {
    setBetaFormData((prev) => ({
      ...prev,
      role: prev.role.includes(roleId) ? prev.role.filter((id) => id !== roleId) : [...prev.role, roleId],
    }))
    if (betaFormErrors.role) {
      setBetaFormErrors((prev) => ({ ...prev, role: null }))
    }
  }

  const handleManagementToolToggle = (toolId) => {
    setBetaFormData((prev) => ({
      ...prev,
      managementTools: prev.managementTools.includes(toolId)
        ? prev.managementTools.filter((id) => id !== toolId)
        : [...prev.managementTools, toolId],
    }))
    if (betaFormErrors.managementTools) {
      setBetaFormErrors((prev) => ({ ...prev, managementTools: null }))
    }
  }

  const handleWorkInterestToggle = (interestId) => {
    setBetaFormData((prev) => ({
      ...prev,
      workInterests: prev.workInterests.includes(interestId)
        ? prev.workInterests.filter((id) => id !== interestId)
        : [...prev.workInterests, interestId],
    }))
    if (betaFormErrors.workInterests) {
      setBetaFormErrors((prev) => ({ ...prev, workInterests: null }))
    }
  }

  const handleContactMethodChange = (method) => {
    let placeholder = ""
    let value = ""

    switch (method) {
      case "email":
        placeholder = session?.user?.email || "tu@email.com"
        value = session?.user?.email || ""
        break
      case "phone":
      case "whatsapp":
        placeholder = "+54 9 11 1234-5678"
        value = ""
        break
    }

    setBetaFormData((prev) => ({
      ...prev,
      contactMethod: method,
      contactValue: value,
    }))
  }

  const getContactPlaceholder = () => {
    switch (betaFormData.contactMethod) {
      case "email":
        return session?.user?.email || "tu@email.com"
      case "phone":
      case "whatsapp":
        return "+54 9 11 1234-5678"
      default:
        return ""
    }
  }

  const handleBetaSubmit = async (e) => {
    e.preventDefault()

    if (!validateBetaForm()) {
      return
    }

    setIsSubmittingBeta(true)
    trackBetaFormSubmit()

    try {
      // Save to survey system
      await api.front.saveSurveyResponse(
        {
          ...betaFormData,
          source: "post_registration",
          userEmail: session?.user?.email,
          userName: session?.user?.name,
        },
        "beta-applications",
      )

      // Subscribe to beta list in Mailchimp
      await api.front.suscribe(session.user.email, {
        betaList: true,
        source: "post_registration",
      })

      setBetaSubmitted(true)
      setBetaDialogOpen(false)
      setShowSuccessSnackbar(true)

      // Auto-close snackbar after 4 seconds
      setTimeout(() => {
        setShowSuccessSnackbar(false)
      }, 4000)
    } catch (error) {
      console.error("Error submitting beta application:", error)
    } finally {
      setIsSubmittingBeta(false)
    }
  }

  const handleSocialClick = (platform) => {
    trackSocialFollowClick(platform.toLowerCase())
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <LinkedIn />,
      url: "https://linkedin.com/company/angorasix",
    },
    {
      name: "Instagram",
      icon: <Instagram />,
      url: "https://instagram.com/angorasix",
    },
    {
      name: "GitHub",
      icon: <GitHub />,
      url: "https://github.com/angorasix",
    },
    {
      name: "YouTube",
      icon: <YouTube />,
      url: "https://youtube.com/@angorasix",
    },
  ]

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box className="post-registration-landing">
        {/* Flowing Lines Background */}
        <Box className="post-registration-background">
          <div className="flowing-lines">
            <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <path d="M0,400 Q300,200 600,400 T1200,400" />
              <path d="M0,300 Q400,100 800,300 T1200,300" />
              <path d="M0,500 Q200,300 400,500 T1200,500" />
            </svg>
          </div>
        </Box>

        <Container className="post-registration-container">
          <Grid container spacing={{ xs: 2, md: 3 }} className="main-layout">
            {/* Left Column - Welcome + Beta Program */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="left-column">
                {/* Welcome Section */}
                <Box className="welcome-section">
                  <Box className="welcome-content">
                    <Celebration className="celebration-icon" />
                    <Typography variant="h3" className="welcome-title">
                      {t("welcome.title")}
                    </Typography>
                    <Typography variant="h5" className="welcome-subtitle">
                      {t("welcome.subtitle")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* Left Column - Welcome + Beta Program */}
            <Grid item xs={12} sm={12} md={8} lg={9}>
              <Box className="left-column">
                {/* Beta Program Panel */}
                <Card className="beta-panel">
                  <Box className="beta-section">
                    <BetaCountdown targetDate={betaLaunchDate.toISOString()} />
                    <Box className="beta-header">
                      <Star className="beta-icon" />
                      <Typography variant="h4" className="beta-title">
                        {t("beta.title")}
                      </Typography>
                      <Typography variant="body1" className="beta-description">
                        {t("beta.description")}
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Box className="beta-cta-top">
                      {isLoadingBetaApplication ? (
                        <CircularProgress size={24} /> // Show spinner while loading
                      ) : !betaSubmitted ?
                        !errorRetrievingBeta ? (
                          <Button
                            variant="contained"
                            size="large"
                            onClick={handleBetaDialogOpenClick}
                            className="beta-button"
                            startIcon={<Star />}
                          >
                            {t("beta.apply")}
                          </Button>
                        ) : (
                          <Box className="beta-error">
                            <Error />
                            <Typography>{t("beta.errorResponse")}</Typography>
                          </Box>
                        ) : (
                          <Box className="beta-success">
                            <CheckCircle />
                            <Typography>{t("beta.alreadyApplied")}</Typography>
                          </Box>
                        )}
                    </Box>

                    {/* Beta Benefits */}
                    <Grid container spacing={1} className="beta-benefits">
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Speed className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.exclusive")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Group className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.influence")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Support className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.priority")}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box className="benefit-item">
                          <Diamond className="benefit-icon" />
                          <Typography className="benefit-text">{t("beta.benefits.lifetime")}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
            </Grid>

            {/* Right Column - Side Panels */}
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Box className="side-panels">
                {/* Newsletter Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Email className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("newsletter.title")}
                    </Typography>
                  </Box>
                  {!newsletterSubmitted ? (
                    <Box component="form" onSubmit={handleNewsletterSubmit} className="panel-content">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder={t("newsletter.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmittingNewsletter}
                        sx={{ mb: 1 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={subscribeNewsletter}
                            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                            size="small"
                          />
                        }
                        label={t("newsletter.consent")}
                        sx={{ mb: 1, fontSize: "0.8rem" }}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={isSubmittingNewsletter || !email}
                        className="panel-button"
                      >
                        {isSubmittingNewsletter ? t("newsletter.subscribing") : t("newsletter.subscribe")}
                      </Button>
                    </Box>
                  ) : (
                    <Box className="panel-success">
                      <Celebration />
                      <Typography variant="body2">{t("newsletter.success")}</Typography>
                    </Box>
                  )}
                </Card>

                {/* Contact Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Message className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("contact.title")}
                    </Typography>
                  </Box>
                  {!messageSubmitted ? (
                    <Box component="form" onSubmit={handleMessageSubmit} className="panel-content">
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        placeholder={t("contact.messagePlaceholder")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isSubmittingMessage}
                        sx={{ mb: 1 }}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={isSubmittingMessage || !message.trim()}
                        startIcon={<Send />}
                        className="panel-button"
                      >
                        {isSubmittingMessage ? t("contact.sending") : t("contact.send")}
                      </Button>
                    </Box>
                  ) : (
                    <Box className="panel-success">
                      <Celebration />
                      <Typography variant="body2">{t("contact.success")}</Typography>
                    </Box>
                  )}
                </Card>

                {/* Social Panel */}
                <Card className="side-panel">
                  <Box className="panel-header">
                    <Group className="panel-icon" />
                    <Typography variant="h6" className="panel-title">
                      {t("social.title")}
                    </Typography>
                  </Box>
                  <Box className="panel-content">
                    <Typography variant="body2" className="panel-description">
                      {t("social.description")}
                    </Typography>
                    <Box className="social-links">
                      {socialLinks.map((social) => (
                        <IconButton
                          key={social.name}
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          size="small"
                          onClick={() => handleSocialClick(social.name)}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Beta Application Dialog */}
        <Dialog
          open={betaDialogOpen}
          onClose={() => setBetaDialogOpen(false)}
          maxWidth="lg"
          fullWidth
          className="beta-dialog"
        >
          <DialogTitle>
            <Typography variant="h5" className="dialog-title">
              {t("betaDialog.title")}
            </Typography>
            <Typography variant="body2" className="dialog-subtitle">
              {t("betaDialog.subtitle")}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleBetaSubmit} sx={{ mt: 2 }}>
              {/* Step 1: Profile Type Selection */}
              <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}>
                  {t("betaDialog.fields.profileType")} *
                </FormLabel>
                <Grid container spacing={2}>
                  {profileTypeOptions.map((option) => (
                    <Grid item xs={12} sm={4} key={option.id}>
                      <Card
                        className={`profile-type-card ${betaFormData.profileType === option.id ? "selected" : ""}`}
                        onClick={() => handleProfileTypeSelect(option.id)}
                        sx={{
                          cursor: "pointer",
                          p: 2,
                          height: "100%",
                          border: betaFormData.profileType === option.id ? "2px solid #fe5f55" : "1px solid #e0e0e0",
                        }}
                      >
                        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={1}>
                          <Box
                            sx={{
                              color: betaFormData.profileType === option.id ? "#fe5f55" : "#1b5993",
                              fontSize: "2rem",
                            }}
                          >
                            {option.icon}
                          </Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {option.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
                            {option.description}
                          </Typography>
                          {betaFormData.profileType === option.id && (
                            <CheckCircle sx={{ color: "#fe5f55", fontSize: "1.5rem", mt: 1 }} />
                          )}
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {betaFormErrors.profileType && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                    {betaFormErrors.profileType}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Other Profile Type Field */}
              {betaFormData.profileType === "other" && (
                <TextField
                  fullWidth
                  size="small"
                  label={t("betaDialog.fields.otherProfileType")}
                  value={betaFormData.otherProfileType}
                  onChange={(e) => setBetaFormData({ ...betaFormData, otherProfileType: e.target.value })}
                  error={!!betaFormErrors.otherProfileType}
                  helperText={betaFormErrors.otherProfileType}
                  sx={{ mb: 3 }}
                />
              )}

              {/* Branch A: Project Owner Fields */}
              {betaFormData.profileType === "project_owner" && (
                <>
                  <Divider sx={{ my: 3 }}>
                    <Chip label={t("betaDialog.sections.projectDetails")} />
                  </Divider>

                  {/* Project Stage */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.projectStage")} *
                    </FormLabel>
                    <RadioGroup
                      value={betaFormData.projectStage}
                      onChange={(e) => setBetaFormData({ ...betaFormData, projectStage: e.target.value })}
                    >
                      {projectStageOptions.map((option) => (
                        <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {betaFormErrors.projectStage && (
                      <FormHelperText error>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.projectStage}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Team Size */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.teamSize")} *
                    </FormLabel>
                    <RadioGroup
                      value={betaFormData.teamSize}
                      onChange={(e) => setBetaFormData({ ...betaFormData, teamSize: e.target.value })}
                    >
                      {teamSizeOptions.map((option) => (
                        <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {betaFormErrors.teamSize && (
                      <FormHelperText error>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.teamSize}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Role */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.role")} *
                    </FormLabel>
                    <Grid container spacing={1}>
                      {roleOptions.map((option) => (
                        <Grid item xs={6} sm={4} key={option.id}>
                          <Card
                            className={`tool-card ${betaFormData.role.includes(option.id) ? "selected" : ""}`}
                            onClick={() => handleRoleToggle(option.id)}
                            sx={{
                              cursor: "pointer",
                              p: 1.5,
                              textAlign: "center",
                              border: betaFormData.role.includes(option.id) ? "2px solid #fe5f55" : "1px solid #e0e0e0",
                            }}
                          >
                            <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                              <Box sx={{ color: betaFormData.role.includes(option.id) ? "#fe5f55" : "#1b5993" }}>
                                {option.icon}
                              </Box>
                              <Typography variant="caption" fontWeight={600} fontSize="0.7rem">
                                {option.label}
                              </Typography>
                              {betaFormData.role.includes(option.id) && (
                                <CheckCircle sx={{ color: "#fe5f55", fontSize: "1rem" }} />
                              )}
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    {betaFormErrors.role && (
                      <FormHelperText error sx={{ mt: 1 }}>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.role}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Other Role Field */}
                  {betaFormData.role.includes("other") && (
                    <TextField
                      fullWidth
                      size="small"
                      label={t("betaDialog.fields.otherRole")}
                      value={betaFormData.otherRole}
                      onChange={(e) => setBetaFormData({ ...betaFormData, otherRole: e.target.value })}
                      error={!!betaFormErrors.otherRole}
                      helperText={betaFormErrors.otherRole}
                      sx={{ mb: 3 }}
                    />
                  )}

                  {/* Management Tools */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.managementTools")} *
                    </FormLabel>
                    <Grid container spacing={1}>
                      {managementToolsOptions.map((tool) => (
                        <Grid item xs={6} sm={4} md={3} key={tool.id}>
                          <Card
                            className={`tool-card ${betaFormData.managementTools.includes(tool.id) ? "selected" : ""}`}
                            onClick={() => handleManagementToolToggle(tool.id)}
                            sx={{
                              cursor: "pointer",
                              p: 1.5,
                              textAlign: "center",
                              border: betaFormData.managementTools.includes(tool.id)
                                ? "2px solid #fe5f55"
                                : "1px solid #e0e0e0",
                            }}
                          >
                            <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {tool.icon}
                              </Box>
                              <Typography variant="caption" fontWeight={600} fontSize="0.7rem">
                                {tool.label}
                              </Typography>
                              {betaFormData.managementTools.includes(tool.id) && (
                                <CheckCircle sx={{ color: "#fe5f55", fontSize: "1rem" }} />
                              )}
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    {betaFormErrors.managementTools && (
                      <FormHelperText error sx={{ mt: 1 }}>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.managementTools}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Other Management Tool Field */}
                  {betaFormData.managementTools.includes("other") && (
                    <TextField
                      fullWidth
                      size="small"
                      label={t("betaDialog.fields.otherManagementTool")}
                      value={betaFormData.otherManagementTool}
                      onChange={(e) => setBetaFormData({ ...betaFormData, otherManagementTool: e.target.value })}
                      error={!!betaFormErrors.otherManagementTool}
                      helperText={betaFormErrors.otherManagementTool}
                      sx={{ mb: 3 }}
                    />
                  )}

                  {/* Other Tools */}
                  <TextField
                    fullWidth
                    size="small"
                    label={t("betaDialog.fields.otherTools")}
                    placeholder={t("betaDialog.fields.otherToolsPlaceholder")}
                    value={betaFormData.otherTools}
                    onChange={(e) => setBetaFormData({ ...betaFormData, otherTools: e.target.value })}
                    sx={{ mb: 3 }}
                  />
                </>
              )}

              {/* Branch B: Contributor Fields */}
              {betaFormData.profileType === "contributor" && (
                <>
                  <Divider sx={{ my: 3 }}>
                    <Chip label={t("betaDialog.sections.contributorDetails")} />
                  </Divider>

                  {/* Work Interests */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.workInterests")} *
                    </FormLabel>
                    <Grid container spacing={1}>
                      {workInterestsOptions.map((interest) => (
                        <Grid item xs={6} sm={4} key={interest.id}>
                          <Card
                            className={`interest-card ${betaFormData.workInterests.includes(interest.id) ? "selected" : ""}`}
                            onClick={() => handleWorkInterestToggle(interest.id)}
                            sx={{
                              cursor: "pointer",
                              p: 1.5,
                              textAlign: "center",
                              border: betaFormData.workInterests.includes(interest.id)
                                ? "2px solid #fe5f55"
                                : "1px solid #e0e0e0",
                            }}
                          >
                            <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                              <Box
                                sx={{ color: betaFormData.workInterests.includes(interest.id) ? "#fe5f55" : "#1b5993" }}
                              >
                                {interest.icon}
                              </Box>
                              <Typography variant="caption" fontWeight={600} fontSize="0.75rem">
                                {interest.label}
                              </Typography>
                              {betaFormData.workInterests.includes(interest.id) && (
                                <CheckCircle sx={{ color: "#fe5f55", fontSize: "1rem" }} />
                              )}
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    {betaFormErrors.workInterests && (
                      <FormHelperText error sx={{ mt: 1 }}>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.workInterests}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Other Work Interest Field */}
                  {betaFormData.workInterests.includes("other") && (
                    <TextField
                      fullWidth
                      size="small"
                      label={t("betaDialog.fields.otherWorkInterest")}
                      value={betaFormData.otherWorkInterest}
                      onChange={(e) => setBetaFormData({ ...betaFormData, otherWorkInterest: e.target.value })}
                      error={!!betaFormErrors.otherWorkInterest}
                      helperText={betaFormErrors.otherWorkInterest}
                      sx={{ mb: 3 }}
                    />
                  )}

                  {/* Dedication Level */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.dedicationLevel")} *
                    </FormLabel>
                    <RadioGroup
                      value={betaFormData.dedicationLevel}
                      onChange={(e) => setBetaFormData({ ...betaFormData, dedicationLevel: e.target.value })}
                    >
                      {dedicationLevelOptions.map((option) => (
                        <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {betaFormErrors.dedicationLevel && (
                      <FormHelperText error>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.dedicationLevel}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Current Work */}
                  <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                      {t("betaDialog.fields.currentWork")} *
                    </FormLabel>
                    <RadioGroup
                      value={betaFormData.currentWork}
                      onChange={(e) => setBetaFormData({ ...betaFormData, currentWork: e.target.value })}
                    >
                      {currentWorkOptions.map((option) => (
                        <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {betaFormErrors.currentWork && (
                      <FormHelperText error>
                        <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {betaFormErrors.currentWork}
                      </FormHelperText>
                    )}
                  </FormControl>
                </>
              )}

              {/* Common Fields */}
              {(betaFormData.profileType === "project_owner" ||
                betaFormData.profileType === "contributor" ||
                betaFormData.profileType === "other") &&
                betaFormData.profileType && (
                  <>
                    <Divider sx={{ my: 3 }}>
                      <Chip label={t("betaDialog.sections.commonFields")} />
                    </Divider>

                    {/* Expectations */}
                    <TextField
                      fullWidth
                      label={t("betaDialog.fields.expectations")}
                      multiline
                      rows={4}
                      value={betaFormData.expectations}
                      onChange={(e) => setBetaFormData({ ...betaFormData, expectations: e.target.value })}
                      placeholder={t("betaDialog.fields.expectationsPlaceholder")}
                      error={!!betaFormErrors.expectations}
                      helperText={betaFormErrors.expectations}
                      required
                      sx={{ mb: 3 }}
                    />

                    {/* Contact Method */}
                    <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                      <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                        {t("betaDialog.fields.contactMethod")} *
                      </FormLabel>
                      <Grid container spacing={2}>
                        {contactMethods.map((method) => (
                          <Grid item xs={4} key={method.id}>
                            <Card
                              className={`contact-method-card ${betaFormData.contactMethod === method.id ? "selected" : ""}`}
                              onClick={() => handleContactMethodChange(method.id)}
                              sx={{
                                cursor: "pointer",
                                p: 2,
                                textAlign: "center",
                                border:
                                  betaFormData.contactMethod === method.id ? "2px solid #fe5f55" : "1px solid #e0e0e0",
                              }}
                            >
                              <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                                <Box sx={{ color: betaFormData.contactMethod === method.id ? "#fe5f55" : "#1b5993" }}>
                                  {method.icon}
                                </Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {method.label}
                                </Typography>
                                {betaFormData.contactMethod === method.id && (
                                  <CheckCircle sx={{ color: "#fe5f55", fontSize: "1.2rem" }} />
                                )}
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </FormControl>

                    {/* Contact Value */}
                    <TextField
                      fullWidth
                      size="small"
                      label={t("betaDialog.fields.contactValue")}
                      value={betaFormData.contactValue}
                      onChange={(e) => setBetaFormData({ ...betaFormData, contactValue: e.target.value })}
                      placeholder={getContactPlaceholder()}
                      error={!!betaFormErrors.contactValue}
                      helperText={betaFormErrors.contactValue}
                      required
                      sx={{ mb: 3 }}
                    />

                    {/* Consent Checkbox */}
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={consentChecked}
                            onChange={(e) => setConsentChecked(e.target.checked)}
                            name="consent"
                          />
                        }
                        label={
                          <Typography variant="caption" color="text.secondary">
                            {t("betaDialog.fields.consentCheckboxLabel.pre")}{" "}
                            <Link
                              href={ROUTES.legal.termsAndConditions}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#fe5f55", textDecoration: "underline" }}
                            >
                              {t("betaDialog.fields.consentCheckboxLabel.linkText")}
                            </Link>
                            {" " + t("betaDialog.fields.consentCheckboxLabel.post")}
                          </Typography>
                        }
                      />
                      {betaFormErrors.consentChecked && (
                        <FormHelperText error sx={{ mt: -1, mb: 2 }}>
                          <ErrorIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                          {betaFormErrors.consentChecked}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: "flex-end" }}>
            <Button onClick={() => setBetaDialogOpen(false)} className="dialog-cancel">
              {t("betaDialog.cancel")}
            </Button>
            <Button
              onClick={handleBetaSubmit}
              variant="contained"
              disabled={isSubmittingBeta}
              className="dialog-submit"
            >
              {isSubmittingBeta ? t("betaDialog.submitting") : t("betaDialog.submit")}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccessSnackbar}
          autoHideDuration={4000}
          onClose={() => setShowSuccessSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success" sx={{ width: "100%" }}>
            {t("betaDialog.successMessage")}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

// Beta Countdown Component
const BetaCountdown = ({ targetDate }) => {
  const { t } = useTranslation("post-registration")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <Box className="beta-countdown">
      <Typography variant="body2" className="countdown-title">
        {t("beta.countdown.title")}
      </Typography>
      <Grid container spacing={1} justifyContent="center" className="countdown-grid">
        {[
          { value: timeLeft.days, label: t("beta.countdown.days") },
          { value: timeLeft.hours, label: t("beta.countdown.hours") },
          { value: timeLeft.minutes, label: t("beta.countdown.minutes") },
          { value: timeLeft.seconds, label: t("beta.countdown.seconds") },
        ].map((unit, index) => (
          <Grid item xs={3} key={index}>
            <Box className="countdown-unit">
              <Typography className="countdown-number">{unit.value < 10 ? `0${unit.value}` : unit.value}</Typography>
              <Typography className="countdown-label">{unit.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography variant="caption" color="primary.contrastText" sx={{ mt: 1, display: "block", textAlign: "center" }}>
        {t("beta.countdown.limitedSpots")}
      </Typography>
    </Box>
  )
}

export default PostRegistration
