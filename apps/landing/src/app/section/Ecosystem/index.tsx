import styled from 'styled-components';

import EcosystemCard from './EcosystemCard';

import SectionLayout from '@/components/SectionLayout';

const Ecosystem = () => {
	return (
		<SectionLayout
			subTitle="Ecosystem"
			title="A comprehensive mobility network"
			fullWidth
		>
			<InnerContainer>
				<div>
					<EcosystemCard
						title="AiGO Ride"
						tag="Mobile App"
						detail={{
							title: `Share & earn/from your route`,
							text: `The world's first DePIN network for two-wheelers/to own and earn your everyday move.`,
						}}
						image="/img/ecosystem/app-img.png"
					/>
					<EcosystemCard
						title="AiGO Map"
						tag="Web Application"
						detail={{
							title: `Real-time two-wheeler/mobility data`,
							text: `A dynamic visualization tool that showcases/aggregated mobility data and patterns from AiGO network.`,
						}}
						image="/img/ecosystem/map-img.png"
					/>
					<EcosystemCard
						title="AiGO SDK"
						tag="SDK Development"
						detail={{
							title: `Open Mobility Data/Platform`,
							text: `Empower developers to build the next generation/of transportation solutions.`,
						}}
						image="/img/ecosystem/map-img.png"
					/>
				</div>
			</InnerContainer>
		</SectionLayout>
	);
};

export default Ecosystem;

const InnerContainer = styled.div`
	position: relative;
	width: 100%;

	& > div {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 0 25px;
		margin: 0 auto;
	}

	&:before {
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 90%;
		top: 50%;
		transform: translateY(-50%);
		background: #1c1b1b;
		z-index: 1;
	}

	@media (min-width: 576px) {
		& > div {
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
			flex-direction: row;
			flex-wrap: wrap;
			align-items: stretch;
		}
	}

	@media (min-width: 1200px) {
		& > div {
			max-width: var(--max-width-desktop);
		}
	}
`;
