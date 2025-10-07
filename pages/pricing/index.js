import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Pricing from '../../components/Pricing'
import LandingLayout from '../../layouts/LandingLayout'

const PricingPage = () => {
  return (
    <LandingLayout>
      <Pricing />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'common.legal',
        'pricing',
      ])),
    },
  }
}

export default PricingPage
