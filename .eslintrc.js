module.exports = {
	root: true,
	extends: ['@metacraft/eslint-config'],
	ignorePatterns: ['node_modules', 'src/api/sdk.ts'],
	env: {
		node: true,
	},
	globals: {
		window: true,
		document: true,
		navigator: true,
		fetch: true,
	},
};
