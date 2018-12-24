module.exports = {
  newLink: {
    subscribe: (root, args, context) => context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  },
  newVote: {
    subscribe: (root, args, context) => context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  },
};
