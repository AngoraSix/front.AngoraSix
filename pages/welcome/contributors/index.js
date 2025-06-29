import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContributorLanding from "../../../components/Landings/Contributor/ContributorLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const Contributor2LandingPage = () => {
  return (
    <LandingLayout forProfile="contributor">
      <ContributorLanding translationKey="welcome.contributor.2"/>
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "welcome.contributor.2"])),
    },
  }
}

export default Contributor2LandingPage
