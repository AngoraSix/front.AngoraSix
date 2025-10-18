import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PrivacyPolicyComponent from '../../../components/Legal/PrivacyPolicy'
import DefaultLayout from '../../../layouts/DefaultLayout'

const PrivacyPolicyPage = () => {
  return (
    <DefaultLayout>
      <PrivacyPolicyComponent />
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'common.legal',
        'legal.privacy',
      ])),
    },
  }
}

export default PrivacyPolicyPage
