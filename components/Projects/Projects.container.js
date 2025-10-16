"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import ProjectsComponent from "./Projects.component"

const ProjectsContainer = () => {
  const { data: session, status } = useSession()
  const { t } = useTranslation("projects")
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO: Fetch projects from API
    // This is where we'll call the API to get user's projects
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // API call will go here
        // const response = await api.projects.getByUser(session?.user?.id);
        // setProjects(response.data);

        // Mock data for now
        setProjects([])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchProjects()
    } else if (status === "unauthenticated") {
      setLoading(false)
    }
  }, [session, status])

  return (
    <ProjectsComponent projects={projects} loading={loading} error={error} session={session} status={status} t={t} />
  )
}

export default ProjectsContainer
