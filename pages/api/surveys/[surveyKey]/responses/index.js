import api from '../../../../../api';
import InternalServerError from '../../../../../utils/errors/InternalServerError';
import MethodNotAllowedError from '../../../../../utils/errors/MethodNotAllowedError';
import logger from '../../../../../utils/logger';

const page = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = await api.surveys.saveSurveyResponse(
                requestBody,
                req.query.surveyKey,
            );

            res.status(200).json(data);
        } catch (err) {
            const errorMessage = `Error saving Survey Response [${req.method}]`,
                internalServerErr = new InternalServerError(
                    errorMessage,
                    'SURVEY_RESPONSE_SAVE'
                );
            logger.error(
                errorMessage,
                typeof err === 'object' && !err instanceof Error
                    ? JSON.stringify(err)
                    : err
            );
            res.status(internalServerErr.status).json(internalServerErr.asObject());
        }
    } if (req.method === 'GET') {
        try {
            const data = await api.surveys.fetchSurveyResponse(
                req.query.surveyKey,
            );

            res.status(200).json(data);
        } catch (err) {
            const errorMessage = `Error retreiving Survey [${req.method}]`,
                internalServerErr = new InternalServerError(
                    errorMessage,
                    'SURVEY_RESPONSE_FETCH'
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
            'SURVEY'
        );
        res.status(mnaError.status).json(mnaError.asObject());
    }
};

export default page;
