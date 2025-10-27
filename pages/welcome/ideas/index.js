import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import IdeasLanding from "../../../components/Landings/Ideas/IdeasLanding"
import DefaultLayout from "../../../layouts/DefaultLayout"

const IdeasPage = () => {
  return (
    <DefaultLayout forProfile="ideas">
      <IdeasLanding translationKey="welcome.ideas" />
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.ideas", "common.legal"])),
    },
  }
}

export default IdeasPage
