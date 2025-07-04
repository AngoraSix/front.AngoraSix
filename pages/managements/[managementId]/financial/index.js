import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import ManagementFinancial from "../../../../components/Management/Financial"
import ManagementDetailsLayout from "../../../../layouts/ManagementDetailsLayout"

const ManagementFinancialPage = () => {
    return (
        <ManagementDetailsLayout isAdmin={true}>
            <ManagementFinancial />
        </ManagementDetailsLayout>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "management.common", "management.financial"])),
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export default ManagementFinancialPage
