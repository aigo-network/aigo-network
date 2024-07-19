import { SectionId } from '@/utils/scrollTo';

type NavLink = {
	title: string;
	href?: string;
	onClick?: () => void;
};

export const navLinkArray: NavLink[] = [
	{
		title: 'About',
		href: `/#${SectionId.About}`,
	},
	{
		title: 'Ecosystem',
		href: `/#${SectionId.Ecosystem}`,
	},
	{
		title: 'Partner',
		href: `/#${SectionId.Partner}`,
	},
	{
		title: 'Privacy Policy',
		href: '/privacy-policy',
	},
];
