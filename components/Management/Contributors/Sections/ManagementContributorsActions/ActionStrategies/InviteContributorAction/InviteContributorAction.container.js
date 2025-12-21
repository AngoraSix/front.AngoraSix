import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../../../../api';
import { useLoading, useNotifications } from '../../../../../../../hooks/app';
import { isValidEmail } from '../../../../../../../utils/commons/fieldValidations';
import InviteContributorAction from './InviteContributorAction.component';
import InviteContributorActionReducer, { INITIAL_STATE, setDialogOpened, updateFieldAction, wasSubmitted } from './InviteContributorAction.reducer';

const _isInvalidForm = (currentFormState) => {
  return Object.entries(currentFormState).some(([key, value]) => {
    return key === 'email' && !isValidEmail(value);
  });
}

const InviteContributorActionContainer = ({
  clubId,
  actionData,
}) => {
  const [formState, dispatch] = useReducer(InviteContributorActionReducer, {
    ...INITIAL_STATE,
    formData: {
      ...actionData.template.fields.flatMap(({ key }) => { return { [key]: '' } }).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    }
  });
  const { onSuccess, onError } = useNotifications();
  const { doLoad } = useLoading();
  const { t } = useTranslation('management.contributors');

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldAction(partialFormData));
  };

  const onSubmit = async () => {
    doLoad(true);
    dispatch(wasSubmitted(true));

    if (_isInvalidForm(formState.formData)) {
      doLoad(false);
      return
    }
    try {
      await api.front.inviteContributor(clubId, formState.formData);
      onSuccess(t('management.contributors.actions.invite.success'));
      
      api.front.wakeupMailingSvc()
      dispatch(setDialogOpened(false));
    } catch (error) {
      onError(t('management.contributors.actions.invite.error'));
    }
    doLoad(false);
    dispatch(wasSubmitted(false));
  }

  const updateDialogOpened = (opened) => {
    dispatch(setDialogOpened(opened));
  }

  return (
    <InviteContributorAction
      inviteContributorActionData={actionData}
      formData={formState.formData}
      openedDialog={formState.openedDialog}
      updateDialogOpened={updateDialogOpened}
      onSubmit={onSubmit}
      onFormChange={onFormChange}
      wasSubmitted={formState.wasSubmitted}
    />
  );
};

InviteContributorActionContainer.defaultProps = {
};

InviteContributorActionContainer.propTypes = {
  actionData: PropTypes.object.isRequired,
  clubId: PropTypes.string.isRequired,
};

export default InviteContributorActionContainer;
