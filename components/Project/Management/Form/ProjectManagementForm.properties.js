export const PROJECT_MANAGEMENT_CORE_FORM_FIELDS = {
  status: {
    key: 'status',
    label: 'project-management.edit.form.wizard-fields.status',
    required: true,
    options: [
      {
        key: 'idea',
        label: 'project-management.edit.form.wizard-fields.status.IDEA',
      },
      {
        key: 'startup',
        label: 'project-management.edit.form.wizard-fields.status.STARTUP',
      },
      {
        key: 'operational',
        label: 'project-management.edit.form.wizard-fields.status.OPERATIONAL',
      },
    ],
  },
};

export const PROJECT_MANAGEMENT_BYLAWS_SUPPORTED_BYLAWS = [
  // @TODO: Update this for dynamic fetch of supported bylaws
  // Trello-iei7GXRW
  // Trello-o45Q2gcs
  'OPERATION_CORE_RETRIBUTION_MODEL',
  'DECISION_MECHANISM',
  'OWNERSHIP_MECHANISM',
  'STARTUP_MIN_RELEASE_DATE',
  'STARTUP_MAX_RELEASE_DATE',
  'STARTUP_RETRIBUTION_PERIOD',
  'STARTUP_RETRIBUTION_MODEL',
];

export const REQUIRED_SECTIONS = {
  MANAGEMENT_CORE: 'MANAGEMENT_CORE',
  BYLAWS: 'BYLAWS',
};

const projectManagementFormProperties = {
  core: PROJECT_MANAGEMENT_CORE_FORM_FIELDS,
  bylaws: PROJECT_MANAGEMENT_BYLAWS_SUPPORTED_BYLAWS,
  requiredSections: REQUIRED_SECTIONS,
};

export default projectManagementFormProperties;