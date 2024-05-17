declare module 'react-native-url-polyfill/auto';

declare module 'react-native-config' {
	export interface NativeConfig {
		FIREBASE_API_KEY: string;
		BUILD_TARGET: string;
		GOOGLE_SIGNIN_CLIENT_ID: string;
		BROWSER_CLIENT_ID: string;
		FIREBASE_AUTH_DOMAIN: string;
		FIREBASE_PROJECT_ID: string;
		FIREBASE_STORAGE_BUCKET: string;
		FIREBASE_MESSAGING_SENDER_ID: string;
		FIREBASE_APP_ID: string;
		FIREBASE_MEASUREMENT_ID: string;
		FIREBASE_VAPID_KEY: string;
		WEB3AUTH_ID: string;
		GRAPHQL_ENDPOINT: string;
	}

	export const Config: NativeConfig;
	export default Config;
}
