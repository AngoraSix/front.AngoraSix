import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import MethodologyPage from "../../components/Methodology"
import DefaultLayout from "../../layouts/DefaultLayout"

const Methodology = () => {
  return (
    <DefaultLayout>
      <MethodologyPage />
    </DefaultLayout>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "methodology"])),
    },
  }
}

export default Methodology
