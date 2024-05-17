import { GraphQLClient } from 'graphql-request';
import { config } from 'utils/config';

import { getSdk } from './sdk';

export const graphqlClient = getSdk(
	new GraphQLClient(config.GRAPHQL_API_ENDPOINT),
);

export * from './sdk';
