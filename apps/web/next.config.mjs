/** @type {import('next').NextConfig} */
import path from 'path';
import url from 'url';

import webpack from 'webpack';
const { DefinePlugin } = webpack;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
console.log(path.resolve(__dirname, './raf.js'));
const nextConfig = {
	swcMinify: true,
	transpilePackages: [
		'react',
		'react-dom',
		'react-native',
		'react-native-reanimated',
	],
	webpack: (config, { dev }) => {
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
