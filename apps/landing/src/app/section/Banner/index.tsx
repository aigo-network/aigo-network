import type { FC } from 'react';
import styled from 'styled-components';

import BasicButton from '@/components/BasicButton';

const Banner: FC = () => {
	return (
		<Container>
			<HeroImg />
			<ContentContainer>
				<div>
					<Title>
						Transforming Urban Mobility
						<br />
						With <span>Decentralized Geo-Location Data</span>
					</Title>
					<SubTitle>
						AiGO Network is the first real-time, plug-and-play DePIN data
						network offering decentralized access to verified GPS and
						geo-location data.
					</SubTitle>
					<BtnGroup>
						<BasicButton
							title="Share your move"
							href="https://ride.aigo.network/"
							target="_blank"
							titleColor="#FDFDFD"
						/>
						{/* <LinkBtn href="https://quest.aigo.network/" target="_blank">
							AiGO Quest SS1
						</LinkBtn> */}
					</BtnGroup>
				</div>
			</ContentContainer>
		</Container>
	);
};

export default Banner;

const Container = styled.section`
	position: relative;
`;

const HeroImg = styled.div`
	width: 100%;
	background: url(/img/hero-img.png) no-repeat center;
	background-size: cover;

	@media (min-width: 576px) {
		height: 700px;
	}

	@media (min-width: 992px) {
		height: 100vh;
	}
`;

const ContentContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;

	& > div {
		height: 100%;
		margin: 0 auto;
		padding: 0 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 25px;
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

const Title = styled.p`
	font-family: var(--secondary-font);
	font-weight: 700;
	font-size: 32px;
	line-height: 40px;

	span {
		color: var(--secondary-color);
	}

	@media (min-width: 992px) {
		max-width: 700px;
		font-size: 45px;
		line-height: 56px;
	}
`;

const SubTitle = styled.p`
	font-size: 18px;
	line-height: 28px;
	color: #b8b8b8;

	@media (min-width: 992px) {
		max-width: 700px;
	}
`;

const BtnGroup = styled.div`
	display: flex;
	gap: 48px;
	align-items: center;
`;

// const LinkBtn = styled.a`
// 	font-size: 16px;
// 	font-weight: 500;
// 	text-decoration: none;
// 	color: #888888;
// 	transition: ease-out 0.3s;

// 	&:hover {
// 		color: #fdfdfd;
// 	}
// `;
