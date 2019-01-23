import joi from 'joi';
import { createError } from 'apollo-errors';

export default (baseSchema, childSchema) => (resolve, root, args, context) => {
  const inputSchema = childSchema ? { ...baseSchema, ...childSchema } : baseSchema;
  const schema = joi.object().keys(inputSchema);
  const { error } = schema.validate(args, {
    abortEarly: false,
    presence: childSchema ? 'optional' : 'required',
  });
  if (error) {
    const ValidationError = createError('ValidationError', {
      message: 'Input field(s) contain invalid value(s)',
      data: error.details,
    });
    throw new ValidationError();
  }
  return resolve(root, args, context);
};
