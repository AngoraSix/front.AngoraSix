import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import AuthSigninContainer from "../../../components/Auth/Signin"
import LandingLayout from "../../../layouts/LandingLayout"

const AuthSigninPage = () => {
    return (
        <LandingLayout >
            <AuthSigninContainer />
        </LandingLayout>
    )
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "common.legal", "auth.signin"])),
        },
    }
}

export default AuthSigninPage
