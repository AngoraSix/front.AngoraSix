import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ManagerLanding from "../../../components/Landings/Manager/ManagerLanding"
import DefaultLayout from "../../../layouts/DefaultLayout"

const ManagerLandingPage = () => {
  return (
    <DefaultLayout forProfile="manager">
      <ManagerLanding translationKey="welcome.manager"/>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "welcome.manager"])),
    },
  }
}

export default ManagerLandingPage
