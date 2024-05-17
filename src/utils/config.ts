import Config from 'react-native-config';

type AppConfig = {
	version: string;
	GRAPHQL_API_ENDPOINT: string;
	GOOGLE_SIGNIN_CLIENT_ID: string;
};

export const config: AppConfig = {
	...require('../../package.json'),
	...Config,
};
