import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AuthSigninContainer from '../../../components/Auth/Signin'
import DefaultLayout from '../../../layouts/DefaultLayout'

const AuthSigninPage = ({ forQueryValue }) => {
  return (
    <DefaultLayout>
      <AuthSigninContainer forProfile={forQueryValue} />
    </DefaultLayout>
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
