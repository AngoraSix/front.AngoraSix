import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { REQUIRED_SECTIONS } from './ProjectManagementForm.properties';
import ProjectManagementCoreData from './Sections/ProjectManagementCoreData.component';
import ProjectManagementBylawsData from './Sections/ProjectManagementBylawsData.component';

const ProjectManagementForm = ({
  formData,
  onFormChange,
  onSubmit,
  wasSubmitted,
  setIsSectionCompleted,
}) => {
  const { t } = useTranslation('management.edit');

  return (
    <Box
      className={`ProjectManagementForm ProjectManagementForm__Container`}
    >
      <Box className="ProjectManagementForm__Section">
        <Typography
          className="ProjectManagementForm__Section__Status"
          variant="subtitle1"
          color="primary"
        >
          {t('management.edit.form.fields.status')}
        </Typography>
        <ProjectManagementCoreData
          formData={formData}
          onFormChange={onFormChange}
          setIsCompleted={setIsSectionCompleted(REQUIRED_SECTIONS.CORE)}
          wasSubmitted={wasSubmitted}
        />
      </Box>
      <Box className="ProjectManagementForm__Section">
        <Typography
          className="ProjectManagementForm__Section__Sections"
          variant="subtitle1"
          color="primary"
        >
          {t('management.edit.form.bylaws')}
        </Typography>
        <ProjectManagementBylawsData
          formData={formData}
          onFormChange={onFormChange}
          setIsCompleted={setIsSectionCompleted(REQUIRED_SECTIONS.BYLAWS)}
          wasSubmitted={wasSubmitted}
        />
      </Box>
      <Box className="ProjectManagementForm__Section">
        <Button
          onClick={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          {t('management.edit.form.commands.save')}
        </Button>
      </Box>
    </Box>
  );
};

ProjectManagementForm.defaultProps = {
  projectManagements: {},
  wasSubmitted: false,
  setIsSectionCompleted: () => {},
};

ProjectManagementForm.propTypes = {
  formData: PropTypes.object.isRequired,
  projectManagement: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  wasSubmitted: PropTypes.bool,
  setIsSectionCompleted: PropTypes.func,
};

export default ProjectManagementForm;
