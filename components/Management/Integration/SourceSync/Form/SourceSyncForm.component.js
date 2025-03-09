import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';
import { SOURCE_SYNC_STATUS } from './SourceSyncForm.properties';
import SourceSyncFormActions from './SourceSyncFormActions';

const SourceSyncForm = ({
  formData,
  requiredStepFields,
  source,
  currentStepObj,
  onFormChange,
  actions,
  actionFns,
  isProcessing,
  wasSubmitted,
  sourceSyncStatus
}) => {
  const { t } = useTranslation('management.integration.sourcesync');
  return (
    <Box
      className={`SourceSyncForm SourceSyncForm__Container`}
    >
      {sourceSyncStatus != SOURCE_SYNC_STATUS.REGISTERED
        ? (
          <React.Fragment>
            <Box className="SourceSyncForm__Section SourceSyncForm__Section__Title">
              <Typography
                className="SourceSyncForm__Title"
                color="primary"
                variant="subtitle1"
              >
                {t(`management.integration.sourcesync.finish.title.template.${source.toLowerCase()}.${currentStepObj.key}`).replace(':stepNumber', currentStepObj.index + 1)}
              </Typography>
            </Box>
            <Box className="SourceSyncForm__Section SourceSyncForm__Section__RequiredData">
              {requiredStepFields.map((field) => {
                const fieldValue = formData[currentStepObj.index][field.key]?.[0];
                const translationKey = field.key.split(":")[0];
                return <FieldMaker
                  {...Object.fromEntries(Object.entries(field).filter(([_, value]) => value != null))}
                  key={field.key}
                  label={t(`management.integration.sourcesync.finish.field.label.${source.toLowerCase()}.${translationKey}`)}
                  withPickOneOption={true}
                  pickOneOptionValue={null}
                  pickOneOptionPrompt={t(`management.integration.sourcesync.finish.field.pickone.${source.toLowerCase()}.${translationKey}`)}
                  value={fieldValue}
                  onChange={onFormChange(currentStepObj.index, field.key)}
                  error={wasSubmitted && (fieldValue == null || fieldValue == '')}
                  fullWidth={true}
                />
              })}
            </Box>
            <Box className="SourceSyncForm__Section SourceSyncForm__Section__Actions">
              <SourceSyncFormActions
                actions={actions}
                actionFns={actionFns}
                isProcessing={isProcessing} />
            </Box>
          </React.Fragment>
        ) : (<Box className="SourceSyncForm__Section SourceSyncForm__Section__Title">
          <Typography
            className="SourceSyncForm__Title"
            color="primary"
            variant="h4"
          >
            {t(`management.integration.sourcesync.finish.title.completed`)}
          </Typography>
          <Box className="SourceSyncForm__Section SourceSyncForm__Section__Message">
            <CompletedIcon
              color="secondary" className='SourceSyncForm__Completed__Icon' fontSize='large' />
          </Box>

          <Typography
            className="SourceSyncForm__Title"
            color="primary"
            variant="subtitle1"
          >
            {t(`management.integration.sourcesync.finish.message.completed`)}
          </Typography>
        </Box>)
      }
    </Box>
  );
};

SourceSyncForm.defaultProps = {
};

SourceSyncForm.propTypes = {
  formData: PropTypes.object.isRequired,
  requiredStepFields: PropTypes.array.isRequired,
  onFormChange: PropTypes.func.isRequired,
  wasSubmitted: PropTypes.bool,
  source: PropTypes.string.isRequired,
  currentStepObj: PropTypes.object.isRequired,
};

export default SourceSyncForm;
