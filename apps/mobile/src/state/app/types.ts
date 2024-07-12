import type { UserDescription } from '@aigo/api/graphql';

export type RemoteConfig = {
	nyamNyamCampaignActivated: boolean;
	invitationUrl: string;
	deepAnalyticsEnabled: boolean;
	minimalVersion: string;
};

export type Onboarding = {
	name: string;
	city: string;
	descriptions: UserDescription[];
	phoneNumber?: string;
};
