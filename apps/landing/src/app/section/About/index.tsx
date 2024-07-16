import type { FC } from 'react';
import { Fragment, useMemo, useRef } from 'react';
import styled from 'styled-components';

import useDimension from '@/utils/hook/useDimension';
import useScroll from '@/utils/hook/useScroll';

interface Props {
	data: string;
}

const About: FC<Props> = ({ data }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const { height: windowHeight } = useDimension();
	const scrollY = useScroll();
	const { topBound = 0, rangeBound = 0 } = useMemo(() => {
		const { offsetTop = 0, offsetHeight = 0 } = elementRef.current || {};
		const topBound = offsetTop - 0.2 * windowHeight;
		const bottomBound = offsetTop + offsetHeight * 0.95 - windowHeight;
		const rangeBound = bottomBound - topBound;

		return { topBound, rangeBound };
	}, [windowHeight, elementRef.current]);
	const wordList = data.split(' ');

	return (
		<Container ref={elementRef}>
			<div>
				<TextRevealWrapper>
					<p>
						{wordList.map((word, idx) => {
							const percent = (idx + 1) / wordList.length;
							const triggerPosition = percent * rangeBound + topBound;
							const opacity =
								triggerPosition > 0 && scrollY >= triggerPosition ? 1 : 0;

							return (
								<Fragment key={idx}>
									<span style={{ opacity }}>{word}</span>{' '}
								</Fragment>
							);
						})}
					</p>
					<p>
						{wordList.map((word, idx) => (
							<Fragment key={idx}>
								<span>{word}</span>{' '}
							</Fragment>
						))}
					</p>
				</TextRevealWrapper>
			</div>
		</Container>
	);
};

export default About;

const Container = styled.section`
	height: 300vh;
	position: relative;

	& > div {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const TextRevealWrapper = styled.div`
	width: 100%;
	position: relative;

	& > p {
		margin: 0 25px;
		font-family: var(--secondary-font);
		font-size: 35px;
		font-weight: 600;
		line-height: 50px;

		&:first-child {
			position: absolute;

			span {
				transition: opacity ease-out 0.3s;
			}
		}

		&:last-child {
			opacity: 0.1;
		}
	}

	@media (min-width: 576px) {
		max-width: 540px;
	}

	@media (min-width: 768px) {
		max-width: var(--max-width-tablet);

		& > p {
			font-size: 45px;
			line-height: 60px;
			text-align: center;
		}
	}

	@media (min-width: 992px) {
		max-width: var(--max-width-laptop);
	}

	@media (min-width: 1200px) {
		max-width: var(--max-width-desktop);
	}
`;
