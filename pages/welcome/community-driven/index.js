import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CooperativeLanding from "../../../components/Landings/Cooperative/CooperativeLanding"
import DefaultLayout from "../../../layouts/DefaultLayout"

const CooperativeLandingPage = () => {
  return (
    <DefaultLayout forProfile="community-driven">
      <CooperativeLanding translationKey="welcome.cooperative"/>
    </DefaultLayout>
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
