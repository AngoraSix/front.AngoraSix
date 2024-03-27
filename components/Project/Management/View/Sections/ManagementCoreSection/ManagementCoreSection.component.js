import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const translateOrValue = (t, i18n, i18nKey, value) => {
  return i18n.exists(i18nKey, {
    ns: 'project-management.view',
  })
    ? t(i18nKey)
    : capitalizeFirstLetter(value);
};

const ManagementCoreSection = ({ project, projectManagement }) => {
  const { t, i18n } = useTranslation('project-management.view');
  const theme = useTheme();

  return (
    <Box
      className="ManagementCoreSection ManagementCoreSection__Container"
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box className="ManagementCoreSection__Status">
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
      <Box className="ManagementCoreSection__Bylaws">
        <Grid container spacing={2}>
          {projectManagement.constitution.bylaws.map((bylaw) => {
            return (
              <Grid item xs={6} key={bylaw.scope}>
                <Box className="ManagementCoreSection__Field">
                  <Box className="ManagementCoreSection__Field__Title">
                    <Typography align="center">
                      {translateOrValue(
                        t,
                        i18n,
                        `project-management.view.bylaws.${bylaw.scope}`,
                        bylaw.scope
                      )}
                    </Typography>
                  </Box>
                  <Box className="ManagementCoreSection__Field__Value">
                    <Typography align="center" color="primary.contrastText">
                      {translateOrValue(
                        t,
                        i18n,
                        `project-management.view.bylaws.${bylaw.scope}.${bylaw.definition}`,
                        bylaw.definition
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
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
