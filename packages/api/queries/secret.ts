import { gql } from 'graphql-request';

export const SecretSharesQuery = gql`
	query getSecretShares($types: [SecretShareType]) {
		secretShares(types: $types) {
			data
			type
		}
	}
`;
