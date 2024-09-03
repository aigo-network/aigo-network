export const baseDomainName = 'aigo.network';
export const hostedZone = 'aigo.network';

const stageAlias: Record<string, string> = {
	production: '',
	staging: 'staging',
	development: 'dev',
};

const siteAlias = {
	landing: '',
	quest: 'quest',
	ride: 'ride',
};

export const constructDomainName = (
	site: keyof typeof siteAlias,
	stage: string,
) => {
	const stagePrefix = stageAlias[stage] || `${stage}`;
	return [stagePrefix, site, baseDomainName].filter(Boolean).join('.');
};
