import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import PostRegistration from "../../../components/PostRegistration";
import { useAndCheckActiveToken } from '../../../hooks/oauth';
import LandingLayout from "../../../layouts/LandingLayout";
import logger from '../../../utils/logger';

const PostRegistrationPage = ({ forQueryValue, session }) => {
  useAndCheckActiveToken();

  if (!session || session?.error) {
    logger.error('Log in to register project management');
    return (
      <LandingLayout>
        <Box>
          <FormSkeleton />
        </Box>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout forProfile={forQueryValue}>
      <PostRegistration />
    </LandingLayout>
  )
}

export async function getServerSideProps(ctx) {
  const { locale, query } = ctx;
  const forQueryValue = query.for || null
  const session = await getSession(ctx);

  return {
    props: {
      forQueryValue,
      session,
      ...(await serverSideTranslations(locale || "en", ["common", "common.legal", "post-registration"])),
    },
  }
}

export default PostRegistrationPage
