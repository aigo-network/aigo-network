const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	resolver: {
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
