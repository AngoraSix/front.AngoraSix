import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Services from '../../components/Services'
import LandingLayout from '../../layouts/LandingLayout'

const ServicesPage = () => {
  return (
    <LandingLayout>
      <Services />
    </LandingLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'common.legal',
        'services',
      ])),
    },
  }
}

export default ServicesPage
