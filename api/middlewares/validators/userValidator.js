/* Do not validate a single mutation in multiple validator modules */
import joi from 'joi';
import validateInput from '../../helpers/validateInput';

const userSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi
    .string()
    .trim()
    .min(6)
    .required(),
};
const childSchema = {
  name: joi
    .string()
    .trim()
    .min(2)
    .max(30)
    .required(),
};

module.exports = {
  signin: validateInput(userSchema),
  signup: validateInput(userSchema, childSchema),
};
