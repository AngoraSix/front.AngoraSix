"use client"

import { Box, SwipeableDrawer, useTheme, Container, Fade } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import PropTypes from "prop-types"
import { useState } from "react"
import { useTranslation } from "next-i18next"
import ManagementCapsSection from "./Sections/ManagementCapsSection"
import ManagementCoreSection from "./Sections/ManagementCoreSection"

const drawerBleeding = 56

const ProjectManagementView = ({
  project,
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
  contributorsData,
}) => {
  const { t } = useTranslation("management.view")
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleDrawer = (isOpen) => () => {
    setOpenDrawer(isOpen)
  }

  return (
    <div className="ProjectManagementView">
      <Container maxWidth="xl" sx={{ py: 3, height: "100%" }}>
        <Fade in timeout={600}>
          <div className="content-wrapper">
            <div className="main-section">
              <ManagementCapsSection
                projectManagement={projectManagement}
                projectManagementTasksStats={projectManagementTasksStats}
                projectManagementAccountingStats={projectManagementAccountingStats}
                contributorsData={contributorsData}
              />
            </div>

            {isMobile ? (
              <SwipeableDrawer
                anchor="bottom"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                  keepMounted: true,
                }}
                className="mobile-drawer"
                PaperProps={{
                  className: "mobile-drawer-paper",
                }}
              >
                <div className="drawer-header" onClick={toggleDrawer(!openDrawer)}>
                  <div className="drawer-puller" />
                </div>
                <Box sx={{ p: 2, height: "100%" }}>
                  <ManagementCoreSection project={project} projectManagement={projectManagement} />
                </Box>
              </SwipeableDrawer>
            ) : (
              <Fade in timeout={800}>
                <div className="side-section">
                  <ManagementCoreSection project={project} projectManagement={projectManagement} />
                </div>
              </Fade>
            )}
          </div>
        </Fade>
      </Container>
    </div>
  )
}

ProjectManagementView.defaultProps = {
  isAdmin: false,
  projectManagementActions: {},
}

ProjectManagementView.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  projectManagementActions: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
}

export default ProjectManagementView
