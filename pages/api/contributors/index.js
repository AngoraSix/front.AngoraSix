import api from '../../../api';
import { obtainValidatedToken } from '../../../utils/api/apiHelper';
import InternalServerError from '../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import logger from '../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET') {
    // Get contributors
    const validatedToken = await obtainValidatedToken(req);
    const contributorIds = req.query.contributorIds?.split(',') || [
      validatedToken.user.id,
    ];

    try {
      const contributorsData =
        await api.contributors.listContributors(
          contributorIds,
          validatedToken
        );
      res.status(200).json(contributorsData);
    } catch (err) {
      const errorMessage = `Error retriving contributors data [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'CONTRIBUTORS_FETCH'
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
      'CONTRIBUTORS'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;