import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://dev.api.aigo.network/graphql',
	documents: ['packages/api/queries/*.ts', 'packages/api/mutations/*.ts'],
	generates: {
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
		'./packages/api/sdk.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
		},
	},
};

export default config;
