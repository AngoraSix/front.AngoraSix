import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import DefaultLayout from "../../layouts/DefaultLayout"
import Services from "../../components/Services"

const ServicesPage = () => {
  const { t } = useTranslation("services")

  return (
    <>
      <Head>
        <title>{t("page.title")} - AngoraSix</title>
        <meta name="description" content={t("page.description")} />
        <meta property="og:title" content={`${t("page.title")} - AngoraSix`} />
        <meta property="og:description" content={t("page.description")} />
        <meta name="twitter:title" content={`${t("page.title")} - AngoraSix`} />
        <meta name="twitter:description" content={t("page.description")} />
      </Head>
      <DefaultLayout className="ServicesPage">
        <Services />
      </DefaultLayout>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "services"])),
    },
  }
}

export default ServicesPage
