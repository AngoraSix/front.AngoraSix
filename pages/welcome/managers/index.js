import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ManagerLanding from "../../../components/Landings/Manager/ManagerLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const Manager2LandingPage = () => {
  return (
    <LandingLayout forProfile="manager">
      <ManagerLanding translationKey="welcome.manager.2"/>
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "welcome.manager.2"])),
    },
  }
}

export default Manager2LandingPage
