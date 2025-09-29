"use client"

import React, { useState } from "react"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import {
  Lightbulb as LightbulbIcon,
  Settings as SettingsIcon,
  Autorenew as AutorenewIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ContactMail as ContactMailIcon,
  PersonAdd as PersonAddIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material"
import { trackEvent } from "../../../utils/analytics"

const MethodologyOverviewPage = () => {
  const { t } = useTranslation("methodology.overview")
  const [openDialog, setOpenDialog] = useState(null)

  const handleStepClick = (stepId) => {
    setOpenDialog(stepId)
    trackEvent("overview_step_dialog_opened", {
      event_category: "engagement",
      event_label: "methodology_overview",
      step_id: stepId,
    })
  }

  const handleCTAClick = (ctaType) => {
    trackEvent("overview_cta_clicked", {
      event_category: "engagement",
      event_label: "methodology_overview",
      cta_type: ctaType,
    })
  }

  React.useEffect(() => {
    trackEvent("overview_seen", {
      event_category: "engagement",
      event_label: "methodology_overview",
    })
  }, [])

  const steps = [
    {
      id: "fairness",
      icon: LightbulbIcon,
      color: "#1B5993",
      lightColor: "#DCE7EA",
      position: "left",
    },
    {
      id: "parametrization",
      icon: SettingsIcon,
      color: "#0A2239",
      lightColor: "#AFC1D6",
      position: "right",
    },
    {
      id: "implementation",
      icon: AutorenewIcon,
      color: "#FE5F55",
      lightColor: "#FFE5E3",
      position: "left",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="MethodologyOverviewPage">
      {/* Hero Section */}
      <motion.section className="overview-hero" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="hero-content">
          <motion.h1 variants={itemVariants}>{t("hero.title")}</motion.h1>
          <motion.div className="hero-description" variants={itemVariants}>
            <p>{t("hero.description")}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Journey Path Section */}
      <section className="journey-section">
        <motion.div
          className="journey-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>{t("journey.title")}</motion.h2>
          <motion.p variants={itemVariants}>{t("journey.subtitle")}</motion.p>
        </motion.div>

        <div className="journey-path">
          {/* SVG Path Background */}
          <svg className="path-svg" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M 100 100 Q 400 150, 700 250 T 100 450 Q 400 550, 700 700 T 100 950"
              stroke="#DCE7EA"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </svg>

          {/* Steps */}
          <div className="journey-steps">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  className={`journey-step ${step.position}`}
                  initial={{ opacity: 0, x: step.position === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="step-number">{index + 1}</div>

                  <motion.div
                    className="step-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => handleStepClick(step.id)}
                    style={{
                      borderColor: step.color,
                    }}
                  >
                    <div className="step-icon-wrapper" style={{ backgroundColor: step.lightColor }}>
                      <Icon sx={{ fontSize: 40, color: step.color }} />
                    </div>

                    <div className="step-content">
                      <h3>{t(`journey.steps.${step.id}.title`)}</h3>
                      <p className="step-description">{t(`journey.steps.${step.id}.description`)}</p>

                      <div className="step-outcome">
                        <strong>{t("journey.outcome")}:</strong>
                        <p>{t(`journey.steps.${step.id}.outcome`)}</p>
                      </div>

                      <button className="step-details-btn">
                        {t("journey.viewCompassBonus")}
                        <ArrowForwardIcon sx={{ fontSize: 18, marginLeft: "8px" }} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTAs Section */}
      <motion.section
        className="ctas-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>{t("ctas.title")}</motion.h2>

        <motion.div className="ctas-buttons" variants={containerVariants}>
          <motion.a
            href="/services"
            className="cta-button cta-primary"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("contact")}
          >
            <ContactMailIcon sx={{ fontSize: 24 }} />
            <span>{t("ctas.contact")}</span>
          </motion.a>

          <motion.a
            href="/auth/signin"
            className="cta-button cta-secondary"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("register")}
          >
            <PersonAddIcon sx={{ fontSize: 24 }} />
            <span>{t("ctas.register")}</span>
          </motion.a>

          <motion.a
            href="/methodology/guide"
            className="cta-button cta-tertiary"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("guide")}
          >
            <ExploreIcon sx={{ fontSize: 24 }} />
            <span>{t("ctas.guide")}</span>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Compass Bonus Dialogs */}
      {steps.map((step) => (
        <Dialog
          key={step.id}
          open={openDialog === step.id}
          onClose={() => setOpenDialog(null)}
          maxWidth="md"
          fullWidth
          className="compass-dialog"
        >
          <DialogTitle>
            <div className="dialog-title-wrapper">
              <div className="dialog-icon" style={{ backgroundColor: step.lightColor }}>
                {React.createElement(step.icon, { sx: { fontSize: 32, color: step.color } })}
              </div>
              <div>
                <h3>{t(`journey.steps.${step.id}.title`)}</h3>
                <span className="dialog-subtitle">{t("journey.compassBonus")}</span>
              </div>
              <IconButton
                onClick={() => setOpenDialog(null)}
                sx={{ marginLeft: "auto" }}
                aria-label={t("common:close")}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="compass-bonus-content">
              <p>{t(`journey.steps.${step.id}.compassBonus`)}</p>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

export default MethodologyOverviewPage
