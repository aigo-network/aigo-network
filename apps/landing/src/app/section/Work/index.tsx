import styled from 'styled-components';

import SectionLayout from '@/components/SectionLayout';

export const HowItWork = () => {
	return (
		<SectionLayout title="How it works">
			<Description>
				AiGO Network is a robust mobility data ecosystem where data providers
				and validators can be incentivized for their contribution and developers
				are empowered to build the next generation of transportation solutions
				with the ease of AiGO SDKs and access to a trusted encrypted mobility
				data pool
			</Description>

			<Diagram />
		</SectionLayout>
	);
};

export default HowItWork;

const Description = styled.p`
	text-align: center;
	font-size: 20px;
	line-height: 30px;
`;

const Diagram = styled.div`
	background: url(/img/how-it-work-img.png) no-repeat center;
	background-size: contain;
	width: 100%;
	aspect-ratio: 2351 / 900;
	margin-top: 50px;
`;
