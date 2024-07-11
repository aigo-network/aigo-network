import type { FC } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import AiGOLogo from '@/components/icon/AiGOLogo';
import AiGOText from '@/components/icon/AiGOText';
import { scrollTo, SectionId } from '@/utils/scrollTo';

const Header: FC = () => {
	const [showSideMenu, setShowSideMenu] = useState(false);

	return (
		<Container>
			<InnerContainer>
				<LogoGroup>
					<AiGOLogo size={50} />
					<LogoText>
						<AiGOText size={95} />
					</LogoText>
				</LogoGroup>
				<NavBar>
					<NavLink href="https://ride.aigo.network/" target="_blank">
						AiGO Ride App
					</NavLink>
					<NavLink onClick={() => scrollTo(SectionId.About)}>About</NavLink>
					<NavLink onClick={() => scrollTo(SectionId.Ecosystem)}>
						Ecosystem
					</NavLink>
					<NavLink onClick={() => scrollTo(SectionId.Partner)}>Partner</NavLink>
					{/* <NavLink href="#">Docs</NavLink> */}
				</NavBar>
				<BurgerMenu
					$isClosedBtn={showSideMenu}
					onClick={() => setShowSideMenu(!showSideMenu)}
				>
					<span></span>
					<span></span>
					<span></span>
				</BurgerMenu>
			</InnerContainer>
			<SideMenuBackground $active={showSideMenu}>
				<CloseButton onClick={() => setShowSideMenu(false)}>
					<span />
					<span />
				</CloseButton>
				<Menu>
					<NavLink href="https://ride.aigo.network/" target="_blank">
						AiGO Ride App
					</NavLink>
					{/* <NavLink href="#">Docs</NavLink> */}
				</Menu>
			</SideMenuBackground>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	position: fixed;
	left: 0;
	right: 0;
	z-index: 10;
	width: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(5px);
`;

const InnerContainer = styled.div`
	position: relative;
	z-index: 11;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 15px 25px;
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

const LogoGroup = styled.a`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const LogoText = styled.div`
	display: none;

	@media (min-width: 768px) {
		display: block;
	}
`;

const NavBar = styled.nav`
	display: none;

	@media (min-width: 992px) {
		display: flex;
		gap: 20px;
	}
`;

const NavLink = styled.a`
	text-decoration: none;
	padding: 5px;
	color: var(--primary-color);

	&:hover {
		cursor: pointer;
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
		background: var(--primary-color);
		position: relative;

		${({ $isClosedBtn }) =>
			$isClosedBtn
				? `
			&:first-child {
				transform: rotate(45deg);
				top: 8px;
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:last-child {
				transform: rotate(-45deg);
				top: -8px;
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
	left: ${({ $active }) => ($active ? '0' : '-300px')};
	width: 300px;
	height: 100vh;
	background: #1b1b1b;
	transition: ease-out 0.3s;
`;

const CloseButton = styled.div`
	position: relative;
	width: 26px;
	height: 26px;
	cursor: pointer;
	margin: 25px 25px 25px auto;

	span {
		position: absolute;
		display: block;
		width: 100%;
		height: 2px;
		border-radius: 6px;
		background: #ffffff;

		&:first-child {
			top: 12px;
			left: 0;
			transform: rotate(45deg);
		}

		&:last-child {
			bottom: 12px;
			left: 0;
			transform: rotate(-45deg);
		}
	}
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	max-width: 50%;
	gap: 10px;
	margin: 0 auto;
`;
