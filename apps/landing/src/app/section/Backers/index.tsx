import styled from 'styled-components';

import './index.css';

import SectionLayout from '@/components/SectionLayout';

const Backers = () => {
	return (
		<SectionLayout
			subTitle="Trusted Partnerships"
			title="Expanding the AiGO Horizon"
		>
			<ContentContainer>
				<LogoContainer>
					<div className="backers-logo-container">
						<img
							className="backers-logo animoca"
							src="/img/backers/animoca.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo ticker-img"
							src="/img/backers/ticker-img.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo waterdrip"
							src="/img/backers/waterdrip.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img className="backers-logo k300" src="/img/backers/k300.svg" />
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo capital-chain"
							src="/img/backers/capital-chain.svg"
						/>
					</div>
					<div className="backers-logo-container">
						<img className="backers-logo nnbox" src="/img/backers/nnbox.png" />
					</div>
					<div className="backers-logo-container">
						<img className="backers-logo iotex" src="/img/backers/iotex.svg" />
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo cryptomind"
							src="/img/backers/cryptomind.svg"
						/>
					</div>

					<div className="backers-logo-container">
						<img
							className="backers-logo tada-img"
							src="/img/backers/tada-img.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo mvl-img"
							src="/img/backers/mvl-img.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img
							className="backers-logo powerpod-img"
							src="/img/backers/powerpod-img.png"
						/>
					</div>
					<div className="backers-logo-container">
						<img className="backers-logo iqgpt" src="/img/backers/iqgpt.png" />
					</div>
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
	gap: 35px;

	// img {
	// 	width: 140px;
	// 	height: auto;
	// }

	// @media (min-width: 992px) {
	// 	gap: 45px;
	// 	max-width: 1280px;
	// }
`;
