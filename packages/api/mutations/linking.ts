import { gql } from 'graphql-request';

// app only, need to add/implement MOBILE_API_KEY
export const trackAppOpenWithLinkingEventMutation = gql`
	mutation trackAppOpenWithLinkingEvent($url: String!, $appStage: AppStage!) {
		trackAppOpenWithLinkingEvent(url: $url, appStage: $appStage)
	}
`;
