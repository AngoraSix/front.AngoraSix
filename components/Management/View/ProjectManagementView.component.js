import { Box, SwipeableDrawer, useTheme, Container, Fade } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled } from "@mui/system"
import PropTypes from "prop-types"
import { useState } from "react"
import ManagementCapsSection from "./Sections/ManagementCapsSection"
import ManagementCoreSection from "./Sections/ManagementCoreSection"

const drawerBleeding = 56

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    background:
      "radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}))

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}))

const MainSection = styled(Box)(({ theme }) => ({
  flex: "1 1 70%",
  minWidth: 0,
}))

const SideSection = styled(Box)(({ theme }) => ({
  flex: "1 1 30%",
  maxWidth: 400,
  minWidth: 320,
  [theme.breakpoints.down("lg")]: {
    maxWidth: 350,
    minWidth: 300,
  },
}))

const StyledDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    overflow: "visible",
    height: `calc(75% - 56px)`,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  },
}))

const DrawerPuller = styled(Box)(({ theme }) => ({
  width: 40,
  height: 6,
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  borderRadius: 3,
  position: "absolute",
  top: 16,
  left: "calc(50% - 20px)",
}))

const DrawerHeader = styled(Box)(({ theme }) => ({
  height: drawerBleeding,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
}))

const ProjectManagementView = ({
  project,
  projectManagement,
  projectManagementTasksStats,
  projectManagementAccountingStats,
  contributorsData
}) => {
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleDrawer = (isOpen) => () => {
    setOpenDrawer(isOpen)
  }

  return (
    <MainContainer>
      <Container className="ProjectManagementView" maxWidth="xl" sx={{ py: 3, height: "100%" }}>
        <Fade in timeout={600}>
          <ContentWrapper>
            <MainSection>
              <ManagementCapsSection
                projectManagement={projectManagement}
                projectManagementTasksStats={projectManagementTasksStats}
                projectManagementAccountingStats={projectManagementAccountingStats}
                contributorsData={contributorsData}
              />
            </MainSection>

            {isMobile ? (
              <StyledDrawer
                anchor="bottom"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <DrawerHeader onClick={toggleDrawer(!openDrawer)}>
                  <DrawerPuller />
                </DrawerHeader>
                <Box sx={{ p: 2, height: "100%" }}>
                  <ManagementCoreSection project={project} projectManagement={projectManagement} />
                </Box>
              </StyledDrawer>
            ) : (
              <Fade in timeout={800}>
                <SideSection>
                  <ManagementCoreSection project={project} projectManagement={projectManagement} />
                </SideSection>
              </Fade>
            )}
          </ContentWrapper>
        </Fade>
      </Container>
    </MainContainer>
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
