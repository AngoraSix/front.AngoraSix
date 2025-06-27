import api from "../../../../../api"
import { obtainValidatedToken } from "../../../../../utils/api/apiHelper"
import InternalServerError from "../../../../../utils/errors/InternalServerError"
import MethodNotAllowedError from "../../../../../utils/errors/MethodNotAllowedError"
import logger from "../../../../../utils/logger"

const page = async (req, res) => {
    if (req.method === "POST") {
        try {
            const validatedToken = await obtainValidatedToken(req);
            const data = await api.surveys.saveSurveyResponse(req.body, req.query.surveyKey, validatedToken)

            res.status(200).json(data)
        } catch (err) {
            const errorMessage = `Error saving Survey Response [${req.method}]`,
                internalServerErr = new InternalServerError(errorMessage, "SURVEY_RESPONSE_SAVE")
            logger.error(errorMessage, typeof err === "object" && (!err) instanceof Error ? JSON.stringify(err) : err)
            res.status(internalServerErr.status).json(internalServerErr.asObject())
        }
    } else if (req.method === "GET") {
        try {
            const validatedToken = await obtainValidatedToken(req);
            const data = await api.surveys.fetchSurveyResponse(req.query.surveyKey, validatedToken);

            res.status(200).json(data)
        } catch (err) {
            const errorMessage = `Error retrieving Survey [${req.method}]`,
                internalServerErr = new InternalServerError(errorMessage, "SURVEY_RESPONSE_FETCH")
            // logger.error(errorMessage, typeof err === "object" && (!err) instanceof Error ? JSON.stringify(err) : err)
            res.status(internalServerErr.status).json(internalServerErr.asObject())
        }
    } else {
        const mnaError = new MethodNotAllowedError(`No API support for ${req.method} HTTP method`, "SURVEY")
        res.status(mnaError.status).json(mnaError.asObject())
    }
}

export default page
