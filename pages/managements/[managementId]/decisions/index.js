"use client"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession } from "next-auth/react"
import ManagementDetailsLayout from "../../../../layouts/ManagementDetailsLayout"
import ManagementDecisions from "../../../../components/Management/Decisions"

const ManagementDecisionsPage = () => {
  const { t } = useTranslation(["management.decisions", "common"])
  const router = useRouter()
  const { data: session } = useSession()
  const { managementId } = router.query

  // Mock data - en producción vendría del backend
  const [decisionsData, setDecisionsData] = useState({
    ownership: {
      userId: "user123",
      projectId: managementId,
      ownershipPercentage: 35.2,
    },
    decisions: [
      {
        id: "decision1",
        title: "Distribución de utilidades Q3",
        description: "Definamos qué porcentaje de los ingresos será distribuido entre los socios este trimestre.",
        status: "open",
        deadline: "2025-07-10",
        vote: null,
        options: [
          { label: "20%", votes: 0, percentage: 0 },
          { label: "30%", votes: 2, percentage: 39.37 },
          { label: "40%", votes: 1, percentage: 25.43 },
        ],
        totalEligibleVoters: 4,
        votedUserIds: ["user456", "user789", "user101"],
      },
      {
        id: "decision2",
        title: "Incorporación de nuevo socio",
        description: "¿Aprobás la incorporación de Alejandra como miembro formal del equipo?",
        status: "closed",
        deadline: "2025-06-10",
        vote: "Sí",
        options: [
          { label: "Sí", votes: 2, percentage: 61.77 },
          { label: "No", votes: 2, percentage: 38.23 },
        ],
        totalEligibleVoters: 4,
        votedUserIds: ["user123", "user456", "user789", "user101"],
      },
      {
        id: "decision3",
        title: "Presupuesto para marketing digital",
        description:
          "Aprobación del presupuesto mensual destinado a campañas de marketing digital y publicidad online.",
        status: "open",
        deadline: "2025-07-15",
        options: [
          { label: "$5,000", votes: 0, percentage: 25.43 },
          { label: "$7,500", votes: 0, percentage: 25.43 },
          { label: "$10,000", votes: 1, percentage: 25.43 },
        ],
        totalEligibleVoters: 4,
        votedUserIds: ["user456"],
      },
    ],
  })

  const [loading, setLoading] = useState(false)

  return (
    <ManagementDetailsLayout isAdmin={true}>
      <ManagementDecisions decisionsData={decisionsData} loading={loading} managementId={managementId} />
    </ManagementDetailsLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["management.decisions", "management.common", "common"])),
    },
  }
}

export default ManagementDecisionsPage
