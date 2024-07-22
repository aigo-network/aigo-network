import type { UserDescription } from '@aigo/api/graphql';
import type { GeolocationOptions } from '@react-native-community/geolocation';

export type RemoteConfig = {
	nyamNyamCampaignActivated: boolean;
	invitationUrl: string;
	deepAnalyticsEnabled: boolean;
	minimalVersion: string;
	watchPositionOptions: GeolocationOptions;
};

export type Onboarding = {
	name: string;
	city: string;
	descriptions: UserDescription[];
	phoneNumber?: string;
};
