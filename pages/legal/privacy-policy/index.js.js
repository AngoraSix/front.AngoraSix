import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Container, Typography, Box, Paper } from "@mui/material"
import LandingLayout from "../../layouts/LandingLayout"

const PrivacyPolicy = () => {
  const { t } = useTranslation("legal")

  return (
    <LandingLayout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {t("privacy.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            {t("privacy.lastUpdated")}
          </Typography>

          <Box sx={{ "& > *": { mb: 3 } }}>
            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section1.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section1.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section2.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section2.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section3.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section3.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section4.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section4.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section5.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section5.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section6.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section6.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("privacy.section7.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("privacy.section7.content")}
              </Typography>
            </section>
          </Box>
        </Paper>
      </Container>
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "legal"])),
    },
  }
}

export default PrivacyPolicy
