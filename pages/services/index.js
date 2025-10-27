import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Services from '../../components/Services'
import DefaultLayout from '../../layouts/DefaultLayout'

const ServicesPage = () => {
  return (
    <DefaultLayout>
      <Services />
    </DefaultLayout>
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
