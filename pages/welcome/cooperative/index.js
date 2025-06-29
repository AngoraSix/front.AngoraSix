import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CooperativeLanding from "../../../components/Landings/Cooperative/CooperativeLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const CooperativeLandingPage = () => {
  return (
    <LandingLayout forProfile="cooperative">
      <CooperativeLanding translationKey="welcome.cooperative"/>
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.cooperative", "common.legal"])),
    },
  }
}

export default CooperativeLandingPage
