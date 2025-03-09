import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../../../../api';
import { INTERCOMMUNICATION_KEYS } from '../../ManagementIntegration.properties';
import IntegrationActions from './IntegrationActions.component';

const IntegrationActionsContainer = ({ sourceKey, projectManagementId, sourceSyncId, actions, updateSourceSync }) => {
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
      if (event.origin === window.location.origin && event.data.type === INTERCOMMUNICATION_KEYS.sourceSyncConfigCompleted) {
        setModal(null);
        updateSourceSync(event.data.data);
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

  const onDisableIntegration = async (sourceSyncId) => {
    setIsProcessing(true);
    const disableResponse = await api.front.disableIntegration(sourceSyncId);
    updateSourceSync(disableResponse);
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
    console.log("Source Sync Response: ", sourceSyncResponse);
    setIsProcessing(false);
  };

  const onUpdateSourceSyncConfig = async (sourceSyncId) => {
    // NOT IMPLEMENTED YET: 
    console.log("Update Source Sync Config not implemented yet");
  };

  const onMatchPlatformUsers = async (isProcessing) => {
    setIsProcessing(isProcessing);
  };

  const actionFns = {
    onRedirectAuthorization,
    onDisableIntegration,
    onRequestFullSync,
    onUpdateSourceSyncConfig,
    onMatchPlatformUsers,
    onGetSourceSync
  };

  return <IntegrationActions
    sourceKey={sourceKey}
    projectManagementId={projectManagementId}
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
  sourceSyncId: PropTypes.string,
};

export default IntegrationActionsContainer;
