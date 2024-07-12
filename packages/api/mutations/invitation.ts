import { gql } from 'graphql-request';

export const inputInvitationCodeMutation = gql`
	mutation inputInvitationCode($code: String) {
		inputInvitationCode(code: $code) {
			invitedBy
			invitedId
		}
	}
`;
