import { ResponseMiddleware } from '../axios-instance.builder';

import { getRequestIdOnConfig } from './log-data-request-middleware';

import { LoggerI } from '#core/domain';

export function logDataResponseMiddleware(logger: LoggerI): ResponseMiddleware {
  return [
    (response) => {
      const requestId = getRequestIdOnConfig(response.config);
      logger.log(
        `[${requestId}]`,
        'Response Status :',
        response.status.toString(),
      );
      logger.log(`[${requestId}]`, 'Response Data :', response.data);
      return response;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      logError(logger, error);
      error.isAlreadyLogged = true;
      return Promise.reject(error);
    },
  ];
}

export function logError(
  logger: LoggerI,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
) {
  if (error.isAlreadyLogged) {
    return;
  }
  if (error.response) {
    const requestId = getRequestIdOnConfig(error.response.config);
    logger.error(`[${requestId}]`, 'Response Status :', error.response.status);
    logger.error(`[${requestId}]`, 'Response Data :', error.response.data);
    return;
  }
  const requestId = getRequestIdOnConfig(error.config);
  logger.error(`[${requestId}]`, 'Error :', error);
}
