import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import CooperativeLanding from "../../../components/Landings/Cooperative/CooperativeLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const Cooperative2LandingPage = () => {
  return (
    <LandingLayout>
      <CooperativeLanding translationKey="welcome.cooperative.2"/>
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.cooperative.2", "common.legal"])),
    },
  }
}

export default Cooperative2LandingPage
