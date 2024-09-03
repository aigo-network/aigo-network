export const baseDomainName = 'aigo.network';
export const hostedZone = 'aigo.network';

const stageAlias: Record<string, string> = {
	production: ' ',
	staging: 'staging',
	development: 'dev',
};

const siteAlias = {
	landing: ' ',
	quest: 'quest',
	ride: 'ride',
};

export const constructDomainName = (
	site: keyof typeof siteAlias,
	stage: string,
) => {
	const stagePrefix = (stageAlias[stage] || `${stage}`).trim();
	const sitePrefix = (siteAlias[site] || site).trim();
	const domainName = [stagePrefix, sitePrefix, baseDomainName]
		.filter(Boolean)
		.join('.');

	console.log('Domain', domainName);

	return domainName;
};
