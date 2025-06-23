import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Container, Typography, Box, Paper } from "@mui/material"
import LandingLayout from "../../layouts/LandingLayout"

const TermsAndConditions = () => {
  const { t } = useTranslation("legal")

  return (
    <LandingLayout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {t("terms.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            {t("terms.lastUpdated")}
          </Typography>

          <Box sx={{ "& > *": { mb: 3 } }}>
            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section1.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section1.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section2.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section2.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section3.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section3.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section4.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section4.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section5.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section5.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section6.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section6.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("terms.section7.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("terms.section7.content")}
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

export default TermsAndConditions
