module.exports = {
	root: true,
	extends: ['@metacraft/eslint-config'],
	ignorePatterns: ['node_modules', 'packages/api/sdk.ts'],
	plugins: ['import'],
	env: {
		node: true,
	},
	globals: {
		window: true,
		document: true,
		navigator: true,
		fetch: true,
	},
	rules: {
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{ 'ts-ignore': 'allow-with-description' },
		],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
	},
};
