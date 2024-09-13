import { gql } from 'graphql-request';

export const syncWalletAndSecretSharesMutation = gql`
	mutation syncWalletAndSecretShares(
		$wallet: String!
		$shares: [SecretShareInput]!
	) {
		syncWalletAndSecretShares(wallet: $wallet, shares: $shares)
	}
`;
