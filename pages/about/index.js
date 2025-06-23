import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import About from "../../components/About"
import LandingLayout from "../../layouts/LandingLayout"

const AboutPage = () => {
  return <LandingLayout><About /></LandingLayout>
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "common.legal", "about"])),
    },
  }
}

export default AboutPage
