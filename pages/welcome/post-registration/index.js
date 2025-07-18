import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import PostRegistration from "../../../components/PostRegistration"
import LandingLayout from "../../../layouts/LandingLayout"

const PostRegistrationPage = ({ forQueryValue }) => {
  return (
    <LandingLayout forProfile={forQueryValue}>
      <PostRegistration />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null

  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale || "en", ["common", "common.legal", "post-registration"])),
    },
  }
}

export default PostRegistrationPage
