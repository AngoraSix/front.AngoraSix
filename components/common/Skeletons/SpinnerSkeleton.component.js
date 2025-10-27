import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

const SpinnerSkeleton = () => {

  const { t } = useTranslation('common');

  return <React.Fragment><Box className="SkeletonSpinner__Text"><Typography
    align="center"
    variant="h6"
    component="h2"
    color="primary"
  >
    {t('interactions.in-progress.text')}
  </Typography>
  </Box>
    <Box className="ManagementIntegrationInteraction__Content" sx={{ display: 'flex' }}>
      <CircularProgress className="ManagementIntegrationInteraction__Spinner" size="4rem" />
    </Box>
  </React.Fragment>;
};

SpinnerSkeleton.defaultProps = {};

SpinnerSkeleton.propTypes = {};

export default SpinnerSkeleton;
