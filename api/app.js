import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../prisma_client';
import * as resolverFunctions from './resolvers';

// prisma.linksConnection
const resolvers = { ...resolverFunctions };
const server = new GraphQLServer({
  typeDefs: './api/schema.graphql',
  resolvers,
  context: request => ({ prisma, ...request }),
});

server.start(() => console.log('Server is running at http://localhost:4000'));
