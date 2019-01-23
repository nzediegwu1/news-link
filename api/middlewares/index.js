import authorizeMiddleware from './auth';
import getOr404Middleware from './getOr404';
import alreadyExistMiddleware from './alreadyExists';
import validators from './validators';

export const Authorize = authorizeMiddleware;
export const ValidateInput = validators;
export const GetOr404 = getOr404Middleware;
export const AlreadyExists = alreadyExistMiddleware;
