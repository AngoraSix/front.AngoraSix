import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PrivacyPolicyComponent from "../../../components/Legal/PrivacyPolicy"
import LandingLayout from "../../../layouts/LandingLayout"

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
