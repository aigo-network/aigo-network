import type { UserDescription } from '@aigo/api/graphql';
import type { GeolocationOptions } from '@react-native-community/geolocation';

export type RemoteConfig = {
	nyamNyamCampaignActivated: boolean;
	invitationUrl: string;
	deepAnalyticsEnabled: boolean;
	minimalVersion: string;
	enableMapFeature: boolean;
	activeBanners: ActiveBanner[];
	watchPositionOptions: GeolocationOptions;
	rewardFeature: {
		isSupportedRegion: boolean | null;
		region: string;
	};
};

export type Onboarding = {
	name: string;
	city: string;
	descriptions: UserDescription[];
	phoneNumber?: string;
};

export type ActiveBanner = {
	id: string;
	name: string;
	url: string;
	imageUrl?: string;
};
