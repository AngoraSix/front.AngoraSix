import PropTypes from 'prop-types';
import ManagementIntegration from '../../../../models/ManagementIntegration';
import { mapToHateoasCollectionDto } from '../../../../utils/rest/hateoas/hateoasUtils';
import ManagementIntegrationList from './ManagementIntegrationList.component';

const ManagementIntegrationListContainer = ({
  managementIntegrationsResponseData,
}) => {
  const hateoasCollectionDto = mapToHateoasCollectionDto(
    managementIntegrationsResponseData,
    ManagementIntegration
  );

  let {
    collection: managementIntegrations,
    metadata: integrationsMetadata,
    actions: managementIntegrationsActions,
  } = hateoasCollectionDto;

  return (
    <ManagementIntegrationList
      managementIntegrations={managementIntegrations}
      managementIntegrationsActions={managementIntegrationsActions}
      isLoading={false}
    />
  );
};

ManagementIntegrationListContainer.defaultProps = {
};

ManagementIntegrationListContainer.propTypes = {
  managementIntegrationsResponseData: PropTypes.object.isRequired,
};

export default ManagementIntegrationListContainer;
