module.exports = {
  postedBy: (root, args, context) => context.prisma.link({ id: root.id }).postedBy(),
  votes: (root, arg, context) => context.prisma.link({ id: root.id }).votes(),
};
