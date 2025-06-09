import Head from "next/head"
import { Box } from "@mui/material"

const LandingLayout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title || "AngoraSix - Great Ideas Need Help"}</title>
        <meta
          name="description"
          content={
            description || "Stop failing. Start building with structure, AI guidance, and transparent collaboration."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={title || "AngoraSix - Great Ideas Need Help"} />
        <meta
          property="og:description"
          content={
            description || "Stop failing. Start building with structure, AI guidance, and transparent collaboration."
          }
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || "AngoraSix - Great Ideas Need Help"} />
        <meta
          name="twitter:description"
          content={
            description || "Stop failing. Start building with structure, AI guidance, and transparent collaboration."
          }
        />
      </Head>

      <Box component="main" sx={{ minHeight: "100vh" }}>
        {children}
      </Box>
    </>
  )
}

export default LandingLayout
