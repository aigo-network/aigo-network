const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const monoPackages = {
	'@aigo/api': path.resolve(__dirname, './packages/api'),
	'@aigo/config': path.resolve(__dirname, './packages/config'),
	'@aigo/components': path.resolve(__dirname, './packages/components'),
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	watchFolders: [
		path.resolve(__dirname, './node_modules'),
		...Object.values(monoPackages),
	],
	resolver: {
		extraNodeModules: monoPackages,
		resolveRequest: (context, moduleName, platform) => {
			if (moduleName.startsWith('graphql-request')) {
				return {
					filePath: `${__dirname}/node_modules/graphql-request/build/entrypoints/main.js`,
					type: 'sourceFile',
				};
			}

			return context.resolveRequest(context, moduleName, platform);
		},
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
