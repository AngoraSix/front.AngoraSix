"use client"

import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { useState } from "react"
import ManagementDecisions from "../../../../components/Management/Decisions"
import ManagementDetailsLayout from "../../../../layouts/ManagementDetailsLayout"

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
        title: "Q3 Profit Distribution",
        description: "Let's define what percentage of the income will be distributed among members this quarter.",
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
        title: "New Member Admission",
        description: "Do you approve the admission of Alejandra as a formal team member?",
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
        title: "Digital Marketing Budget",
        description: "Approval of the monthly budget allocated to digital marketing and online advertising campaigns.",
        status: "open",
        deadline: "2025-07-15",
        vote: null,
        options: [
          { label: "$5,000", votes: 0, percentage: 0 },
          { label: "$7,500", votes: 0, percentage: 0 },
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
