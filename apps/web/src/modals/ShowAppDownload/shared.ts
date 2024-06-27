import type { User } from '@aigo/api/sdk';

export interface DownloadOption {
	title: string;
	icon: string;
	size: {
		width: number;
		height: number;
	};
	storeUrl: string;
}

export const getDownloadLinks = (user: User): DownloadOption[] => [
	{
		title: 'Download for iOS',
		icon: '/app-store-ic.png',
		size: {
			width: 32,
			height: 32,
		},
		storeUrl: `https://apps.apple.com/app/aigo/id6502833475?referrer=${user?.id}`,
	},
	{
		title: 'Download for Android',
		icon: '/play-store-ic.png',
		size: {
			width: 32,
			height: 35,
		},
		storeUrl: `https://play.google.com/store/apps/details?id=network.aigo.app&referrer=${user?.id}`,
	},
];
