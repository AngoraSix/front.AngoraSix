import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Services from "../../components/Services"
import LandingLayout from "../../layouts/LandingLayout"

const ServicesPage = ({ forQueryValue }) => {
  return <LandingLayout forProfile={forQueryValue}>
    <Services forProfile={forQueryValue} />
  </LandingLayout>
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null
  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale || "en", ["common", "common.legal", "services"])),
    },
  }
}

export default ServicesPage
