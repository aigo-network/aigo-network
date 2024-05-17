type AppConfig = {
	name: string;
	version: string;
};

export const config: AppConfig = require('../../package.json');
