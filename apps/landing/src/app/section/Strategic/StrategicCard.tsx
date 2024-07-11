import styled from 'styled-components';

import LeftArrow from '@/components/icon/LeftArrow';

const StrategicCard = () => {
	return (
		<Container>
			<CardImage />
			<CardDetail>
				<DetailWrapper>
					<img src="/img/tada-logo-img.png" />
					<span>Ho Chi Minh City, Vietnam🇻🇳</span>
				</DetailWrapper>
				<DetailWrapper>
					<p>
						AiGO Ride has formed a strategic partnership with TADA, the
						blockchain-based ride-hailing service operated by MVL in Vietnam.
						Through this collaboration, the two companies aim to strengthen
						their presence and business cooperation in the Vietnamese and
						broader Southeast Asian markets.
					</p>
					<a href="#">
						Coming soon <LeftArrow size={18} />
					</a>
				</DetailWrapper>
			</CardDetail>
		</Container>
	);
};

export default StrategicCard;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	background: #1e1e1e;
	gap: 80px;
	padding: 40px 24px;

	@media (min-width: 992px) {
		flex-direction: row-reverse;
		align-items: stretch;
		gap: 50px;
		padding: 45px;
	}
`;

const CardImage = styled.div`
	width: 100%;
	aspect-ratio: 1;
	margin: 0 auto;
	border-radius: inherit;
	overflow: hidden;
	background: url(/img/tada-img.png) no-repeat center;
	background-size: cover;

	@media (min-width: 992px) {
		flex: 1;
	}
`;

const CardDetail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 32px;

	@media (min-width: 992px) {
		flex: 1;
		gap: 120px;
	}
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;

	& > img {
		width: 120px;
		height: auto;
	}

	& > span {
		font-size: 16px;
	}

	& > p {
		font-size: 16px;
		line-height: 26px;
		max-width: 550px;
	}

	& > a {
		display: inline-flex;
		align-items: center;
		font-size: 16px;
		color: var(--primary-color);
		text-decoration: none;
		opacity: 0.3;
		gap: 10px;

		svg {
			transform: rotate(180deg);
		}
	}

	@media (min-width: 992px) {
		& > img {
			width: 200px;
		}
	}
`;
