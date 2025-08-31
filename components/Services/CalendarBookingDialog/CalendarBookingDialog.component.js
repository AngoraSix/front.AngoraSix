"use client"

import { Close as CloseIcon, Event as EventIcon, VideoCall as VideoCallIcon } from "@mui/icons-material"
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material"
import { useTranslation } from "next-i18next"
import { useState } from "react"
import config from "../../../config"
import { GOOGLE_CALENDAR } from "../../../constants/constants"

const CalendarBookingDialog = ({ open, onClose }) => {
    const { t } = useTranslation("services")
    const [isLoading, setIsLoading] = useState(true)

    const handleIframeLoad = () => {
        setIsLoading(false)
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className="calendar-booking-dialog"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minHeight: "70vh",
                },
            }}
        >
            <DialogTitle className="calendar-dialog-title">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <EventIcon color="primary" />
                        <Typography variant="h5" component="div" fontWeight={600}>
                            {t("calendar.title")}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small" className="calendar-close-button">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent className="calendar-dialog-content" sx={{ p: 0 }}>
                <Box className="calendar-intro" sx={{ p: 3, pb: 2 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {t("calendar.description")}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} sx={{ mb: 2 }}>
                        <VideoCallIcon color="primary" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                            {t("calendar.meetingType")}
                        </Typography>
                    </Box>
                </Box>

                <Box className="calendar-container" sx={{ position: "relative", height: "500px" }}>
                    {isLoading && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                zIndex: 1,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                    <iframe
                        src={GOOGLE_CALENDAR.EMBED_BASE_URL.replace(":googleCalendarId", config.google.calendarId)}
                        style={{
                            border: GOOGLE_CALENDAR.FRAMEBORDER,
                            width: GOOGLE_CALENDAR.WIDTH,
                            height: GOOGLE_CALENDAR.HEIGHT,
                            display: isLoading ? "none" : "block",
                        }}
                        onLoad={handleIframeLoad}
                        title="Calendar Agenda View"
                    />
                </Box>
            </DialogContent>

            <DialogActions className="calendar-dialog-actions" sx={{ p: 3, pt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {t("calendar.footer")}
                </Typography>
                <Button onClick={onClose} variant="outlined">
                    {t("calendar.close")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CalendarBookingDialog
