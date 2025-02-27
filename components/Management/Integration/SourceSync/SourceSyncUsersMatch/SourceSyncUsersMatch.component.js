import ToDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ToRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { THIRD_PARTY } from '../../../../../constants/constants';
import ListSkeleton from '../../../../common/Skeletons/ListSkeleton.component';
import A6UserCard from './Elements/A6UserCard.component';
import SourceUserDropDown from './Elements/SourceUserDropDown.component';

const SourceSyncUsersMatch = ({
  contributorMatches,
  sourceKey,
  onMemberMatchSelect,
  onSubmit,
}) => {
  const { t } = useTranslation('management.integration.sourcesync.users');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const usersToMatch = Object.entries(contributorMatches)
  return <Box
    className={`SourceSyncUsersMatch SourceSyncUsersMatch__Container`}
  >
    <Typography
      className="SourceSyncUsersMatch__Title"
      variant="h6"
    >
      {t('management.integration.sourcesync.users.match.title')}
    </Typography>
    {usersToMatch.length ? (<Box className="SourceSyncUsersMatch__Grid__Container">
      <Grid container rowSpacing={{ xs: 7, md: 0 }} className="SourceSyncUsersMatch__Grid">
        {usersToMatch.map(([contributorId, matchSpec], index) => {
          return <React.Fragment key={contributorId}>
            <Grid
              className="SourceSyncUsersMatch__Grid__Contributor"
              container
              sm={12}
              rowSpacing={{ xs: 0.5, md: 0 }}>
              <Grid
                key={`${contributorId}-a6`}
                xs={12}
                md={5}
                className='SourceSyncUsersMatch__Grid__Element'
              >
                <A6UserCard contributorId={contributorId} fieldSpec={matchSpec} />
              </Grid>

              <Grid
                key={`${contributorId}-matchIcon`}
                xs={12}
                md={2}
                className='SourceSyncUsersMatch__Grid__Element'
              >
                <Box className="SourceSyncUsersMatch__Grid__Element__MatchIcon">
                  {isMobile ? <ToDownIcon /> : <ToRightIcon />}
                </Box>
              </Grid>
              <Grid
                key={`${contributorId}-source`}
                xs={12}
                md={5}
                className='SourceSyncUsersMatch__Grid__Element A6User Right'
              >
                <SourceUserDropDown
                  onSelectMember={onMemberMatchSelect(contributorId)}
                  fieldSpec={matchSpec}
                  sourceData={THIRD_PARTY[sourceKey]}
                  selectedIndex={matchSpec.selectedIndex} />
              </Grid>
            </Grid>

            {usersToMatch.length > index + 1 && <Grid
              key={`${contributorId}-divider`}
              xs={12}
              md={0}
              className='SourceSyncUsersMatch__Grid__Element__Divider'
            >
              <Divider variant="middle" className="SourceSyncUsersMatch__Grid__Element__MatchIcon" />
            </Grid>}
          </React.Fragment>
        })}
        <Box className="SourceSyncUsersMatch__Grid__Actions_Submit">
          <Button onClick={onSubmit} variant="contained" color="primary">
            {t('management.integration.sourcesync.users.match.submit')}
          </Button>

        </Box>
      </Grid>
    </Box>) : (<Box className="SourceSyncUsersMatch__Grid__Container">
      <ListSkeleton />
    </Box>)}
  </Box >
};

SourceSyncUsersMatch.defaultProps = {
  projectPresentations: {},
  wasSubmitted: false,
  setIsSectionCompleted: () => { },
};

SourceSyncUsersMatch.propTypes = {
  contributorMatches: PropTypes.object.isRequired,
  projectPresentation: PropTypes.object,
  onMemberMatchSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SourceSyncUsersMatch;
