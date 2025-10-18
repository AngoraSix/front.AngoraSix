import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContributorLanding from "../../../components/Landings/Contributor/ContributorLanding"
import DefaultLayout from "../../../layouts/DefaultLayout"

const ContributorLandingPage = () => {
  return (
    <DefaultLayout forProfile="contributor">
      <ContributorLanding translationKey="welcome.contributor"/>
    </DefaultLayout>
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
