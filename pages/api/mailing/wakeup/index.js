import api from '../../../../api'
import { obtainValidatedToken } from '../../../../utils/api/apiHelper'
import InternalServerError from '../../../../utils/errors/InternalServerError'
import MethodNotAllowedError from '../../../../utils/errors/MethodNotAllowedError'
import logger from '../../../../utils/logger'

const page = async (req, res) => {
  if (req.method === 'POST') {
    const validatedToken = await obtainValidatedToken(req)

    try {
      await api.messaging.wakeup(validatedToken)
      res.status(204)
    } catch (err) {
      const errorMessage = `Error waking up messaging service[${req.method}]`,
        internalServerErr = new InternalServerError(
          errorMessage,
          'MESSAGING_WAKEUP'
        )
      logger.error(
        errorMessage,
        typeof err === 'object' && !err instanceof Error
          ? JSON.stringify(err)
          : err
      )
      res.status(internalServerErr.status).json(internalServerErr.asObject())
    }
  } else {
    const mnaError = new MethodNotAllowedError(
      `No API support for ${req.method} HTTP method`,
      'MESSAGING_WAKEUP'
    )
    res.status(204)
  }
}

export default page
