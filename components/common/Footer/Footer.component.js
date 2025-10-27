import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "../../../constants/constants"
import SponsorButton from "../SponsorButton"

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
  padding: theme.spacing(4, 0, 2),
}))

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
})

const Footer = () => {
  const { t } = useTranslation("common")

  const footerLinks = [
    { key: "home", href: ROUTES.home },
    { key: "methodology", href: ROUTES.methodology.overview },
    { key: "pricing", href: ROUTES.pricing },
    { key: "about", href: ROUTES.about },
    { key: "terms", href: ROUTES.legal.termsAndConditions },
    { key: "privacy", href: ROUTES.legal.privacyPolicy },
  ]

  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <LogoContainer>
              <Image src="/logos/a6-blue.png" alt="AngoraSix" width={32} height={32} />
              <Typography variant="h6" component="span" sx={{ ml: 1, fontWeight: "bold" }}>
                AngoraSix
              </Typography>
            </LogoContainer>
            <Typography variant="body2" color="text.secondary" paragraph>
              {t("footer.description")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("footer.poweredBy")}
            </Typography>

            {/* GitHub Sponsors Button */}
            <SponsorButton />
          </Grid>

          {/* Enlaces del sitio */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t("footer.sitemap")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  color="text.secondary"
                  underline="hover"
                  variant="body2"
                >
                  {t(`footer.links.${link.key}`)}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t("footer.contact")}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {t("footer.contactDescription")}
            </Typography>
            <Link
              href="mailto:team@angorasix.com"
              color="primary"
              underline="hover"
              variant="body2"
              sx={{ fontWeight: "medium" }}
            >
              team@angorasix.com
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/legal/terms-and-conditions" color="text.secondary" underline="hover" variant="body2">
              {t("footer.links.terms")}
            </Link>
            <Link href="/legal/privacy-policy" color="text.secondary" underline="hover" variant="body2">
              {t("footer.links.privacy")}
            </Link>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  )
}

export default Footer
