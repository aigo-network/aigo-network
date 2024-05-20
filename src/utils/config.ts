import Config from 'react-native-config';

import { name, version } from '../../package.json';

import { activity } from './activity.json';

type AppConfig = {
	version: string;
	FIREBASE_IOS_CLIENT_ID: string;
	FIREBASE_IOS_REVERSED_CLIENT_ID: string;
	FIREBASE_WEB_CLIENT_ID: string;
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
	name,
	version,
	...Config,
	activity,
} as never;
