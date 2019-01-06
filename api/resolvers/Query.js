/* eslint-disable object-curly-newline */
module.exports = {
  info: () => 'This is the API for blog-connect',
  async feed(root, { filter, first, skip, orderBy }, context) {
    const where = filter
      ? { OR: [{ description_contains: filter }, { url_contains: filter }] }
      : {};
    const [links, count] = await Promise.all([
      context.db.links({ where, first, skip, orderBy }),
      context.db
        .linksConnection({ where })
        .aggregate()
        .count(),
    ]);
    return { links, count };
  },
  getLink: (root, { id }, context) => context.db.link({ id }),
  async getUsers(root, args, context) {
    const userList = await context.db.users();
    return userList;
  },
};
