import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import About from '../../components/About'
import DefaultLayout from '../../layouts/DefaultLayout'

const AboutPage = () => {
  return (
    <DefaultLayout>
      <About />
    </DefaultLayout>
  )
}

export async function getServerSideProps({ locale, query }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', [
        'common',
        'common.legal',
        'about',
      ])),
    },
  }
}

export default AboutPage
