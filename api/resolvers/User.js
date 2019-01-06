module.exports = {
  links: (root, args, context) => context.db.user({ id: root.id }).links(),
  voteCasts: (root, args, context) => context.db.user({ id: root.id }).voteCasts(),
};
