import api from '../../../../../api';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

const projectsManagementApiPage = async (req, res) => {
  if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const response = await api.management.saveProjectManagement(
        req.body,
        null,
        req.query.projectId,
        validatedToken
      );
      res.status(200).json(response.data);
    } catch (err) {
      const errorMessage = `Error saving Project Management [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'PROJECT_MANAGEMENT_SAVE'
        );
      logger.error(
        errorMessage,
        typeof err === 'object' && !err instanceof Error
          ? JSON.stringify(err)
          : err
      );
      res.status(internalServerErr.status).json(internalServerErr.asObject());
    }
  } else {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'PROJECT'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default projectsManagementApiPage;
