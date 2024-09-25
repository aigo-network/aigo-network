import jsonConfig from './activity.json';
import { envConfig } from './env';

export const config: AppConfig = {
	...(envConfig as EnvironmentConfig),
	activity: jsonConfig.activity,
};

type AppConfig = EnvironmentConfig & {
	activity: ActivityConfig;
};

type EnvironmentConfig = {
	FIREBASE_IOS_CLIENT_ID: string;
	FIREBASE_IOS_REVERSED_CLIENT_ID: string;
	FIREBASE_WEB_CLIENT_ID: string;
	FIREBASE_APPLE_AUTH_SERVICE_ID: string;
	FIREBASE_APPLE_AUTH_REDIRECT_URL: string;

	DEPIN_SCAN_API_KEY: string;
	DEPIN_SCAN_PROJECT_ID: string;
	GRAPHQL_API_ENDPOINT: string;
	TELEGRAM_BOT_ID: string;
	API_RSA_PUBLIC_KEY: string;
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
	CompleteNyamNyamVerification: {
		points: number;
	};
};

export * from './style';
