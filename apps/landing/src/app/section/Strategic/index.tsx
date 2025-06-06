import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import StrategicCard from './StrategicCard';

import LeftArrow from '@/components/icon/LeftArrow';
import SectionLayout from '@/components/SectionLayout';
import { scrollMap, SectionId } from '@/utils/scrollTo';

const cards = [
	// {
	// 	image: {
	// 		desktopUrl: '/img/partnership/nyam-nyam-img.png',
	// 		mobileUrl: '/img/partnership/nyam-nyam-rect-img.png',
	// 	},
	// 	logoUrl: '/img/partnership/nyam-nyam-logo-img.png',
	// 	location: 'South Korea 🇰🇷',
	// 	description:
	// 		'AiGO Ride has partnered with Nyam Nyam Box, a leading food delivery platform, to onboard over 80,000 delivery drivers in South Korea and enhance the delivery experience through gamified incentives for sustainable transportation.',
	// },
	{
		image: {
			desktopUrl: '/img/partnership/tada-img.png',
			mobileUrl: '/img/partnership/tada-rect-img.png',
		},
		logoUrl: '/img/partnership/tada-logo-img.png',
		location: 'Ho Chi Minh City, Vietnam🇻🇳',
		description:
			'AiGO Ride has formed a strategic partnership with TADA, the blockchain-based ride-hailing service operated by MVL in Vietnam. Through this collaboration, the two companies aim to strengthen their presence and business cooperation in the Vietnamese and broader Southeast Asian markets.',
	},
];
const gap = 24;

const StrategicPartner = () => {
	const [offsetX, setOffsetX] = useState(0);
	const ref = useRef<HTMLElement>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const activeIndex = useRef(0);

	const slidePrev = () => {
		const nextIndex =
			activeIndex.current === cards.length - 1 ? 0 : activeIndex.current + 1;
		activeIndex.current = nextIndex;
		const newOffsetX = (carouselRef.current?.clientWidth || 0) + gap;
		setOffsetX(nextIndex * newOffsetX);
	};

	const slideNext = () => {
		const nextIndex =
			activeIndex.current === cards.length - 1 ? 0 : activeIndex.current + 1;
		activeIndex.current = nextIndex;
		const newOffsetX = (carouselRef.current?.clientWidth || 0) + gap;
		setOffsetX(nextIndex * newOffsetX);
	};

	useEffect(() => {
		if (ref.current) {
			scrollMap[SectionId.Partner] = ref;
		}
	}, [ref.current]);

	useEffect(() => {
		const interval = setInterval(() => slideNext(), 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<SectionLayout
			innerRef={ref}
			subTitle="Strategic Partnership"
			title="Expanding our reach in APAC"
			id={SectionId.Partner}
		>
			<Carousel>
				<CarouselViewport ref={carouselRef}>
					<CarouselInner $offsetX={offsetX}>
						{cards.map((card, index) => (
							<StrategicCard
								key={index}
								image={card.image}
								logoUrl={card.logoUrl}
								location={card.location}
								description={card.description}
							/>
						))}
					</CarouselInner>
				</CarouselViewport>

				<ButtonGroup>
					<SlideButton onClick={slidePrev}>
						<LeftArrow color="#171717" />
					</SlideButton>
					<SlideButton onClick={slideNext}>
						<LeftArrow color="#171717" />
					</SlideButton>
				</ButtonGroup>
			</Carousel>
		</SectionLayout>
	);
};

export default StrategicPartner;

const Carousel = styled.div`
	margin: 0 auto;
	height: 710px;
	position: relative;

	@media (min-width: 576px) {
		height: 720px;
	}

	@media (min-width: 768px) {
		height: 800px;
	}

	@media (min-width: 992px) {
		height: 510px;
	}

	@media (min-width: 1200px) {
		height: 560px;
	}
`;

const CarouselViewport = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 40px;
	overflow: hidden;
`;

const CarouselInner = styled.div<{ $offsetX: number }>`
	display: flex;
	gap: ${gap}px;
	transform: translateX(-${({ $offsetX }) => $offsetX}px);
	transition: ease-out 0.5s;
	width: 100%;
	height: 100%;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;
	gap: 12px;
	width: 100%;
	position: absolute;
	top: 100%;
	transform: translateY(-50%);

	@media (min-width: 992px) {
		justify-content: space-between;
		top: 50%;
	}
`;

const SlideButton = styled.a`
	width: 56px;
	height: 56px;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #cbcbcb;
	cursor: pointer;
	&:last-child {
		transform: rotate(180deg);
	}

	@media (min-width: 992px) {
		transform: translateX(-50%);

		&:last-child {
			transform: rotate(180deg) translateX(-50%);
		}
	}
`;
