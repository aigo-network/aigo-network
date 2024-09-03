import styled from 'styled-components';

import SectionLayout from '@/components/SectionLayout';

export const HowItWork = () => {
	return (
		<SectionLayout
			subTitle="AiGO Network"
			title="Powering the Future of Mobility"
		>
			<Description>
				AiGO enables data providers to stream mobility intelligence on a network
				that caters for their privacy and security. Using an assembly of
				cutting-edge DePIN technologies and AI algorithms, it computes mobility
				data to actionable inferences that can be used by key players in the
				human mobility sector via permissionless integrations.
			</Description>

			<Diagram />
		</SectionLayout>
	);
};

export default HowItWork;

const Description = styled.p`
	text-align: center;
	font-size: 16px;
	line-height: 24px;
	color: #b8b8b8;

	@media (min-width: 992px) {
		font-size: 18px;
		line-height: 30px;
	}
`;

const Diagram = styled.div`
	background: url(/img/how-it-work-img.png) no-repeat center;
	background-size: contain;
	width: 100%;
	aspect-ratio: 2351 / 900;
	margin-top: 50px;
`;
