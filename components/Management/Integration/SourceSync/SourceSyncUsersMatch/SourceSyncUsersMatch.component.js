import ToDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import ToRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Unstable_Grid2'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import React from 'react'
import { THIRD_PARTY } from '../../../../../constants/constants'
import ListSkeleton from '../../../../common/Skeletons/ListSkeleton.component'
import A6UserDropDown from './Elements/A6UserDropDown.component'
import SourceUserCard from './Elements/SourceUserCard.component'

const SourceSyncUsersMatch = ({
  sourceUserMatches,
  sourceKey,
  onMemberMatchSelect,
  onSubmit,
}) => {
  const { t } = useTranslation('management.integration.sourcesync.users')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const sourceUsersToMatch = Object.entries(sourceUserMatches)
  return (
    <Box className={`SourceSyncUsersMatch SourceSyncUsersMatch__Container`}>
      <Typography className="SourceSyncUsersMatch__Title" variant="h6">
        {t('management.integration.sourcesync.users.match.title')}
      </Typography>
      {sourceUsersToMatch.length ? (
        <Box className="SourceSyncUsersMatch__Grid__Container">
          <Grid
            container
            rowSpacing={{ xs: 7, md: 0 }}
            className="SourceSyncUsersMatch__Grid"
          >
            {sourceUsersToMatch.map(([sourceUserId, matchSpec], index) => {
              return (
                <React.Fragment key={sourceUserId}>
                  <Grid
                    className="SourceSyncUsersMatch__Grid__Contributor"
                    container
                    xs={12}
                    rowSpacing={{ xs: 0.5, md: 0 }}
                  >
                    <Grid
                      key={`${sourceUserId}-source`}
                      xs={12}
                      md={5}
                      className="SourceSyncUsersMatch__Grid__Element  SourceUser Left"
                    >
                      <SourceUserCard
                        userData={matchSpec.promptData}
                        sourceData={THIRD_PARTY[sourceKey]}
                      />
                    </Grid>

                    <Grid
                      key={`${sourceUserId}-matchIcon`}
                      xs={12}
                      md={2}
                      className="SourceSyncUsersMatch__Grid__Element"
                    >
                      <Box className="SourceSyncUsersMatch__Grid__Element__MatchIcon">
                        {isMobile ? <ToDownIcon /> : <ToRightIcon />}
                      </Box>
                    </Grid>
                    <Grid
                      key={`${sourceUserId}-a6`}
                      xs={12}
                      md={5}
                      className="SourceSyncUsersMatch__Grid__Element A6User Right"
                    >
                      <A6UserDropDown
                        onSelectMember={onMemberMatchSelect(sourceUserId)}
                        fieldSpec={matchSpec}
                        selectedIndex={matchSpec.selectedIndex}
                      />
                    </Grid>
                  </Grid>

                  {sourceUsersToMatch.length > index + 1 && (
                    <Grid
                      key={`${sourceUserId}-divider`}
                      xs={12}
                      md={0}
                      className="SourceSyncUsersMatch__Grid__Element__Divider"
                    >
                      <Divider
                        variant="middle"
                        className="SourceSyncUsersMatch__Grid__Element__MatchIcon"
                      />
                    </Grid>
                  )}
                </React.Fragment>
              )
            })}
            <Box className="SourceSyncUsersMatch__Grid__Actions_Submit">
              <Button onClick={onSubmit} variant="contained" color="primary">
                {t('management.integration.sourcesync.users.match.submit')}
              </Button>
            </Box>
          </Grid>
        </Box>
      ) : (
        <Box className="SourceSyncUsersMatch__Grid__Container">
          <ListSkeleton />
        </Box>
      )}
    </Box>
  )
}

SourceSyncUsersMatch.propTypes = {
  sourceUserMatches: PropTypes.object.isRequired,
  projectPresentation: PropTypes.object,
  onMemberMatchSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SourceSyncUsersMatch
