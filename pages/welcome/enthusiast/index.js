import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import EnthusiastLanding from "../../../components/Landings/Enthusiast/EnthusiastLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const EnthusiastLandingPage = () => {
  return (
    <LandingLayout>
      <EnthusiastLanding />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "enthusiast"])),
    },
  }
}

export default EnthusiastLandingPage
