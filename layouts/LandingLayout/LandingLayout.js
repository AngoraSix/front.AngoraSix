import { Box } from "@mui/material"
import Head from "next/head"
import CookieConsent from "../../components/common/CookieConsent"
import Footer from "../../components/common/Footer"
import SharedNavbar from "../../components/common/SharedNavbar"

const LandingLayout = ({ children, title, description, forProfile }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SharedNavbar forProfile={forProfile} />
      <Box component="main" sx={{ minHeight: "100vh" }}>
        {children}
      </Box>
      <Footer forProfile={forProfile} />
      <CookieConsent />
    </>
  )
}

export default LandingLayout
