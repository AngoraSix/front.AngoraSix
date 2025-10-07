import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AuthSigninContainer from '../../../components/Auth/Signin'
import LandingLayout from '../../../layouts/LandingLayout'

const AuthSigninPage = ({ forQueryValue }) => {
  return (
    <LandingLayout>
      <AuthSigninContainer forProfile={forQueryValue} />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  const forQueryValue = query.for || null
  return {
    props: {
      forQueryValue,
      ...(await serverSideTranslations(locale, [
        'common',
        'common.legal',
        'auth.signin',
      ])),
    },
  }
}

export default AuthSigninPage
