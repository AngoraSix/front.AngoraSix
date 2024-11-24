import api from '../../../../../api';
import { obtainValidatedToken } from '../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'PATCH') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.managementIntegrations.patchSourceSync(
        req.body,
        req.query.sourceSyncId,
        validatedToken
      );

      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error patching Source Sync [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'SOURCE_SYNC_PATCH'
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
      'SOURCE_SYNC'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
