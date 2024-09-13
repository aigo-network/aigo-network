module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					assets: './assets',
					components: './src/components',
					utils: './src/utils',
					state: './src/state',
					stacks: './src/stacks',
					screens: './src/screens',
					modals: './src/modals',
					api: './src/api',
					crypto: 'react-native-quick-crypto',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
