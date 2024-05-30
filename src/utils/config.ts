import Config from 'react-native-config';

import { activity } from './activity.json';

type AppConfig = {
	FIREBASE_IOS_CLIENT_ID: string;
	FIREBASE_IOS_REVERSED_CLIENT_ID: string;
	FIREBASE_WEB_CLIENT_ID: string;
	FIREBASE_APPLE_AUTH_SERVICE_ID: string;
	FIREBASE_APPLE_AUTH_REDIRECT_URL: string;
	GRAPHQL_API_ENDPOINT: string;
	activity: ActivityConfig;
};

type ActivityConfig = {
	CompleteOnboarding: {
		points: number;
	};
	InviteFriend: {
		points: number;
	};
	DailyCheckIn: {
		points: number;
	};
};

export const config: AppConfig = {
	...Config,
	activity,
} as never;
