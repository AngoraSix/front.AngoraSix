import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CooperativeLanding from "../../../components/Landings/Cooperative/CooperativeLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const CooperativeLandingPage = () => {
  return (
    <LandingLayout>
      <CooperativeLanding />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.cooperative", "common.legal"])),
    },
  }
}

export default CooperativeLandingPage
