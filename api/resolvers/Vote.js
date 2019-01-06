module.exports = {
  voter: (root, args, context) => context.db.vote({ id: root.id }).voter(),
  link: (root, args, context) => context.db.vote({ id: root.id }).link(),
};
