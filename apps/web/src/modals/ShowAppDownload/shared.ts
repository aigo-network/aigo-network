import type { User } from '@aigo/api/sdk';

export interface DownloadOption {
	title: string;
	storeUrl: string;
}

export const getDownloadLinks = (user: User): DownloadOption[] => [
	{
		title: 'iOS',
		storeUrl: `https://apps.apple.com/app/aigo/id6502833475?referrer=${user?.id}`,
	},
	{
		title: 'Android',
		storeUrl: `https://play.google.com/store/apps/details?id=network.aigo.app&referrer=${user?.id}`,
	},
];
