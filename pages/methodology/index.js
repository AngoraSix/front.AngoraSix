"use client"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useEffect } from "react"
import { useRouter } from "next/router"

const MethodologyIndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/methodology/overview")
  }, [router])

  return null
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

export default MethodologyIndexPage
