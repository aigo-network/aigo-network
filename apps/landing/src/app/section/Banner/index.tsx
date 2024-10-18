import type { FC } from 'react';
import styled from 'styled-components';

import { AnimatedNum } from '@/components/AnimatedNum';
import BasicButton from '@/components/BasicButton';
import { raleway } from '@/utils/styles';

const Banner: FC<{ headerHeight: number }> = ({ headerHeight }) => {
	console.log('headerHeight', headerHeight);
	return (
		<div>
			<HeroImg />
			<Container
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '20px',
					height: `calc(100vh - 77px)`,
				}}
			>
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
							/>
							{/* <LinkBtn href="https://quest.aigo.network/" target="_blank">
							AiGO Quest SS1
						</LinkBtn> */}
						</BtnGroup>
					</div>
				</ContentContainer>

				<DataContainer>
					<DataBox>
						{dataItems.map(({ title, value }) => {
							return (
								<DataItemContainer key={title}>
									<DataItemTitle>{title}</DataItemTitle>
									<DataItemValue>
										<AnimatedNum
											formatter={(num) => num.toLocaleString().split('.')[0]}
											duration={3000}
											target={Number(value)}
										/>
									</DataItemValue>
								</DataItemContainer>
							);
						})}
					</DataBox>
				</DataContainer>
			</Container>
		</div>
	);
};

export default Banner;

const dataItems = [
	{
		title: 'Registered devices on DePINscan',
		value: '32115',
	},
	{
		title: 'AiGO mini app monthly users',
		value: '192021',
	},
	{
		title: 'TX on Base Chain',
		value: '71538',
	},
	{
		title: 'Social media followers ',
		value: '250831',
	},
];

const Container = styled.section`
	position: relative;
`;

const HeroImg = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background: url(/img/hero-img.png) no-repeat center;
	background-size: cover;
	background-position: center;
	height: 100%;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	& > div {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		padding: 0 25px;
		gap: 25px;
	}

	@media (min-width: 576px) {
		& > div {
			transform: translateY(0px);
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

const DataContainer = styled.div`
	// position: absolute;
	left: 0;
	right: 0;
	// transform: translateY(50%);
	padding: 18px 25px;
`;

const DataBox = styled.div`
	margin: 0px auto;
	background-color: #181717;
	border: solid 1px #ffffff1a;
	border-radius: 20px;
	padding: 32px 44px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 30px;

	@media (min-width: 576px) {
		max-width: var(--max-width-mobile-horizontal);
	}
	@media (min-width: 768px) {
		max-width: 100%;
	}
	@media (min-width: 992px) {
		max-width: var(--max-width-laptop);
	}
	@media (min-width: 1200px) {
		max-width: var(--max-width-desktop);
	}
`;

const DataItemContainer = styled.div`
	flex: 1;
	width: auto;

	@media (min-width: 992px) {
		width: 300px;
	}
`;

const DataItemTitle = styled.p`
	text-align: center;
	font-size: 14px;
	line-height: 18px;
	color: #fdfdfd52;
	font-family: ${raleway.style.fontFamily};
	text-wrap: nowrap;

	@media (min-width: 576px) {
		font-size: 16px;
		line-height: 18px;
	}
`;

const DataItemValue = styled.p`
	text-align: center;
	font-size: 30px;
	line-height: 40px;
	font-family: ${raleway.style.fontFamily};
	font-weight: 600;

	@media (min-width: 576px) {
		font-size: 36px;
		line-height: 48px;
	}
`;
