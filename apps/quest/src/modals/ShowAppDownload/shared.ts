export interface StoreOption {
	title: string;
	icon: string;
	type: 'Android' | 'iOS';
	size: {
		width: number;
		height: number;
	};
}

export const getStore = (): StoreOption[] => [
	{
		title: 'Download for iOS',
		icon: '/app-store-ic.png',
		type: 'iOS',
		size: {
			width: 32,
			height: 32,
		},
	},
	{
		title: 'Download for Android',
		icon: '/play-store-ic.png',
		type: 'Android',
		size: {
			width: 32,
			height: 35,
		},
	},
];
