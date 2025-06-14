import { useTranslation } from "next-i18next"
import { Box, Container, Typography, Link, Grid, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import Image from "next/image"

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
    { key: "home", href: "/" },
    { key: "pricing", href: "/pricing" },
    { key: "about", href: "/about" },
    { key: "terms", href: "/legal/terms-and-conditions" },
    { key: "privacy", href: "/legal/privacy-policy" },
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
          </Grid>

          {/* Enlaces del sitio */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              {t("footer.sitemap")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.map((link) => (
                <Link key={link.key} href={link.href} color="text.secondary" underline="hover" variant="body2">
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
              href="mailto:info@angorasix.com"
              color="primary"
              underline="hover"
              variant="body2"
              sx={{ fontWeight: "medium" }}
            >
              info@angorasix.com
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
