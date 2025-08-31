import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import IdeasLanding from "../../../components/Landings/Ideas/IdeasLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const IdeasPage = () => {
  return (
    <LandingLayout forProfile="ideas">
      <IdeasLanding translationKey="welcome.ideas" />
    </LandingLayout>
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
