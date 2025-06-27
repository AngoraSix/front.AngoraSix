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
        <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sectionNumber) => (
              <section key={sectionNumber}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {t(`section${sectionNumber}.title`)}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t(`section${sectionNumber}.content`)}
                </Typography>
              </section>
            ))}
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export default TermsAndConditions
