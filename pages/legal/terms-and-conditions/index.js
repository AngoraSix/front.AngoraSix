import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TermsAndConditionsComponent from "../../../components/Legal/TermsAndConditions"
import LandingLayout from "../../../layouts/LandingLayout"

const TermsAndConditionsPage = ({ forQueryValue }) => {
  return (
    <LandingLayout forProfile={forQueryValue}>
      <TermsAndConditionsComponent />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null

  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale, ["common", "common.legal", "legal.terms"])),
    },
  }
}

export default TermsAndConditionsPage
