import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import EnthusiastPostRegistration from "../../../../components/PostRegistration/EnthusiastPostRegistration"
import LandingLayout from "../../../../layouts/LandingLayout"

const EnthusiastPostRegistrationPage = () => {
  return (
    <LandingLayout>
      <EnthusiastPostRegistration />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "enthusiast-post-registration"])),
    },
  }
}

export default EnthusiastPostRegistrationPage
