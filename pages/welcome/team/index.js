import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamLanding from "../../../components/Landings/Team/TeamLanding"
import LandingLayout from "../../../layouts/LandingLayout"

const TeamLandingPage = () => {
  return (
    <LandingLayout>
      <TeamLanding />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "team"])),
    },
  }
}

export default TeamLandingPage
