import api from '../../../../../../../api';
import { obtainValidatedToken } from '../../../../../../../utils/api/apiHelper';
import InternalServerError from '../../../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    const validatedToken = await obtainValidatedToken(req);

    try {
      const managementData =
        await api.clubs.getWellKnownClub(
          req.query.projectManagementId,
          req.query.clubType,
          validatedToken
        );
      res.status(200).json(managementData);
    } catch (err) {
      const errorMessage = `Error retriving well-known club data [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'WELL-KNOWN_CLUB_FETCH'
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
      'WELL-KNOWN_CLUB'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;