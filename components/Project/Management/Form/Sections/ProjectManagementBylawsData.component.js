import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_MANAGEMENT_BYLAWS_SUPPORTED_BYLAWS as SUPPORTED_BYLAWS } from '../ProjectManagementForm.properties';

const ProjectManagementBylawsData = ({
  formData,
  onFormChange,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {
  const { t } = useTranslation('project-management.edit');
  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    // we only have one field in this section
    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(event);
  };

  return (
    <div className="ProjectManagementBylawsData ProjectManagementBylawsData__Container ProjectManagementForm__Section__Container">
      <Grid
        className="ProjectManagementForm__Section__Fields ProjectManagementBylawsData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        {SUPPORTED_BYLAWS.map((bylawKey) => (
          <Grid item xs={5}>
            <TextField
              label={t(
                `project-management.edit.form.fields.bylaws.${bylawKey}`
              )}
              value={formData.bylaws?.[bylawKey] || ''}
              onChange={onFieldChange(`bylaws.${bylawKey}`)}
              fullWidth
              // error={wasSubmitted && CORE_FIELDS.name.required && !formData.name}
              onKeyPress={onInputKeyPressed}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ProjectManagementBylawsData.defaultProps = {
  formData: {},
  setIsCompleted: () => {},
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectManagementBylawsData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  setIsCompleted: PropTypes.func,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectManagementBylawsData;
