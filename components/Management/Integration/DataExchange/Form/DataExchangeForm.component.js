import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';
import { DATA_EXCHANGE_STATUS } from './DataExchangeForm.properties';
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
  wasSubmitted,
  dataExchangeStatus
}) => {
  const { t } = useTranslation('management.integration.dataexchange');
  return (
    <Box
      className={`DataExchangeForm DataExchangeForm__Container`}
    >
      {dataExchangeStatus != DATA_EXCHANGE_STATUS.COMPLETED
        ? (
          <React.Fragment>
            <Box className="DataExchangeForm__Section DataExchangeForm__Section__Title">
              <Typography
                className="DataExchangeForm__Title"
                color="primary.main"
                variant="subtitle1"
              >
                {t(`management.integration.dataexchange.new.title.template.${source.toLowerCase()}.${currentStepObj.key}`).replace(':stepNumber', currentStepObj.index + 1)}
              </Typography>
            </Box>
            <Box className="DataExchangeForm__Section DataExchangeForm__Section__RequiredData">
              {requiredStepFields.map((field) => {
                const fieldValue = formData[currentStepObj.index][field.key]?.[0];
                const translationKey = field.key.split(":")[0];
                return <FieldMaker
                  {...Object.fromEntries(Object.entries(field).filter(([_, value]) => value != null))}
                  key={field.key}
                  label={t(`management.integration.dataexchange.new.field.label.${source.toLowerCase()}.${translationKey}`)}
                  withPickOneOption={true}
                  pickOneOptionValue={null}
                  pickOneOptionPrompt={t(`management.integration.dataexchange.new.field.pickone.${source.toLowerCase()}.${translationKey}`)}
                  value={fieldValue}
                  onChange={onFormChange(currentStepObj.index, field.key)}
                  error={wasSubmitted && (fieldValue == null || fieldValue == '')}
                  fullWidth={true}
                />
              })}
            </Box>
            <Box className="DataExchangeForm__Section DataExchangeForm__Section__Actions">
              <DataExchangeFormActions
                actions={actions}
                actionFns={actionFns}
                isProcessing={isProcessing} />
            </Box>
          </React.Fragment>
        )
        : (<Box className="DataExchangeForm__Section DataExchangeForm__Section__Title">
          <Typography
            className="DataExchangeForm__Title"
            color="primary.main"
            variant="h4"
          >
            {t(`management.integration.dataexchange.new.title.completed`)}
          </Typography>
          <Box className="DataExchangeForm__Section DataExchangeForm__Section__Message">
            <CompletedIcon
              color="secondary" className='DataExchangeForm__Completed__Icon' fontSize='large' />
          </Box>

          <Typography
            className="DataExchangeForm__Title"
            color="primary.main"
            variant="subtitle1"
          >
            {t(`management.integration.dataexchange.new.message.completed`)}
          </Typography>
        </Box>)
      }
    </Box>
  );
};

DataExchangeForm.defaultProps = {
};

DataExchangeForm.propTypes = {
  formData: PropTypes.object.isRequired,
  requiredStepFields: PropTypes.array.isRequired,
  onFormChange: PropTypes.func.isRequired,
  wasSubmitted: PropTypes.bool,
  source: PropTypes.string.isRequired,
  currentStepObj: PropTypes.object.isRequired,
};

export default DataExchangeForm;
