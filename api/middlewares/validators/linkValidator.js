import joi from 'joi';
import validateInput from '../../helpers/validateInput';

const linkSchema = {
  title: joi
    .string()
    .min(4)
    .max(100),
  description: joi
    .string()
    .min(10)
    .max(250),
  url: joi
    .string()
    .uri(),
  imageUrl: joi
    .string()
    .uri(),
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
  postLink: validateInput(linkSchema),
  updateLink: validateInput(linkSchema, childSchema),
};
