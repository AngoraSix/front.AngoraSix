import Head from "next/head"
import { Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "../../theme"

const RootLayout = ({ children, title, description }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{title || "AngoraSix"}</title>
        <meta name="description" content={description || "Great Ideas Need Help"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default RootLayout
