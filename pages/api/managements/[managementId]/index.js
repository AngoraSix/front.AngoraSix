import api from '../../../../api';
import { obtainValidatedToken } from '../../../../utils/api/apiHelper';
import InternalServerError from '../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    const validatedToken = await obtainValidatedToken(req);

    try {
      const managementData =
        await api.management.getProjectManagement(
          req.query.managementId,
          validatedToken
        );
      res.status(200).json(managementData);
    } catch (err) {
      const errorMessage = `Error retriving project management data [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'MANAGEMENT_FETCH'
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
      'MANAGEMENT'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;