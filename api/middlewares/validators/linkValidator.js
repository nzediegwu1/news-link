import joi from 'joi';
import validateInput from '../../helpers/validateInput';
import { helmet } from '../../helpers/errorHandler';

const linkSchema = {
  title: joi
    .string()
    .min(4)
    .max(100),
  description: joi
    .string()
    .min(10)
    .max(250),
  url: joi.string().uri(),
  imageUrl: joi.string().uri(),
  imagePublicId: joi.string(),
  userId: joi
    .string()
    .alphanum()
    .length(25),
};
const childSchema = {
  id: joi
    .string()
    .alphanum()
    .required()
    .length(25),
};

module.exports = {
  postLink: helmet(validateInput(linkSchema)),
  updateLink: helmet(validateInput(linkSchema, childSchema)),
};
