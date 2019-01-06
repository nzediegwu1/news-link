import authorizeMiddleware from './auth';
import getOr404Middleware from './getOr404';
import alreadyExistMiddleware from './alreadyExists';

export const Authorize = authorizeMiddleware;
export const GetOr404 = getOr404Middleware;
export const AlreadyExists = alreadyExistMiddleware;
