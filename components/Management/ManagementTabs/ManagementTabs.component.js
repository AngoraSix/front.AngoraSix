import DashboardIcon from '@mui/icons-material/Dashboard';
import ContributorsIcon from '@mui/icons-material/Groups2';
import IntegrationsIcon from '@mui/icons-material/ImportExport';
import {
  Box,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '../../../constants/constants';
import { resolveRoute } from '../../../utils/api/apiHelper';

function transformPath(path) {
  return path.replace(/\/:(\w+)/g, '/[$1]').replace(/\/management\//, '/managements/');
}

const PATHS_TO_TAB_INDEX = {
  [transformPath(ROUTES.management.dashboard)]: {
    index: 0,
    key: 'dashboard',
    routePattern: ROUTES.management.dashboard,
    Icon: DashboardIcon,
    justForAdmins: false
  },
  [transformPath(ROUTES.management.integrations.view)]: {
    index: 1,
    key: 'integrations',
    routePattern: ROUTES.management.integrations.view,
    Icon: IntegrationsIcon,
    justForAdmins: true
  },
  [transformPath(ROUTES.management.contributors)]: {
    index: 2,
    key: 'contributors',
    routePattern: ROUTES.management.contributors,
    Icon: ContributorsIcon,
    justForAdmins: true
  }
}

const ManagementTabs = ({ projectManagement, isAdmin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('management.common');
  const router = useRouter();
  const { pathname } = router;

  const selectedValue = PATHS_TO_TAB_INDEX[pathname];
  return (
    <Box className="ManagementTabs ManagementTabs__Container">
      <Box className="ManagementTabs__Title">
        <Typography variant="h8" color="primary">
          {projectManagement?.project?.name}
        </Typography>
      </Box>
      <Tabs className='ManagementTabs_Tabs'
        centered={!isMobile}
        value={selectedValue.index}
        variant={isMobile ? "fullWidth" : "standard"}>
        {/* variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}> */}
        {Object.values(PATHS_TO_TAB_INDEX).filter(({ justForAdmins }) => (!justForAdmins || isAdmin)).map(({ key, routePattern, Icon }) => isMobile ?
          <Tab key={key} onClick={() => {
            router.push(resolveRoute(routePattern, projectManagement?.id))
          }} icon={<Icon />} aria-label={t(`management.common.tabs.${key}`)} />
          : <Tab key={key} onClick={() => {
            router.push(resolveRoute(routePattern, projectManagement?.id))
          }} label={t(`management.common.tabs.${key}`)} />)}
      </Tabs>
    </Box>
  );
};

ManagementTabs.propTypes = {};

export default ManagementTabs;
