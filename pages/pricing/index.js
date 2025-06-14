import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Pricing from "../../components/Pricing"
import LandingLayout from "../../layouts/LandingLayout"

const PricingPage = () => {
  return <LandingLayout>
    <Pricing />
  </LandingLayout>
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "common.legal", "pricing"])),
    },
  }
}

export default PricingPage
