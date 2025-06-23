import { getSession } from "next-auth/react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import api from "../../../api"
import PostRegistration from "../../../components/PostRegistration"
import LandingLayout from "../../../layouts/LandingLayout"

const PostRegistrationPage = ({ existingBetaApplication }) => {
  return (
    <LandingLayout>
      <PostRegistration existingBetaApplication={existingBetaApplication} />
    </LandingLayout>
  )
}

export const getServerSideProps = async (ctx) => {
  let props = {};
  const session = await getSession(ctx)
  let existingBetaApplication = null;

  if (session?.user?.email) {
    try {
      const validatedToken =
        session?.error !== 'RefreshAccessTokenError' ? session : null;
      // Check if user already has a beta application
      const surveyResponse = await api.surveys.fetchSurveyResponse("beta-applications", validatedToken)
      existingBetaApplication = surveyResponse
      props = {
        ...props,
        existingBetaApplication
      };
    } catch (error) {
      // User hasn't applied yet, which is fine
    }
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "common.legal", "post-registration"])),
    },
  }
}

export default PostRegistrationPage
