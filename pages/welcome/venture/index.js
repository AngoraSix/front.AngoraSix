import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamLanding from "../../../components/Landings/Team/TeamLanding"
import DefaultLayout from "../../../layouts/DefaultLayout"

const TeamLandingPage = () => {
  return (
    <DefaultLayout forProfile="venture">
      <TeamLanding translationKey="welcome.team"/>
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.team", "common.legal"])),
    },
  }
}

export default TeamLandingPage
