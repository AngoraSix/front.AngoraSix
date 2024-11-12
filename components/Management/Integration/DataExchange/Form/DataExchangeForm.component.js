import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';
import DataExchangeFormActions from './DataExchangeFormActions';

const DataExchangeForm = ({
  formData,
  requiredStepFields,
  source,
  currentStepObj,
  onFormChange,
  actions,
  actionFns,
  isProcessing,
  wasSubmitted
}) => {
  const { t } = useTranslation('management.integration.dataexchange');
  return (
    <Box
      className={`DataExchangeForm DataExchangeForm__Container`}
    >
      <Box className="DataExchangeForm__Section DataExchangeForm__Section__RequiredData">
        <Typography
          className="DataExchangeForm__Step"
          color="primary.main"
          variant="subtitle1"
        >
          {t(`management.integration.dataexchange.new.title.template.${source.toLowerCase()}.${currentStepObj.key}`).replace(':stepNumber', currentStepObj.index + 1)}
        </Typography>
        {requiredStepFields.map((field) => {
          const fieldValue = formData[currentStepObj.index][field.key]
          return <FieldMaker
            {...Object.fromEntries(Object.entries(field).filter(([_, value]) => value != null))}
            key={field.key}
            label={t(`management.integration.dataexchange.new.field.label.${source.toLowerCase()}.${field.key}`)}
            withPickOneOption={true}
            pickOneOptionValue={null}
            pickOneOptionPrompt={t(`management.integration.dataexchange.new.field.pickone.${source.toLowerCase()}.${field.key}`)}
            value={fieldValue}
            onChange={onFormChange(currentStepObj.index, field.key)}
            error={wasSubmitted && (fieldValue == null || fieldValue == '')}
          />
        })}
      </Box>
      <Box className="DataExchangeForm__Section DataExchangeForm__Section__Actions">
        <DataExchangeFormActions
          actions={actions}
          actionFns={actionFns}
          isProcessing={isProcessing} />
      </Box>
    </Box>
  );
};

DataExchangeForm.defaultProps = {
};

DataExchangeForm.propTypes = {
  formData: PropTypes.object.isRequired,
  requiredStepFields: PropTypes.array.isRequired,
  onFormChange: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired,
  // wasSubmitted: PropTypes.bool,
  source: PropTypes.string.isRequired,
  currentStepObj: PropTypes.object.isRequired,
};

export default DataExchangeForm;
