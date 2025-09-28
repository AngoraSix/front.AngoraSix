import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import DefaultLayout from "../../layouts/DefaultLayout"
import MethodologyPage from "../../components/Methodology"

export default function Methodology() {
  const { t } = useTranslation("methodology")

  return (
    <>
      <Head>
        <title>{t("title")} - AngoraSix</title>
        <meta name="description" content={t("subtitle")} />
        <meta property="og:title" content={`${t("title")} - AngoraSix`} />
        <meta property="og:description" content={t("subtitle")} />
        <meta name="twitter:title" content={`${t("title")} - AngoraSix`} />
        <meta name="twitter:description" content={t("subtitle")} />
      </Head>
      <DefaultLayout>
        <MethodologyPage />
      </DefaultLayout>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "methodology"])),
    },
  }
}
