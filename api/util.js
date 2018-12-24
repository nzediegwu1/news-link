import jwt from 'jsonwebtoken';

require('dotenv').config();

const { SECRET_KEY } = process.env;
export default function authorizeUser({ request }) {
  const authorization = request.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, SECRET_KEY);
    return id;
  }
  throw new Error('Authorization failed');
}
