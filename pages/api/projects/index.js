import api from '../../../api';
import { obtainValidatedToken } from '../../../utils/api/apiHelper';
import InternalServerError from '../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import logger from '../../../utils/logger';

export default async (req, res) => {
  if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.projects.saveProject(req.body, validatedToken);
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error saving Project [${req.method}]`,
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
  } else if (req.method === 'GET') {
    const adminId = req.query.adminId;
    // Get administered projects
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.projects.fetchProjects(
        { adminId: adminId || validatedToken?.user?.id },
        validatedToken
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error retriving administered Projects [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'PROJECT_FETCH'
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
