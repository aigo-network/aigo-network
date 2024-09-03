import styled from 'styled-components';

import SectionLayout from '@/components/SectionLayout';

const Backers = () => {
	return (
		<SectionLayout
			subTitle="Trusted Partnerships"
			title="Expanding the AiGO Horizon"
		>
			<ContentContainer>
				<LogoContainer>
					<img src="/img/backers/gmnetwork-img.png" />
					<img src="/img/backers/iotex-img.png" />
					<img src="/img/backers/app-works-img.png" />
					<img src="/img/backers/mvl-img.png" />
					<img src="/img/backers/tada-img.png" />
					<img src="/img/backers/vana-img.png" />
					<img src="/img/backers/powerpod-img.png" />
					<img src="/img/backers/skyvision-img.png" />
					<img src="/img/backers/ticker-img.png" />
					<img src="/img/backers/nyam-nyam-img.png" />
					<img src="/img/backers/airfoil-img.png" />
					<img src="/img/backers/decharge-img.png" />
				</LogoContainer>
			</ContentContainer>
		</SectionLayout>
	);
};

export default Backers;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding-top: 60px;

	@media (min-width: 992px) {
		padding-bottom: 120px;
	}
`;

const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 25px;

	img {
		width: 140px;
		height: auto;
	}

	@media (min-width: 992px) {
		gap: 45px;
	}
`;
