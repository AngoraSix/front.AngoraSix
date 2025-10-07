import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TermsAndConditionsComponent from '../../../components/Legal/TermsAndConditions'
import LandingLayout from '../../../layouts/LandingLayout'

const TermsAndConditionsPage = () => {
  return (
    <LandingLayout>
      <TermsAndConditionsComponent />
    </LandingLayout>
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
