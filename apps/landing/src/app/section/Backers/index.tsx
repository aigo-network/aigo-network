import styled from 'styled-components';

import SectionLayout from '@/components/SectionLayout';

const Backers = () => {
	return (
		<SectionLayout
			subTitle="Trusted Partnerships"
			title="Expanding the AiGO Horizon"
		>
			<ContentContainer>
				<LogoLine>
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
				</LogoLine>
				<MobileLogo>
					<img src="/img/backers/gmnetwork-img.png" />
					<img src="/img/backers/iotex-img.png" />
					<img src="/img/backers/app-works-img.png" />
					<img src="/img/backers/tada-img.png" />
					<img src="/img/backers/mvl-img.png" />
					<img src="/img/backers/powerpod-img.png" />
					<img src="/img/backers/skyvision-img.png" />
					<img src="/img/backers/ticker-img.png" />
					<img src="/img/backers/nyam-nyam-img.png" />
					<img src="/img/backers/airfoil-img.png" />
				</MobileLogo>
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

const LogoLine = styled.div`
	display: none;

	img {
		width: 140px;
		height: auto;
	}

	@media (min-width: 992px) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 45px;
	}
`;

const MobileLogo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 25px;

	& > img {
		max-width: 150px;
	}

	@media (min-width: 992px) {
		display: none;
	}
`;
