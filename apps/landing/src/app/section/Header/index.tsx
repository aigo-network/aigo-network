import type { FC } from 'react';
import styled from 'styled-components';

import AiGOLogo from '@/components/icon/AiGOLogo';
import AiGOText from '@/components/icon/AiGOText';

const Header: FC = () => {
	return (
		<Container>
			<LogoGroup>
				<AiGOLogo size={50} />
				<LogoText>
					<AiGOText size={95} />
				</LogoText>
			</LogoGroup>
			<NavBar>
				<NavLink href="#">AiGO Ride App</NavLink>
				<NavLink href="#">Docs</NavLink>
			</NavBar>
			<BurgerMenu>
				<span></span>
				<span></span>
				<span></span>
			</BurgerMenu>
		</Container>
	);
};

export default Header;

const Container = styled.header`
	position: fixed;
	left: 0;
	right: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 15px 25px;
	margin: 0 auto;
	z-index: 1;

	@media (min-width: 576px) {
		max-width: 540px;
	}

	@media (min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
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
`;

const BurgerMenu = styled.div`
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
	}

	@media (min-width: 992px) {
		display: none;
	}
`;
