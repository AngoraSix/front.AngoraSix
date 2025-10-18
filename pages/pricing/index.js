import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Pricing from '../../components/Pricing'
import DefaultLayout from '../../layouts/DefaultLayout'

const PricingPage = () => {
  return (
    <DefaultLayout>
      <Pricing />
    </DefaultLayout>
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
