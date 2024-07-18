import path from 'path';
import url from 'url';

import dotenv from 'dotenv';
import webpack from 'webpack';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { dev }) => {
		const envFilename = dev ? '.env.development' : '.env.production';
		dotenv.config({ path: path.join(__dirname, `../../${envFilename}`) });

		const environments = ['APPLE_APP_ID'].reduce((acc, cur) => {
			acc[cur] = JSON.stringify(process.env[cur]);
			return acc;
		}, {});

		config.plugins.push(
			new webpack.DefinePlugin({ __DEV__: dev, ...environments }),
		);

		return config;
	},
};

export default nextConfig;
