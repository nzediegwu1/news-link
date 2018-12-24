module.exports = {
  voter: (root, args, context) => context.prisma.vote({ id: root.id }).voter(),
  link: (root, args, context) => context.prisma.vote({ id: root.id }).link(),
};
