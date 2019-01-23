import jwt from 'jsonwebtoken';

require('dotenv').config();

const { SECRET_KEY } = process.env;

const authorize = (resolve, root, args, context) => {
  const authorization = context.request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { id: userId } = jwt.verify(token, SECRET_KEY);
    const newArgs = { ...args, userId };
    return resolve(root, newArgs, context);
  }
  throw new Error('Authorization failed');
};

module.exports = {
  Mutation: {
    postLink: authorize,
    updateLink: authorize,
    deleteLink: authorize,
    vote: authorize,
    deleteVote: authorize,
  },
  Query: {
    getUsers: authorize,
  },
};
