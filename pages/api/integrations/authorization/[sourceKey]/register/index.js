import { obtainValidatedToken } from '../../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../../utils/errors/MethodNotAllowedError';
import api from '../../../../../../api';
import logger from '../../../../../../utils/logger';

const page =  async (req, res) => {
  if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.managementIntegrations.registerIntegrationsForProjectManagement(
        req.body.projectManagementId,
        req.query.sourceKey,
        req.body,
        validatedToken,
      );
      
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error Registering Source [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'INTEGRATION_REGISTER'
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
      'INTEGRATION_REGISTRATION'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
