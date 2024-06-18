export const baseDomainName = 'aigo.network';
export const hostedZone = 'aigo.network';

export const getDomainNameByStage = (prefix: string) => {
	return `${prefix.trim()}${baseDomainName}`;
};
