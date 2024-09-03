import Link from 'next/link';
import styled from 'styled-components';

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

export const NavBar = styled.nav`
	display: none;

	@media (min-width: 992px) {
		display: flex;
		gap: 20px;
	}
`;

export const NavLink = styled(Link)`
	text-decoration: none;
	padding: 5px;
	color: var(--primary-color);
	font-size: 18px;

	&:hover {
		cursor: pointer;
	}
`;

export const SocialGroup = styled.div`
	display: none;
	align-items: center;
	gap: 12px;

	@media (min-width: 992px) {
		display: flex;
	}
`;

export const SocialWrapper = styled.a`
	width: 20px;
	height: 20px;
	border-radius: 16px;
	background: #fdfdfd;
	display: flex;
	align-items: center;
	justify-content: center;

	&:nth-child(2) {
		width: 18px;
		height: 18px;
		background: #171717;

		& > svg {
			margin: -1px;
		}
	}
`;
