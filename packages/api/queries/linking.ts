import { gql } from 'graphql-request';

export const retrieveDeferredLinkingQuery = gql`
	query retrieveDeferredLinking {
		deferredLinking {
			id
			ipAddress
			url
		}
	}
`;
