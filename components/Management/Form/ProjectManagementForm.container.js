import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../api';
import { resolveRoute, ROUTES } from '../../../../constants';
import { useLoading, useNotifications } from '../../../../hooks/app';
import ProjectManagement from '../../../../models/ProjectManagement';
import { toType } from '../../../../utils/helpers';
import logger from '../../../../utils/logger';
import ProjectManagementForm from './ProjectManagementForm.component';
import ProjectManagementFormReducer, {
  INITIAL_STATE,
  updatedCompletedFormSection,
  updateFieldsAction,
  updateFormWasSubmitted,
} from './ProjectManagementForm.reducer';

const ProjectManagementFormContainer = ({ project, projectManagement }) => {
  const { t } = useTranslation('management.edit');
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const router = useRouter();
  const [formState, dispatch] = useReducer(ProjectManagementFormReducer, {
    ...INITIAL_STATE,
    formData: {
      ...(toType(projectManagement, ProjectManagement)?.toFormData() || {}),
    },
  });

  // we want to support updating several fields at once => value can be an array of fields
  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData =
      Array.isArray(eventOrValue) && property == null
        ? Object.assign({}, ...eventOrValue.map(([p, v]) => ({ [p]: v })))
        : {
            [property]: eventOrValue.target
              ? eventOrValue.target.value
              : eventOrValue,
          };

    dispatch(updateFieldsAction(partialFormData));
  };

  const setIsSectionCompleted = (section) => (isCompleted) => {
    dispatch(updatedCompletedFormSection(section, isCompleted));
  };

  const onSubmit = async () => {
    doLoad(true);
    if (Object.values(formState.completedSections).some((v) => !v)) {
      dispatch(updateFormWasSubmitted(true));
    } else {
      try {
        let projectManagementToSubmit = ProjectManagement.fromFormData(
          formState.formData
        );
        projectManagementToSubmit.completeRequiredFields(project);
        //@TODO check required fields or trigger error

        const projectManagementResponse = await api.front.saveProjectManagement(
          projectManagementToSubmit,
          projectManagement?.id,
          project.id
        );

        onSuccess(
          t('management.edit.form.notifications.success.saved')
        );

        const viewURL = isTriggeredAction
          ? resolveRoute(ROUTES.projects.edit, project.id)
          : resolveRoute(
              ROUTES.projects.management.view,
              projectManagementResponse.projectId,
              projectManagementResponse.id
            );
        router.push(viewURL);
      } catch (err) {
        logger.error(err);
        onError('Error Saving Project Management');
      }
    }
    doLoad(false);
  };

  return (
    <ProjectManagementForm
      formData={formState.formData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      setIsSectionCompleted={setIsSectionCompleted}
      wasSubmitted={formState.wasSubmitted}
    />
  );
};

ProjectManagementFormContainer.defaults = {
  isTriggeredAction: false,
  projectManagement: {},
};

ProjectManagementFormContainer.propTypes = {
  projectManagement: PropTypes.object,
  project: PropTypes.object.isRequired,
  isTriggeredAction: PropTypes.bool,
};

export default ProjectManagementFormContainer;
