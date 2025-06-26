import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import LandingLayout from "../../layouts/LandingLayout"
import PrivacyPolicyComponent from "../../components/Legal/PrivacyPolicy"

const PrivacyPolicyPage = () => {
  return (
    <LandingLayout>
      <PrivacyPolicyComponent />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "legal.privacy"])),
    },
  }
}

export default PrivacyPolicyPage
