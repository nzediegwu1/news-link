module.exports = {
  newLink: {
    subscribe: (root, args, context) => context.db.$subscribe.link({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  },
  newVote: {
    subscribe: (root, args, context) => context.db.$subscribe.vote({ mutation_in: ['CREATED'] }).node(),
    resolve: payload => payload,
  },
};
