import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PostRegistration from "../../../components/PostRegistration"

const PostRegistrationPage = () => {
  return <PostRegistration />
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["common", "post-registration"])),
    },
  }
}

export default PostRegistrationPage
