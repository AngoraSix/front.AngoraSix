import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Pricing from "../../components/Pricing"
import LandingLayout from "../../layouts/LandingLayout"

const PricingPage = ({ forQueryValue }) => {
  return <LandingLayout forProfile={forQueryValue}>
    <Pricing />
  </LandingLayout>
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null

  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale || "en", ["common", "common.legal", "pricing"])),
    },
  }
}

export default PricingPage
