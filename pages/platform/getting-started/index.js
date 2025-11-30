import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import GettingStarted from '../../../components/Platform/GettingStarted'
import DefaultLayout from '../../../layouts/DefaultLayout'

export default function GettingStartedPage() {
  return (
    <DefaultLayout
      contained={false}
      className="MethodologyOverviewPage__Page__Body"
    >
      <GettingStarted />
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['getting-started', 'common'])),
    },
  }
}
