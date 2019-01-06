const conditions = args => ({
  user: { email: args.email },
  vote: {
    voter: { id: args.userId },
    link: { id: args.linkId },
  },
});

const checkExisting = (model, errorMessage) => async (resolve, root, args, context) => {
  const searchBy = conditions(args)[model];
  const existing = await context.db.$exists[model](searchBy);

  if (existing) throw new Error(errorMessage);
  return resolve(root, args, context);
};

module.exports = {
  Mutation: {
    signup: checkExisting('user', 'Email already exists'),
    vote: checkExisting('vote', 'Already voted for this link'),
  },
};
