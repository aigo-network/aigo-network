import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import EcosystemCard from './EcosystemCard';

import SectionLayout from '@/components/SectionLayout';
import { scrollMap, SectionId } from '@/utils/scrollTo';

const Ecosystem = () => {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (ref.current) {
			scrollMap[SectionId.Ecosystem] = ref;
		}
	}, [ref.current]);

	return (
		<SectionLayout
			subTitle="Ecosystem"
			title="Comprehensive Mobility Solutions"
			fullWidth
			innerRef={ref}
		>
			<InnerContainer>
				<div>
					<EcosystemCard
						title="AiGO Ride"
						tag="Mobile App"
						detail={{
							title: `Share & earn/from your route`,
							text: `The world's first DePIN network for two-wheelers to own and earn your everyday move.`,
						}}
						image="/img/ecosystem/app-img.png"
						button={{
							link: 'https://ride.aigo.network/',
							title: 'Download & earn now',
						}}
					/>
					<EcosystemCard
						title="AiGO Map"
						tag="Web Application"
						detail={{
							title: `Real-time two-wheeler/mobility data`,
							text: `A dynamic visualization tool that showcases aggregated mobility data and patterns from AiGO network.`,
						}}
						image="/img/ecosystem/map-img.png"
						comingSoon
					/>
					<EcosystemCard
						title="AiGO SDK"
						tag="SDK Development"
						detail={{
							title: `Open Mobility/Data Platform`,
							text: `Empower developers to build the next generation of transportation solutions.`,
						}}
						image="/img/ecosystem/sdk-img.png"
						comingSoon
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
