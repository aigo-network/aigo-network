import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { navLinkArray } from './shared';

import BasicButton from '@/components/BasicButton';
import AiGOLogo from '@/components/icon/AiGOLogo';
import AiGOText from '@/components/icon/AiGOText';
import DiscordIcon from '@/components/icon/Discord';
import TelegramIcon from '@/components/icon/Telegram';
import TwitterIcon from '@/components/icon/Twitter';
import useScroll from '@/utils/hook/useScroll';

type Props = {
	light?: boolean;
};

const Header: FC<Props> = ({ light }) => {
	const [showSideMenu, setShowSideMenu] = useState(false);
	const router = useRouter();
	const scrollY = useScroll(light ? 1 : 0);

	return (
		<Container $bgActive={scrollY > 0}>
			<InnerContainer>
				<LeftContainer>
					<LogoGroup onClick={() => router.push('/')}>
						<AiGOLogo size={40} />
						<AiGOText size={83} />
					</LogoGroup>
					<LogoGroup>
						<AiGOLogo size={45} />
						<AiGOText size={70} />
					</LogoGroup>
					<NavBar>
						{navLinkArray.map((navLink) => (
							<NavLink key={navLink.title} href={navLink.href || '#'}>
								{navLink.title}
							</NavLink>
						))}
					</NavBar>
				</LeftContainer>

				<RightContainer>
					<SocialGroup>
						<SocialWrapper href="https://x.com/aigo_network" target="_blank">
							<TwitterIcon size={12} color="#171717" />
						</SocialWrapper>
						<SocialWrapper href="https://t.me/aigocommunity" target="_blank">
							<TelegramIcon size={20} color="#fdfdfd" />
						</SocialWrapper>
						<SocialWrapper href="https://discord.gg/vrVFkMdMpH" target="_blank">
							<DiscordIcon size={14} color="#171717" />
						</SocialWrapper>
					</SocialGroup>

					<ExploreButton
						options={2}
						title="Explore AiGO Ride"
						href="https://ride.aigo.network/"
						target="_blank"
					/>

					<BurgerMenu
						$isClosedBtn={showSideMenu}
						onClick={() => setShowSideMenu(!showSideMenu)}
					>
						<span></span>
						<span></span>
						<span></span>
					</BurgerMenu>
				</RightContainer>
			</InnerContainer>
			<SideMenuBackground $active={showSideMenu}>
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
		</Container>
	);
};

export default Header;

const Container = styled.header<{ $bgActive: boolean }>`
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
	width: 100%;
	background: rgba(23, 23, 23, 0.2);
	display: flex;
	align-items: flex-end;
	transition: ease-out 0.3s;
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);

	@media (min-width: 992px) {
		${({ $bgActive }) =>
			$bgActive
				? `
			background: rgba(23, 23, 23, 0.8);
			backdrop-filter: blur(20px);
			-webkit-backdrop-filter: blur(20px);
		`
				: `
			background: transparent;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		`}
		height: auto;
	}
`;

const InnerContainer = styled.div`
	position: relative;
	z-index: 11;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 18px 25px;
	margin: 0 auto;

	@media (min-width: 576px) {
		max-width: var(--max-width-mobile-horizontal);
	}

	@media (min-width: 768px) {
		max-width: var(--max-width-tablet);
	}
	@media (min-width: 992px) {
		max-width: var(--max-width-laptop);
	}
	@media (min-width: 1200px) {
		max-width: var(--max-width-desktop);
	}
`;

const LeftContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 40px;
`;

const LogoGroup = styled.a`
	align-items: center;
	cursor: pointer;
	gap: 8px;

	&:first-child {
		display: none;
	}

	&:nth-child(2) {
		display: flex;
	}

	@media (min-width: 992px) {
		&:first-child {
			display: flex;
		}

		&:nth-child(2) {
			display: none;
		}
	}
`;

const NavBar = styled.nav`
	display: none;

	@media (min-width: 992px) {
		display: flex;
		gap: 20px;
	}
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

const RightContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 18px;
`;

const SocialGroup = styled.div`
	display: none;
	align-items: center;
	gap: 12px;

	@media (min-width: 992px) {
		display: flex;
	}
`;

const SocialWrapper = styled.a`
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

const ExploreButton = styled(BasicButton)`
	display: none;

	@media (min-width: 992px) {
		display: flex;
	}
`;

const BurgerMenu = styled.div<{ $isClosedBtn: boolean }>`
	cursor: pointer;
	align-self: center;

	span {
		border-radius: 3px;
		display: block;
		height: 3px;
		margin-top: 5px;
		transition-duration: 0.3s;
		width: 30px;
		background: #b8b8b8;
		position: relative;
		margin-left: auto;

		&:first-child {
			width: 24px;
		}

		&:last-child {
			width: 16px;
		}

		${({ $isClosedBtn }) =>
			$isClosedBtn
				? `
			&:first-child {
				transform: rotate(45deg);
				top: 8px;
				width: 30px;
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:last-child {
				transform: rotate(-45deg);
				top: -8px;
				width: 30px;
			}
		`
				: ``}
	}

	@media (min-width: 992px) {
		display: none;
	}
`;

const SideMenuBackground = styled.div<{ $active: boolean }>`
	position: absolute;
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
