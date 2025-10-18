import { Box } from '@mui/material'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component'
import PostRegistration from '../../../components/PostRegistration'
import { useAndCheckActiveToken } from '../../../hooks/oauth'
import DefaultLayout from '../../../layouts/DefaultLayout'
import logger from '../../../utils/logger'

const PostRegistrationPage = ({ session }) => {
  useAndCheckActiveToken()

  if (!session || session?.error) {
    logger.error('Log in to register project management')
    return (
      <DefaultLayout>
        <Box>
          <FormSkeleton />
        </Box>
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <PostRegistration />
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx) {
  const { locale } = ctx
  const session = await getSession(ctx)

  return {
    props: {
      session,
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'common.legal',
        'post-registration',
      ])),
    },
  }
}

export default PostRegistrationPage
