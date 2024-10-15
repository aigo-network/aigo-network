import styled from 'styled-components';

import AiGOLogo from '@/components/icon/AiGOLogo';
import AiGOText from '@/components/icon/AiGOText';
import DiscordIcon from '@/components/icon/Discord';
import GitbookIcon from '@/components/icon/Gitbook';
import GithubIcon from '@/components/icon/Github';
import MirrorIcon from '@/components/icon/MirrorIcon';
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
						The First DePIN for Mobility Geo-Location Data. <br /> Share your
						data on your terms, and be rewarded in the long term.
					</Description>
					<SocialGroup>
						<a
							href="https://x.com/aigo_network"
							target="_blank"
							rel="noreferrer"
						>
							<TwitterIcon size={30} />
						</a>
						<a
							href="https://discord.gg/vrVFkMdMpH"
							target="_blank"
							rel="noreferrer"
						>
							<DiscordIcon size={40} />
						</a>
						<a
							href="https://t.me/aigo_network"
							target="_blank"
							rel="noreferrer"
						>
							<TelegramIcon size={34} />
						</a>
						<a
							href="https://github.com/aigo-network"
							target="_blank"
							rel="noreferrer"
						>
							<GithubIcon size={34} />
						</a>
						<a
							href="https://legacy-doc.aigo.network/"
							target="_blank"
							rel="noreferrer"
						>
							<GitbookIcon size={40} />
						</a>
						<a
							href="https://mirror.xyz/0x9B5691025120Af46356c20e9be3EbBd400B85f30"
							target="_blank"
							rel="noreferrer"
						>
							<MirrorIcon size={34} />
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
		padding-top: 80px;
		margin: 0 auto;
	}

	@media (min-width: 576px) {
		& > div {
			max-width: var(--max-width-mobile-horizontal);
		}
	}

	@media (min-width: 768px) {
		& > div {
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
	font-size: 20px;
	text-align: center;
	line-height: 30px;
	max-width: 700px;
`;

const SocialGroup = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 60px;

	& > a {
		padding: 10px 15px;
	}
`;

const Copyright = styled.p`
	margin-top: 30px;
	font-size: 14px;
`;