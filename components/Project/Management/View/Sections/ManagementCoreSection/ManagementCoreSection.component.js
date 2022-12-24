import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

const ManagementCoreSection = ({ project, projectManagement }) => {
  const { t } = useTranslation('project-management.view');
  const theme = useTheme();

  return (
    <Box
      className="ManagementCoreSection ManagementCoreSection__Container"
      sx={{
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <Box className="ManagementCoreSection__Field">
        <Box className="ManagementCoreSection__Field__Title">
          <Typography align="center">
            {t('project-management.view.status')}
          </Typography>
        </Box>
        <Box className="ManagementCoreSection__Field__Value">
          <Typography
            align="center"
            variant="h6"
            component="h4"
            color="primary.contrastText"
          >
            {t(`project-management.view.status.${projectManagement.status}`)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

ManagementCoreSection.defaultProps = {
  isAdmin: false,
};

ManagementCoreSection.propTypes = {
  project: PropTypes.object.isRequired,
  projectManagement: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ManagementCoreSection;
