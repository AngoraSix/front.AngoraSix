import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import About from "../../components/About"
import LandingLayout from "../../layouts/LandingLayout"

const AboutPage = ({ forQueryValue }) => {
  return <LandingLayout forProfile={forQueryValue}>
    <About />
  </LandingLayout>
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null

  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale || "en", ["common", "common.legal", "about"])),
    },
  }
}

export default AboutPage
