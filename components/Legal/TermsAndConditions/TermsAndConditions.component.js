import { Box, Container, Paper, Typography } from "@mui/material"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import config from "../../../config"

const TermsAndConditions = () => {
  const { t } = useTranslation("legal.terms")

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" key="og.title" content={t("page.title")} />
        <meta property="og:description" key="og.description" content={t("page.description")} />
        <meta property="og:image" key="og.image" content={config.site.head.image.logoDark} />
        <meta property="og:url" key="og.url" content="https://angorasix.com/legal/terms-and-conditions" />
        <meta property="og:type" key="og.type" content="website" />
      </Head>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            {t("title")}
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            {t("lastUpdated")}
          </Typography>

          <Box sx={{ "& > *": { mb: 3 } }}>
            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section1.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section1.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section2.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section2.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section3.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section3.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section4.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section4.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section5.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section5.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section6.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section6.content")}
              </Typography>
            </section>

            <section>
              <Typography variant="h5" component="h2" gutterBottom>
                {t("section7.title")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("section7.content")}
              </Typography>
            </section>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default TermsAndConditions
