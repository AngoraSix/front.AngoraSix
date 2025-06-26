import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PostRegistration from "../../../components/PostRegistration"
import LandingLayout from "../../../layouts/LandingLayout"

const PostRegistrationPage = () => {
  return (
    <LandingLayout>
      <PostRegistration />
    </LandingLayout>
  )
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "common.legal", "post-registration"])),
    },
  }
}

export default PostRegistrationPage
