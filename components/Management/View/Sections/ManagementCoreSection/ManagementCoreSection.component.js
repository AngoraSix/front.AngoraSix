import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const translateOrValue = (t, i18n, i18nKey, value) => {
  const resolvedValue = i18n.exists(i18nKey, {
    ns: 'management.view',
  }) ? t(i18nKey)
    : (typeof value === 'string' || value instanceof String)
      ? capitalizeFirstLetter(value)
      : value;

  return String(resolvedValue);
};

const ManagementCoreSection = ({ project, projectManagement }) => {
  const { t, i18n } = useTranslation('management.view');
  const theme = useTheme();

  return (
    <Box
      className="ManagementCoreSection ManagementCoreSection__Container"
      sx={{
        backgroundColor: theme.palette.primary.main,
        minWidth: '200px',
      }}
    >
      <Box className="ManagementCoreSection__Status">
        <Box className="ManagementCoreSection__Field">
          <Box className="ManagementCoreSection__Field__Title">
            <Typography
              variant="h6"
              align="center"
              color="primary.contrastText"
            >
              {t('management.view.status')}
            </Typography>
          </Box>
          <Box className="ManagementCoreSection__Field__Value">
            <Typography
              align="center"
              variant="body1"
              color="primary.contrastText"
            >
              {t(`management.view.status.${projectManagement.status}`)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="ManagementCoreSection__Bylaws">
        <Grid container spacing={2}>
          {Object.entries(projectManagement.constitution.bylaws).map(([scope, bylaw]) => {
            return (
              <Grid item xs={12} key={scope}>
                <Box className="ManagementCoreSection__Field">
                  {(typeof bylaw.definition != "boolean" || bylaw.definition) && <Box className="ManagementCoreSection__Field__Title">
                    <Typography align="center"
                      color="primary.contrastText">
                      {translateOrValue(
                        t,
                        i18n,
                        `management.view.bylaws.${scope}`,
                        scope
                      )}
                    </Typography>
                  </Box>}
                  {(typeof bylaw.definition != "boolean") && <Box className="ManagementCoreSection__Field__Value">
                    <Typography align="center" color="primary.contrastText">
                      {translateOrValue(
                        t,
                        i18n,
                        `management.view.bylaws.${scope}.${bylaw.definition}`,
                        bylaw.definition
                      )}
                    </Typography>
                  </Box>}
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
