import { config } from '@aigo/config';
import { GraphQLClient } from 'graphql-request';

import { JWT } from './jwt';
import { getSdk } from './sdk';

export const graphqlClient = getSdk(
	new GraphQLClient(config.GRAPHQL_API_ENDPOINT, {
		headers: () => {
			return {
				authorization: `Bearer ${JWT}`,
			};
		},
	}),
);

export * from './sdk';
