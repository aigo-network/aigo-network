const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const monoPackages = {
	'@aigo/api': path.resolve(__dirname, '../../packages/api'),
	'@aigo/config': path.resolve(__dirname, '../../packages/config'),
	'@aigo/components': path.resolve(__dirname, '../../packages/components'),
	'@aigo/crypto': path.resolve(__dirname, '../../packages/crypto'),
};

const rootNodeModules = path.resolve(__dirname, '../../node_modules');

const graphqlRequestResolverPath = path.resolve(
	__dirname,
	'../../node_modules/graphql-request/build/esm/index.js',
);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	watchFolders: [rootNodeModules, ...Object.values(monoPackages)],
	resolver: {
		extraNodeModules: monoPackages,
		resolveRequest: (context, moduleName, platform) => {
			if (moduleName.startsWith('graphql-request')) {
				return {
					filePath: graphqlRequestResolverPath,
					type: 'sourceFile',
				};
			}

			return context.resolveRequest(context, moduleName, platform);
		},
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
