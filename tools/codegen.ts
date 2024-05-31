import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://dev.api.aigo.network/graphql',
	documents: ['src/**/*.ts'],
	generates: {
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./src/api/sdk.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
		},
	},
};

export default config;
