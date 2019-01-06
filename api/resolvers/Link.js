module.exports = {
  postedBy: (root, args, context) => context.db.link({ id: root.id }).postedBy(),
  votes: (root, arg, context) => context.db.link({ id: root.id }).votes(),
};
