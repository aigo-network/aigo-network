import styled from 'styled-components';

import './index.css';

import SectionLayout from '@/components/SectionLayout';

const Backers = () => {
	const logos = [
		// {
		// 	src: '/img/backers/animoca.png',
		// 	className: 'backers-logo animoca',
		// },
		{
			src: '/img/backers/ticker-img.png',
			className: 'backers-logo ticker-img',
		},
		{
			src: '/img/backers/waterdrip.png',
			className: 'backers-logo waterdrip',
		},
		{
			src: '/img/backers/k300.svg',
			className: 'backers-logo k300',
		},
		{
			src: '/img/backers/capital-chain.svg',
			className: 'backers-logo capital-chain',
		},
		// {
		// 	src: '/img/backers/nnbox.png',
		// 	className: 'backers-logo nnbox',
		// },
		{
			src: '/img/backers/iotex.svg',
			className: 'backers-logo iotex',
		},
		{
			src: '/img/backers/cryptomind.svg',
			className: 'backers-logo cryptomind',
		},
		{
			src: '/img/backers/tada-img.png',
			className: 'backers-logo tada-img',
		},
		{
			src: '/img/backers/mvl-img.png',
			className: 'backers-logo mvl-img',
		},
		// {
		// 	src: '/img/backers/powerpod-img.png',
		// 	className: 'backers-logo powerpod-img',
		// },
		// {
		// 	src: '/img/backers/iqgpt.png',
		// 	className: 'backers-logo iqgpt',
		// },
	];

	return (
		<SectionLayout
			subTitle="Trusted Partnerships"
			title="Expanding the AiGO Horizon"
		>
			<ContentContainer>
				<LogoContainer>
					{logos.map((logo) => (
						<div className="backers-logo-container" key={logo.src}>
							<img className={logo.className} src={logo.src} />
						</div>
					))}
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
