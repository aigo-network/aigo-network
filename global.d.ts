declare module 'react-native-url-polyfill/auto';

declare module 'react-native-config' {
	export interface NativeConfig {
		FIREBASE_IOS_CLIENT_ID: string;
		FIREBASE_IOS_REVERSED_CLIENT_ID: string;
		FIREBASE_WEB_CLIENT_ID: string;
		FIREBASE_APPLE_AUTH_SERVICE_ID: string;
		FIREBASE_APPLE_AUTH_REDIRECT_URL: string;
		DEPIN_SCAN_API_KEY: string;
		DEPIN_SCAN_PROJECT_ID: string;
		GRAPHQL_API_ENDPOINT: string;
		API_RSA_PUBLIC_KEY: string;
		MAPBOX_ACCESS_TOKEN: string;
		TELEGRAM_BOT_ID: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
