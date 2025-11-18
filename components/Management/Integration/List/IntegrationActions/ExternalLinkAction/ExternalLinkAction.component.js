import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'

const ExternalLinkAction = ({
  sourceKey,
  actionKey,
  actionData,
  projectManagementId,
}) => {
  const externalUrl = actionData.href

  const { t } = useTranslation('management.integration.list')
  return (
    <Tooltip
      title={t(
        `management.integration.list.actions.${actionKey.toLowerCase()}.tooltip.template`
      ).replace(':source', sourceKey)}
    >
      <a href={externalUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className={`IntegrationItem__Actions__Button ExternalLinkAction__Button`}
          color="primary"
          variant="contained"
          startIcon={<OpenInNewIcon />}
          size="small"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {t(
            `management.integration.list.actions.${actionKey.toLowerCase()}.text`
          )}
        </Button>
        <IconButton
          aria-label="navigate-link"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <OpenInNewIcon />
        </IconButton>
      </a>
    </Tooltip>
  )
}

ExternalLinkAction.propTypes = {
  actionData: PropTypes.object.isRequired,
  onRedirectAuthorization: PropTypes.func.isRequired,
}

export default ExternalLinkAction
