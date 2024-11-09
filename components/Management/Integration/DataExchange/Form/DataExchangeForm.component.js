import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';

const DataExchangeForm = ({
  formData,
  requiredStepFields,
  source,
  currentStepObj,
  onFormChange
}) => {
  const { t } = useTranslation('management.integration.dataexchange');
  return (
    <Box
      className={`DataExchangeForm DataExchangeForm__Container`}
    >
      <Typography
        className="DataExchangeForm__Step"
        color="primary.main"
        variant="subtitle1"
      >
        {t(`management.integration.dataexchange.new.title.template.${source.toLowerCase()}.${currentStepObj.key}`).replace(':stepNumber', currentStepObj.number)}
      </Typography>
      {requiredStepFields.map((field) => {
        return <FieldMaker
          {...field}
          key={field.key}
          label={t(`management.integration.dataexchange.new.field.label.${source.toLowerCase()}.${field.key}`)}
          withPickOneOption={true}
          pickOneOptionValue={null}
          pickOneOptionPrompt={t(`management.integration.dataexchange.new.field.pickone.${source.toLowerCase()}.${field.key}`)}
          value={formData[field.key]}
          onChange={onFormChange(field.key)}
        />
      })}
    </Box>
  );
};

DataExchangeForm.defaultProps = {
};

DataExchangeForm.propTypes = {
  formData: PropTypes.object.isRequired,
  requiredStepFields: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired,
  // wasSubmitted: PropTypes.bool,
  source: PropTypes.string.isRequired,
  currentStepObj: PropTypes.object.isRequired,
};

export default DataExchangeForm;
