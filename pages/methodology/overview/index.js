import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import DefaultLayout from "../../../layouts/DefaultLayout"
import MethodologyOverview from "../../../components/Methodology/Overview"

export default function MethodologyOverviewPage() {
  return (
    <DefaultLayout contained={false} className="MethodologyOverviewPage__Page__Body">
      <MethodologyOverview />
    </DefaultLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "methodology.overview"])),
    },
  }
}
