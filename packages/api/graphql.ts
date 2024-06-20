import { config } from '@aigo/config';
import { GraphQLClient } from 'graphql-request';

import { getJWT } from './jwt';
import type { Sdk } from './sdk';
import { getSdk } from './sdk';

export const graphqlClient: Sdk = getSdk(
	new GraphQLClient(config.GRAPHQL_API_ENDPOINT, {
		requestMiddleware: async (request) => {
			const jwt = await getJWT();
			return {
				...request,
				headers: {
					...request.headers,
					authorization: jwt ? `Bearer ${jwt}` : '',
				},
			};
		},
	}),
);

export * from './sdk';
