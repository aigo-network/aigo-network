import type { CodegenConfig } from '@graphql-codegen/cli';
import { configDotenv } from 'dotenv';

configDotenv({ path: '.env.development' });

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_ENDPOINT,
	generates: {
		'./utils/graphql/types.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;

