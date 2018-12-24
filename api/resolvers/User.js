module.exports = {
  links: (root, args, context) => context.prisma.user({ id: root.id }).links(),
  voteCasts: (root, args, context) => context.prisma.user({ id: root.id }).voteCasts(),
};
