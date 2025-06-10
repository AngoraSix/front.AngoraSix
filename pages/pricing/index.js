import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Pricing from "../../components/Pricing"

const PricingPage = () => {
  return <Pricing />
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "pricing"])),
    },
  }
}

export default PricingPage
