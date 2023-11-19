import { Grid, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_MANAGEMENT_CORE_FORM_FIELDS as CORE_FIELDS } from '../ProjectManagementForm.properties';

const ProjectManagementCoreData = ({
  formData,
  onFormChange,
  setIsCompleted,
  wasSubmitted,
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
    <div className="ProjectManagementCoreData ProjectManagementCoreData__Container ProjectManagementForm__Section__Container">
      <Grid
        className="ProjectManagementForm__Section__Fields ProjectManagementCoreData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <Select
            {...CORE_FIELDS.status}
            label={
              formData.status
                ? t('project-management.edit.form.fields.status')
                : t(CORE_FIELDS.status.label)
            }
            value={formData.status || ''}
            onChange={onFieldChange('status')}
            fullWidth
            error={
              wasSubmitted && CORE_FIELDS.status.required && !formData.status
            }
          >
            {CORE_FIELDS.status.options.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {t(option.label)}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
};

ProjectManagementCoreData.defaultProps = {
  formData: {},
  setIsCompleted: () => {},
};

ProjectManagementCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  wasSubmitted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
};

export default ProjectManagementCoreData;
