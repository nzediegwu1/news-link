import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authorizeUser from '../util';

require('dotenv').config();

const { SECRET_KEY } = process.env;

module.exports = {
  postLink(root, { url, description }, context) {
    const id = authorizeUser(context);
    return context.prisma.createLink({
      url,
      description,
      postedBy: { connect: { id } },
    });
  },
  async updateLink(root, { url, description, id }, context) {
    const userId = authorizeUser(context);
    const link = await context.prisma.link({ id });
    if (!link) throw new Error('Link not found');
    return context.prisma.updateLink({
      data: { url, description, postedBy: { connect: { id: userId } } },
      where: { id },
    });
  },
  async deleteLink(root, { id }, context) {
    authorizeUser(context);
    const link = await context.prisma.link({ id });
    if (!link) throw new Error('Link not found');
    return context.prisma.deleteLink({ id });
  },
  async signup(root, args, context) {
    const password = await bcrypt.hash(args.password, 10);
    // check if user already exists before creating new
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return { user, token };
  },
  async signin(root, { email, password }, context) {
    const user = await context.prisma.user({ email });
    if (!user) throw new Error('User not found');
    if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid password');
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    return { user, token };
  },

  async vote(root, { linkId }, context) {
    const id = authorizeUser(context);
    const voted = await context.prisma.$exists.vote({
      voter: { id },
      link: { id: linkId },
    });
    if (voted) throw new Error('Already voted for this link');
    return context.prisma.createVote({
      link: { connect: { id: linkId } },
      voter: { connect: { id } },
    });
  },
  async deleteVote(root, { id }, context) {
    authorizeUser(context);
    const vote = await context.prisma.vote({ id });
    if (!vote) throw new Error('Vote does not exist');
    await context.prisma.deleteVote({ id });
    return {
      message: 'Successfully deleted vote',
      id,
    };
  },
};
