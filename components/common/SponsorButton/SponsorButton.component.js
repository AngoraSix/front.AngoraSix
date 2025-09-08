import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"

const SponsorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))

const SponsorIframe = styled("iframe")(({ theme }) => ({
  border: 0,
  borderRadius: 6,
}))

const SponsorButton = () => {
  const { t } = useTranslation("common")

  return (
    <SponsorContainer>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", fontWeight: "medium" }}>
        {t("footer.sponsor.support")}
      </Typography>
      <SponsorIframe
        src="https://github.com/sponsors/AngoraSix/button"
        title="Sponsor AngoraSix"
        height="32"
        width="114"
      />
    </SponsorContainer>
  )
}

export default SponsorButton
