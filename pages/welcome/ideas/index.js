import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import IdeasLanding from "../../../components/Landings/Ideas/IdeasLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const IdeasPage = ({ forProfile }) => {
  return (
    <LandingLayout>
      <IdeasLanding forProfile={forProfile} />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  const { for: forProfile } = query

  return {
    props: {
      forProfile: forProfile || null,
      ...(await serverSideTranslations(locale, ["common", "welcome.ideas", "common.legal", "common.languages"])),
    },
  }
}

export default IdeasPage
