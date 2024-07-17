import { createRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import NewsCard from './NewsCard';

const padding = 24;

const NewsGroup = () => {
	const [offsetX, setOffsetX] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const activeViewRef = useRef({
		activeView: 0,
	});

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

				const newOffsetX =
					activeViewRef.current.activeView *
					((viewportRef.current?.offsetWidth || 0) - 2 * padding);
				setOffsetX(newOffsetX);
			}, 5000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [viewportRef.current, containerRef.current]);

	return (
		<Container ref={containerRef}>
			<ViewportContainer ref={viewportRef}>
				<InnerContainer $offsetX={offsetX}>
					{Array.from({ length: 8 })
						.fill(() => 0)
						.map((_card, idx) => {
							const ref = createRef<HTMLDivElement>();
							return <NewsCard key={idx} innerRef={ref} />;
						})}
				</InnerContainer>
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
	padding: ${padding}px;
	overflow: hidden;
`;

const InnerContainer = styled.div<{ $offsetX: number }>`
	display: flex;
	width: 100%;
	height: 100%;
	transform: translateX(-${({ $offsetX }) => $offsetX}px);
	transition: ease-out 0.5s;
`;
