import api from '../../../api';
import { obtainValidatedToken } from '../../../utils/api/apiHelper';
import InternalServerError from '../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../utils/errors/MethodNotAllowedError';
import logger from '../../../utils/logger';

const page = async (req, res) => {
  if (req.method === 'GET' && req.headers?.['accept'] === 'text/event-stream') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream',
      });

      const downstreamEvSource =
        await api.notifications.listenContributorNotifications(validatedToken);
      downstreamEvSource.onmessage = (m) => {
        res.write(`event: message\ndata: ${m.data}\n\n`);
      };

      downstreamEvSource.onerror = (e) => {
        console.error(e);
        downstreamEvSource.close();
      };

      req.socket.on('close', () => {
        downstreamEvSource.close();
        res.end();
      });
    } catch (e) {
      res.end();
    }
  } else if (req.method === 'GET') {
    // Get notifications for contributor
    const validatedToken = await obtainValidatedToken(req);
    try {
      const data = await api.notifications.getNotifications(
        validatedToken,
        req.query
      );
      res.status(200).json(data);
    } catch (err) {
      const errorMessage = `Error retriving Contributor Notifications [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'NOTIFICATIONS_FETCH'
        );
      logger.error(
        errorMessage,
        typeof err === 'object' && !err instanceof Error
          ? JSON.stringify(err)
          : err
      );
      res.status(internalServerErr.status).json(internalServerErr.asObject());
    }
  } else if (req.method === 'PATCH') {
    const validatedToken = await obtainValidatedToken(req);
    try {
      const { data } = await api.notifications.patchNotifications(
        req.body,
        validatedToken
      );
      res.status(200).json({ data });
    } catch (err) {
      const errorMessage = `Error patching Contributor Notifications [${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'NOTIFICATIONS_PATCH'
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
      'NOTIFICATIONS'
    );
    res.status(mnaError.status).json(mnaError.asObject());
  }
};

export default page;
