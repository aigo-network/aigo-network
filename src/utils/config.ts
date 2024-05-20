import Config from 'react-native-config';

import { name, version } from '../../package.json';

type AppConfig = {
	version: string;
	FIREBASE_IOS_CLIENT_ID: string;
	FIREBASE_IOS_REVERSED_CLIENT_ID: string;
	FIREBASE_WEB_CLIENT_ID: string;
	GRAPHQL_API_ENDPOINT: string;
};

export const config: AppConfig = {
	name,
	version,
	...Config,
} as never;
