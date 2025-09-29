import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import  MethodologyGuide from "../../../components/Methodology/Guide"
import DefaultLayout from "../../../layouts/DefaultLayout"

const MethodologyGuidePage = () => {
  return (
    <DefaultLayout>
      <MethodologyGuide />
    </DefaultLayout>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "methodology.guide"])),
    },
  }
}

export default MethodologyGuidePage
