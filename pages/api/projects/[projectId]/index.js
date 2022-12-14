import api from '../../../../api';
import { obtainValidatedToken } from '../../../../utils/api/apiHelper';
import InternalServerError from '../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../utils/logger';

export default async (req, res) => {
  if (req.method === 'PUT') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.projects.saveProject(
        req.body,
        validatedToken,
        req.query.projectId
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error updating Project [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'PROJECT_SAVE'
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
