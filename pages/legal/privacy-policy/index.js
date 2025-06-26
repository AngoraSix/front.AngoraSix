import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PrivacyPolicyComponent from "../../../components/Legal/PrivacyPolicy"
import LandingLayout from "../../../layouts/LandingLayout"

const PrivacyPolicyPage = ({ forQueryValue }) => {
  return (
    <LandingLayout forProfile={forQueryValue}>
      <PrivacyPolicyComponent />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null

  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale, [
        "common",
        "common.legal",
        "legal.privacy",
      ])),
    },
  }
}

export default PrivacyPolicyPage
