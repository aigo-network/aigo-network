import type { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { navLinkArray, SocialGroup, SocialWrapper } from './shared';

import BasicButton from '@/components/BasicButton';
import DiscordIcon from '@/components/icon/Discord';
import TelegramIcon from '@/components/icon/Telegram';
import TwitterIcon from '@/components/icon/Twitter';

export type Props = {
	show: boolean;
};

export const SideMenu: FC<Props> = ({ show }) => {
	return (
		<SideMenuBackground $active={show}>
			<Menu>
				<MenuHead>Menu</MenuHead>
				{navLinkArray.map((navLink) => (
					<SideNav key={navLink.title} href={navLink.href || '#'}>
						{navLink.title}
					</SideNav>
				))}
			</Menu>
			<SideMenuBottom>
				<SideSocialGroup>
					<SideSocial href="https://x.com/aigo_network" target="_blank">
						<TwitterIcon size={18} color="#171717" />
					</SideSocial>
					<SideSocial href="https://t.me/aigocommunity" target="_blank">
						<TelegramIcon size={33} color="#fdfdfd" />
					</SideSocial>
					<SideSocial href="https://discord.gg/vrVFkMdMpH" target="_blank">
						<DiscordIcon size={20} color="#171717" />
					</SideSocial>
				</SideSocialGroup>
				<BasicButton
					style={{ justifyContent: 'center' }}
					options={2}
					title="Explore AiGO Ride"
					href="https://ride.aigo.network/"
					target="_blank"
				/>
			</SideMenuBottom>
		</SideMenuBackground>
	);
};

const SideMenuBackground = styled.div<{ $active: boolean }>`
	position: fixed;
	z-index: 13;
	top: 0;
	left: ${({ $active }) => ($active ? '0' : '-80vw')};
	width: 80vw;
	height: 100vh;
	background: #1b1b1b;
	transition: ease-out 0.3s;
	padding: 43px 32px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 40px;
	margin: 0 auto;
	width: 100%;
`;

const MenuHead = styled.span`
	font-size: 18px;
	line-height: 32px;
	color: #b8b8b8;
`;

const NavLink = styled(Link)`
	text-decoration: none;
	padding: 5px;
	color: var(--primary-color);
	font-size: 18px;

	&:hover {
		cursor: pointer;
	}
`;

const SideNav = styled(NavLink)`
	font-size: 32px;
	font-weight: 500;
`;

const SideMenuBottom = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
	gap: 12px;
`;

const SideSocialGroup = styled(SocialGroup)`
	display: flex;
	gap: 15px;
`;

const SideSocial = styled(SocialWrapper)`
	width: 32px;
	height: 32px;

	&:nth-child(2) {
		width: 34px;
		height: 34px;
	}
`;
