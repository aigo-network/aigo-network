import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'https://dev.api.aigo.network/graphql',
	generates: {
		'./src/graphql/types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
