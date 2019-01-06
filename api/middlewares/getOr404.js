/* eslint-disable no-param-reassign */
const conditions = args => ({
  user: { email: args.email },
  vote: { id: args.id },
  link: { id: args.id || args.linkId },
});

const getOr404Middleware = model => async (resolve, root, args, context) => {
  const unique = conditions(args)[model];
  const instance = await context.db[model](unique);

  if (!instance) throw new Error(`${model} does not exist`);
  args[model] = instance;
  return resolve(root, args, context);
};

const getLinkOr404 = getOr404Middleware('link');
module.exports = {
  Mutation: {
    updateLink: getLinkOr404,
    deleteLink: getLinkOr404,
    signin: getOr404Middleware('user'),
    deleteVote: getOr404Middleware('vote'),
    vote: getLinkOr404,
  },
};
