import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const { SECRET_KEY } = process.env;

module.exports = {
  postLink: (root, { userId, ...args }, context) => context.db.createLink({
    ...args,
    postedBy: { connect: { id: userId } },
  }),

  updateLink: (root, { userId, id, link, ...args }, context) => context.db.updateLink({
    data: { ...args, postedBy: { connect: { id: userId } } },
    where: { id },
  }),

  deleteLink: (root, { id }, context) => context.db.deleteLink({ id }),

  async signup(root, args, context) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.db.createUser({ ...args, password });
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return { user, token };
  },

  async signin(root, { user, password }) {
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid password');
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return { user, token };
  },

  vote: (root, { linkId, userId }, context) => context.db.createVote({
    link: { connect: { id: linkId } },
    voter: { connect: { id: userId } },
  }),

  async deleteVote(root, { id }, context) {
    await context.db.deleteVote({ id });
    return {
      message: 'Successfully deleted vote',
      id,
    };
  },
};
