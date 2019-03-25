import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import { helmet } from '../helpers/errorHandler';
import { cloudinaryConfig } from '../config';

require('dotenv').config();

cloudinary.config(cloudinaryConfig);
const { SECRET_KEY } = process.env;

const resolvers = {
  postLink: (root, { userId, ...args }, context) => context.db.createLink({
    ...args,
    postedBy: { connect: { id: userId } },
  }),

  async updateLink(root, { userId, id, link, ...args }, context) {
    const [oldLink, updatedLink] = await Promise.all([
      context.db.link({ id }),
      context.db.updateLink({
        data: { ...args, postedBy: { connect: { id: userId } } },
        where: { id },
      }),
    ]);
    if (args.imagePublicId) cloudinary.v2.uploader.destroy(oldLink.imagePublicId);
    return updatedLink;
  },

  async deleteLink(root, { id }, context) {
    const deletedLink = await context.db.deleteLink({ id });
    cloudinary.v2.uploader.destroy(deletedLink.imagePublicId);
    return deletedLink;
  },

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

export default {
  ...resolvers,
  postLink: helmet(resolvers.postLink),
  updateLink: helmet(resolvers.updateLink),
};
