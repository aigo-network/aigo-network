import { gql } from 'graphql-request';

export const syncWalletAndSecretSharesMutation = gql`
	mutation syncWalletAndSecretShares(
		$wallet: String!
		$shares: [SecretShare]!
	) {
		syncWalletAndSecretShares(wallet: $wallet, shares: $shares)
	}
`;
