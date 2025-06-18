import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamPostRegistration from "../../../../components/PostRegistration/TeamPostRegistration"
import LandingLayout from "../../../../layouts/LandingLayout"

const TeamPostRegistrationPage = () => {
  return (
    <LandingLayout>
      <TeamPostRegistration />
    </LandingLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "welcome.team.post-registration"])),
    },
  }
}

export default TeamPostRegistrationPage
