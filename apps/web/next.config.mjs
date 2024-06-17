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
		'react',
		'react-dom',
		'react-native',
		'react-native-reanimated',
	],
	webpack: (config, { dev }) => {
		const envFilename = dev ? '.env.development' : '.env.production';
		dotenv.config({ path: path.join(__dirname, `../../${envFilename}`) });

		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web',
		};

		config.resolve.extensions = [
			'.web.js',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];

		config.plugins.push(
			new DefinePlugin({
				__DEV__: dev,
			}),
		);

		return config;
	},
};

export default nextConfig;
