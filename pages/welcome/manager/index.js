import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ManagerLanding from "../../../components/Landings/Manager/ManagerLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const ManagerLandingPage = () => {
  return (
    <LandingLayout>
      <ManagerLanding />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "manager"])),
    },
  }
}

export default ManagerLandingPage
