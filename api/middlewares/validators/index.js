import userValidator from './userValidator';
import linkValidator from './linkValidator';

module.exports = {
  Mutation: {
    ...userValidator,
    ...linkValidator,
  },
};
