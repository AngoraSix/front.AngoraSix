import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import About from "../../components/About"

const AboutPage = () => {
  return <About />
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "about"])),
    },
  }
}

export default AboutPage
