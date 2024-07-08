import styled from 'styled-components';

import AiGOLogo from '@/components/icon/AiGOLogo';
import AiGOText from '@/components/icon/AiGOText';
import DiscordIcon from '@/components/icon/Discord';
import GithubIcon from '@/components/icon/Github';
import TelegramIcon from '@/components/icon/Telegram';
import TwitterIcon from '@/components/icon/Twitter';

const Footer = () => {
	return (
		<Container>
			<FooterBackground />

			<FooterContent>
				<div>
					<LogoGroup>
						<AiGOLogo size={90} />
						<AiGOText size={70} />
					</LogoGroup>
					<Description>
						The two-wheeler’s network that’s powering the future of mobility.
						Share your data on your terms, and be rewarded in the long term.
					</Description>
					<SocialGroup>
						<a href="#">
							<TwitterIcon size={30} />
						</a>
						<a href="#">
							<DiscordIcon size={40} />
						</a>
						<a href="#">
							<TelegramIcon size={34} />
						</a>
						<a href="#">
							<GithubIcon size={34} />
						</a>
					</SocialGroup>
					<Copyright>© 2024 AiGO Network®. All rights reserved</Copyright>
				</div>
			</FooterContent>
		</Container>
	);
};

export default Footer;

const Container = styled.footer`
	position: relative;
	max-height: 800px;
	height: 100vh;
	overflow: hidden;
`;

const FooterBackground = styled.div`
	height: 100%;
	background: url(/img/footer-bg-img.png) no-repeat center;
	background-size: cover;
	filter: grayscale(50%);
`;

const FooterContent = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	& > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 25px;
		padding-top: 50px;
		margin: 0 auto;
	}

	@media (min-width: 576px) {
		& > div {
			max-width: var(--max-width-mobile-horizontal);
		}
	}

	@media (min-width: 768px) {
		& > div {
			// padding-top: 20vh;
			max-width: var(--max-width-tablet);
		}
	}

	@media (min-width: 992px) {
		& > div {
			max-width: var(--max-width-laptop);
		}
	}

	@media (min-width: 1200px) {
		& > div {
			max-width: var(--max-width-desktop);
		}
	}
`;

const LogoGroup = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;
`;

const Description = styled.p`
	margin-top: 30px;
	font-family: var(--secondary-font);
	font-size: 20px;
	text-align: center;
	line-height: 30px;
`;

const SocialGroup = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 5px;
	margin-top: 60px;

	& > a {
		padding: 10px 15px;
	}
`;

const Copyright = styled.p`
	margin-top: 30px;
	font-size: 18px;
`;
