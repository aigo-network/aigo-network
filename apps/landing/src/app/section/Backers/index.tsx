import styled from 'styled-components';

import SectionLayout from '@/components/SectionLayout';

const Backers = () => {
	return (
		<SectionLayout subTitle="Supporting Partners" title="Wide-range of support">
			<ContentContainer>
				<LogoLine>
					<img src="/img/backers/ticker-img.png" />
					<img src="/img/backers/nyam-nyam-img.png" />
					<img src="/img/backers/app-works-img.png" />
					<img src="/img/backers/mvl-img.png" />
				</LogoLine>
				<LogoLine>
					<img src="/img/backers/lcs-img.png" />
					<img src="/img/backers/skyvision-img.png" />
					<img src="/img/backers/caf-img.png" />
					<img src="/img/backers/airfoil-img.png" />
					{/* <img src="/img/backers/p-img.png" />
					<img src="/img/backers/tada-img.png" /> */}
				</LogoLine>
				<MobileLogo>
					<img src="/img/backers/ticker-img.png" />
					<img src="/img/backers/nyam-nyam-img.png" />
					<img src="/img/backers/app-works-img.png" />
					<img src="/img/backers/mvl-img.png" />
					<img src="/img/backers/lcs-img.png" />
					<img src="/img/backers/skyvision-img.png" />
					<img src="/img/backers/caf-img.png" />
					<img src="/img/backers/airfoil-img.png" />
					{/* <img src="/img/backers/p-img.png" />
					<img src="/img/backers/tada-img.png" /> */}
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
	padding-bottom: 200px;
`;

const LogoLine = styled.div`
	display: none;

	img {
		width: 200px;
		height: auto;
	}

	@media (min-width: 768px) {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
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

	@media (min-width: 768px) {
		display: none;
	}
`;
