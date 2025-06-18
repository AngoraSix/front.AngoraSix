import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContributorLanding from "../../../components/Landings/Contributor/ContributorLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const ContributorLandingPage = () => {
  return (
    <LandingLayout>
      <ContributorLanding />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "welcome.contributor"])),
    },
  }
}

export default ContributorLandingPage
