import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../../../../api';
import { ROUTES } from '../../../../../constants/constants';
import { resolveRoute } from '../../../../../utils/api/apiHelper';
import { INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import IntegrationActions from './IntegrationActions.component';

const IntegrationActionsContainer = ({ sourceKey, projectManagementId, integrationId, sourceSyncId, actions, updateIntegration, updateSourceSync }) => {
  const [authRequest, _setAuthRequest] = useState({
    source: '',
  });
  const refAuthRequest = useRef(authRequest);
  const setAuthRequest = (data) => {
    refAuthRequest.current = data;
    _setAuthRequest(data);
  };
  const [modal, setModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (modal !== null && modal.closed) {
      setModal(null);
    }
  }, [modal]);

  useEffect(() => {
    setIsProcessing(false);
  }, [actions]);

  const onRedirectAuthorization = (sourceKey, authorizationUrl) => {
    let newModal = window.open(authorizationUrl, 'external_login_page', 'width=800,height=600,left=200,top=100');
    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin && event.data.type === INTERCOMMUNICATION_KEYS.registrationCompleted) {
        setModal(null);
        updateIntegration(event.data.data);
      } else {
        console.warn('Message origin not trusted:', event.origin);
      }
    });
    setIsProcessing(true);
    setModal(newModal);
    setAuthRequest({
      source: sourceKey,
    });
  };

  const onDisableIntegration = async (integrationId) => {
    setIsProcessing(true);
    const disableResponse = await api.front.disableIntegration(integrationId);
    updateIntegration(disableResponse);
  };

  const onConfigSourceSync = async (integrationId) => {
    const configSourceSyncRoute = resolveRoute(
      ROUTES.integrations.sourceSync.new,
      integrationId,
    );
    let newModal = window.open(configSourceSyncRoute, 'source_sync_process', 'width=800,height=600,left=200,top=100');
    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin && event.data.type === INTERCOMMUNICATION_KEYS.sourceSyncCompleted) {
        setModal(null);
        updateIntegration(event.data.data);
        setIsProcessing(false);
      } else {
        console.warn('Message origin not trusted:', event.origin);
      }
    });
    setIsProcessing(true);
    setModal(newModal);
  };

  const onRequestFullSync = async (sourceSyncId) => {
    setIsProcessing(true);
    const sourceSyncResponse = await api.front.requestFullSync(sourceSyncId);
    updateSourceSync(sourceSyncResponse);
  };

  const onGetSourceSync = async (sourceSyncId) => {
    // NOT IMPLEMENTED YET: 
    setIsProcessing(true);
    const sourceSyncResponse = await api.front.getSourceSync(sourceSyncId);
    // updateSourceSync(sourceSyncResponse);
    console.log("Source Sync Response: ", sourceSyncResponse);
    setIsProcessing(false);
  };

  const onUpdateSourceSyncConfig = async (sourceSyncId) => {
    // NOT IMPLEMENTED YET: 
    console.log("Update Source Sync Config not implemented yet");
  };

  const actionFns = {
    onRedirectAuthorization,
    onDisableIntegration,
    onConfigSourceSync,
    onRequestFullSync,
    onUpdateSourceSyncConfig,
    onGetSourceSync
  };

  return <IntegrationActions
    sourceKey={sourceKey}
    projectManagementId={projectManagementId}
    integrationId={integrationId}
    sourceSyncId={sourceSyncId}
    actions={actions}
    actionFns={actionFns}
    isProcessing={isProcessing || modal !== null}
  />
};

IntegrationActionsContainer.defaultProps = {
  actions: {},
  actionFns: {},
  sourceKey: ''
};

IntegrationActionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  sourceKey: PropTypes.string.isRequired,
  projectManagementId: PropTypes.string.isRequired,
  integrationId: PropTypes.string,
  sourceSyncId: PropTypes.string,
  updateIntegration: PropTypes.func.isRequired,
  updateSourceSync: PropTypes.func.isRequired
};

export default IntegrationActionsContainer;
