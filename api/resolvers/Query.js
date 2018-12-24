import authorizeUser from '../util';

module.exports = {
  info: () => 'This is the API for blog-connect',
  async feed(root, {
    filter, first, skip, orderBy,
  }, context) {
    const where = filter
      ? {
        OR: [{ description_contains: filter }, { url_contains: filter }],
      }
      : {};
    const [links, count] = await Promise.all([
      context.prisma.links({
        where,
        first,
        skip,
        orderBy,
      }),
      context.prisma
        .linksConnection({ where })
        .aggregate()
        .count(),
    ]);
    return { links, count };
  },
  getLink: (root, { id }, context) => context.prisma.link({ id }),
  async getUsers(root, args, context) {
    authorizeUser(context);
    const userList = await context.prisma.users();
    return userList;
  },
};
