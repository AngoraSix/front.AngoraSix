"use client"

import {
  Box
} from "@mui/material";
import { useTranslation } from "next-i18next";
import Head from "next/head";

// Import SVG logos

const AuthSignin = () => {
  const { t } = useTranslation("auth.signin");

  return (
    <>
      <Head>
        <title>{t("page.title")}</title>
        <meta name="description" content={t("page.description")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box className="auth-signin-container">
      </Box>
    </>
  )
}

export default AuthSignin
