import { createRef, useEffect, useRef } from 'react';
import styled from 'styled-components';

import NewsCard from './NewsCard';

import useScroll from '@/utils/hook/useScroll';

const NewsGroup = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const activeViewRef = useRef({
		activeView: 0,
	});
	const scrollY = useScroll();

	useEffect(() => {
		if (typeof window === 'object') {
			const numberOfView = Math.ceil(
				(viewportRef.current?.scrollWidth || 1) /
					(containerRef.current?.offsetWidth || 1),
			);

			const interval = setInterval(() => {
				if (activeViewRef.current.activeView === numberOfView - 1) {
					activeViewRef.current.activeView = 0;
				} else {
					activeViewRef.current.activeView += 1;
				}

				viewportRef.current?.scrollTo?.(
					activeViewRef.current.activeView *
						(viewportRef.current.offsetWidth || 0),
					scrollY,
				);
			}, 5000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [viewportRef.current, containerRef.current]);

	return (
		<Container ref={containerRef}>
			<ViewportContainer ref={viewportRef}>
				{Array.from({ length: 8 })
					.fill(() => 0)
					.map((_card, idx) => {
						const ref = createRef<HTMLDivElement>();
						return <NewsCard key={idx} innerRef={ref} />;
					})}
			</ViewportContainer>
		</Container>
	);
};

export default NewsGroup;

const Container = styled.div`
	height: 500px;
	position: relative;
`;

const ViewportContainer = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0px;
	right: 0;
	display: flex;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	padding: 24px;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&:-webkit-scrollbar {
		display: none;
	}
`;
