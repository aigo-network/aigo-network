import { GraphQLClient } from 'graphql-request';
import { config } from 'utils/config';

import { getSdk } from './sdk';

export const graphql = getSdk(new GraphQLClient(config.GRAPHQL_API_ENDPOINT));
