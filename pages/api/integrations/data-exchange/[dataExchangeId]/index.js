import api from '../../../../../api';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'PATCH') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.managementIntegrations.patchDataExchange(
        req.body,
        req.query.dataExchangeId,
        validatedToken
      );

      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error patching Data Exchange [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'DATA_EXCHANGE_PATCH'
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
      'DATA_EXCHANGE'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;