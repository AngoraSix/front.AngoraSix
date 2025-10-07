import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import About from '../../components/About'
import LandingLayout from '../../layouts/LandingLayout'

const AboutPage = () => {
  return (
    <LandingLayout>
      <About />
    </LandingLayout>
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
