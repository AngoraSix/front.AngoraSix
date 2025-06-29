import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContributorLanding from "../../../components/Landings/Contributor/ContributorLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const ContributorLandingPage = () => {
  return (
    <LandingLayout forProfile="contributor">
      <ContributorLanding translationKey="welcome.contributor"/>
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "welcome.contributor"])),
    },
  }
}

export default ContributorLandingPage
