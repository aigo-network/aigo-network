import path from 'path';
import url from 'url';

import dotenv from 'dotenv';
import webpack from 'webpack';

const { DefinePlugin } = webpack;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	transpilePackages: [
		'@aigo/api',
		'@aigo/config',
		'@aigo/components',
		'react',
		'react-dom',
		'react-native',
		'react-native-reanimated',
		'react-native-qrcode-svg',
		'react-native-linear-gradient',
		'empty-modal',
	],
	webpack: (config, { dev }) => {
		const envFilename = dev ? '.env.development' : '.env.production';
		dotenv.config({ path: path.join(__dirname, `../../${envFilename}`) });

		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web',
			'react-native-linear-gradient': 'react-native-web-linear-gradient',
		};

		config.resolve.extensions = [
			'.web.js',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];

		const environments = [
			'FIREBASE_APP_ID',
			'FIREBASE_API_KEY',
			'FIREBASE_AUTH_DOMAIN',
			'FIREBASE_PROJECT_ID',
			'FIREBASE_STORAGE_BUCKET',
			'FIREBASE_MESSAGING_SENDER_ID',
			'FIREBASE_MEASUREMENT_ID',
			'GRAPHQL_API_ENDPOINT',
		].reduce((acc, cur) => {
			acc[cur] = JSON.stringify(process.env[cur]);
			return acc;
		}, {});

		config.plugins.push(
			new DefinePlugin({
				__DEV__: dev,
				...environments,
			}),
		);

		return config;
	},
};

export default nextConfig;
