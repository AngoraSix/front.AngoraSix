import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import LandingLayout from "../../../layouts/LandingLayout"
import TermsAndConditionsComponent from "../../../components/Legal/TermsAndConditions"

const TermsAndConditionsPage = () => {
  return (
    <LandingLayout>
      <TermsAndConditionsComponent />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "common.legal", "legal.terms"])),
    },
  }
}

export default TermsAndConditionsPage
