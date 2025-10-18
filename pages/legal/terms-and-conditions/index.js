import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TermsAndConditionsComponent from '../../../components/Legal/TermsAndConditions'
import DefaultLayout from '../../../layouts/DefaultLayout'

const TermsAndConditionsPage = () => {
  return (
    <DefaultLayout>
      <TermsAndConditionsComponent />
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'common.legal',
        'legal.terms',
      ])),
    },
  }
}

export default TermsAndConditionsPage
