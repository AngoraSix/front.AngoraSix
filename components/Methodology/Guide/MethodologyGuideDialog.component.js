"use client"

import { Close as CloseIcon, CheckCircle as CheckIcon, Info as InfoIcon } from "@mui/icons-material"
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material"
import { useTranslation } from "next-i18next"
import { getItemImportance } from "./methodologyGuide.config"

const MethodologyGuideDialog = ({ open, onClose, selectedItem, toggles, getModuleIcon, renderImportanceIndicator }) => {
  const { t } = useTranslation("methodology.guide")

  if (!selectedItem) return null

  const importance = getItemImportance(selectedItem, toggles)
  const isNotApplicable = importance === 0

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="methodology-dialog">
      {/* Header */}
      <Box className="methodology-dialog-header">
        {/* Left side: icons + importance */}
        <Box className="methodology-dialog-header-left">
          {selectedItem.module && (
            <Box className="methodology-dialog-module-icon">{getModuleIcon(selectedItem.module)}</Box>
          )}
          {!isNotApplicable ? (
            <Box className="methodology-dialog-importance">{renderImportanceIndicator(importance)}</Box>
          ) : (
            <Box className="methodology-dialog-not-applicable">{t("item.notApplicableChip")}</Box>
          )}
        </Box>

        {/* Center: title */}
        <Typography variant="h5" className="methodology-dialog-title">
          {t(`items.${selectedItem.key}.title`)}
        </Typography>

        {/* Right: close button */}
        <IconButton onClick={onClose} className="methodology-dialog-close" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent className="methodology-dialog-content">
        {/* Description */}
        <Box className="methodology-dialog-section">
          <Typography className="methodology-dialog-description">
            {t(`items.${selectedItem.key}.description`)}
          </Typography>
        </Box>

        {/* Objectives */}
        <Box className="methodology-dialog-section">
          <Typography className="methodology-dialog-section-title">{t("dialog.objectives")}</Typography>
          <Box className="methodology-dialog-objectives">
            {t(`items.${selectedItem.key}.objectives`, { returnObjects: true }).map((objective, index) => (
              <Box key={index} className="methodology-dialog-objective">
                <CheckIcon className="objective-check-icon" />
                <Typography className="objective-text">{objective}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Help */}
        <Box className="methodology-dialog-section">
          <Box className="methodology-dialog-help">
            <Box className="help-header">
              <InfoIcon className="help-icon" />
              <Typography className="help-title">{t("dialog.help")}</Typography>
            </Box>
            <Typography className="help-text">{t(`items.${selectedItem.key}.help`)}</Typography>
          </Box>
        </Box>

        {/* Tools */}
        {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).length > 0 && (
          <Box className="methodology-dialog-section">
            <Typography className="methodology-dialog-section-title">{t("dialog.tools")}</Typography>
            <Box className="methodology-dialog-tools">
              {t(`items.${selectedItem.key}.tools`, { returnObjects: true }).map((tool, index) => (
                <Box key={index} className="tool-item">
                  {tool}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default MethodologyGuideDialog
