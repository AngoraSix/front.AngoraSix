import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ContributorPostRegistration from "../../../../components/PostRegistration/ContributorPostRegistration"
import LandingLayout from "../../../../layouts/LandingLayout"

const ContributorPostRegistrationPage = () => {
  return (
    <LandingLayout>
      <ContributorPostRegistration />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.contributor.post-registration"])),
    },
  }
}

export default ContributorPostRegistrationPage
