import { gql } from 'graphql-request';

export const syncSecretSharesMutation = gql`
	mutation syncSecretShares($shares: [SecretShare]) {
		syncSecretShares(shares: $shares)
	}
`;
