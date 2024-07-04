import type { FC } from 'react';
import styled from 'styled-components';

import GradientButton from '@/components/GradientButton';

const Banner: FC = () => {
	return (
		<Container>
			<HeroImg />
			<ContentContainer>
				<div>
					<Title>AiGO Network</Title>
					<SubTitle>
						The first decentralized AI-optimized mobility data network for{' '}
						<span>two-wheelers</span>
					</SubTitle>
					<BtnGroup>
						<GradientButton title="Get Started" />
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
	height: 100vh;
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
	background-image: linear-gradient(
		115deg,
		rgba(17, 17, 17, 1),
		rgba(24, 24, 23, 0.3)
	);

	& > div {
		height: 100%;
		margin: 0 auto;
		padding: 0 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 25px;
	}

	@media (min-width: 992px) {
		& > div {
			max-width: var(--max-width-laptop);
			align-items: flex-start;
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
	font-size: 45px;

	@media (min-width: 992px) {
		font-size: 65px;
	}
`;

const SubTitle = styled.p`
	font-family: var(--secondary-font);
	font-weight: 700;
	font-size: 25px;
	text-align: center;

	span {
		color: var(--secondary-color);
	}

	@media (min-width: 576px) {
		max-width: 540px;
	}

	@media (min-width: 992px) {
		max-width: 600px;
		font-size: 45px;
		text-align: left;
	}
`;

const BtnGroup = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
`;
