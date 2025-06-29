import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamLanding from "../../../components/Landings/Team/TeamLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const Team2LandingPage = () => {
  return (
    <LandingLayout forProfile="venture">
      <TeamLanding translationKey="welcome.team.2"/>
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.team.2", "common.legal"])),
    },
  }
}

export default Team2LandingPage
