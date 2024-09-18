import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import ManagementIntegration from '../../../../models/ManagementIntegration';
import { mapToHateoasCollectionDto } from '../../../../utils/rest/hateoas/hateoasUtils';
import ManagementIntegrationList from './ManagementIntegrationList.component';

const ManagementIntegrationListContainer = ({
  managementIntegrationsResponseData,
}) => {

  const [authRequest, _setAuthRequest] = useState({
    source: '',
  });
  const refAuthRequest = useRef(authRequest);
  const setAuthRequest = (data) => {
    refAuthRequest.current = data;
    _setAuthRequest(data);
  };
  const [modal, setModal] = useState(null);

  const hateoasCollectionDto = mapToHateoasCollectionDto(
    managementIntegrationsResponseData,
    ManagementIntegration
  );

  const onRedirectAuthorization = (sourceKey, authorizationUrl) => {
    let newModal = window.open(authorizationUrl, 'external_login_page', 'width=800,height=600,left=200,top=100');
    setModal(newModal);
    setAuthRequest({
      source: sourceKey,
    });
  };

  let {
    collection: managementIntegrations,
    metadata: integrationsMetadata,
    actions: managementIntegrationsActions,
  } = hateoasCollectionDto;

  const actionFns = {
    onRedirectAuthorization
  }

  return (
    <ManagementIntegrationList
      managementIntegrations={managementIntegrations}
      managementIntegrationsActions={managementIntegrationsActions}
      actionFns={actionFns}
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
