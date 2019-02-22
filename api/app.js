import { GraphQLServer } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { prisma as db } from '../prisma_client';
import * as resolverFunctions from './resolvers';
import * as middlewares from './middlewares';

const options = {
  formatError,
};

const resolvers = { ...resolverFunctions };
const server = new GraphQLServer({
  typeDefs: './api/schema.graphql',
  resolvers,
  context: request => ({ db, ...request }),
  middlewares: Object.values(middlewares),
});

server.start(options, () => console.log('Server is running at http://localhost:4000'));
