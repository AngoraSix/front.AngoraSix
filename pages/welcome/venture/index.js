import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamLanding from "../../../components/Landings/Team/TeamLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const TeamLandingPage = () => {
  return (
    <LandingLayout forProfile="venture">
      <TeamLanding translationKey="welcome.team"/>
    </LandingLayout>
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
