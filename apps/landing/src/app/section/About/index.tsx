import type { FC } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useScroll from '@/utils/hook/useScroll';

interface Props {
	data: string;
}

const About: FC<Props> = ({ data }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const [effectBound, setEffectBound] = useState({
		topBound: 0,
		bottomBound: 0,
		rangeBound: 0,
	});
	const scrollY = useScroll();
	const wordList = data.split(' ');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const bound = () => {
				const { offsetTop = 0, offsetHeight = 0 } = elementRef.current || {};
				const { innerHeight = 0 } = window || {};
				const topBound = offsetTop - 0.1 * innerHeight;
				const bottomBound = offsetTop + offsetHeight * 0.9 - innerHeight;
				const rangeBound = bottomBound - topBound;

				return { topBound, bottomBound, rangeBound };
			};

			setEffectBound(bound);
		}
	}, [typeof window !== 'undefined' ? window.innerHeight : 0]);

	return (
		<Container ref={elementRef}>
			<div>
				<TextRevealWrapper>
					<p>
						{wordList.map((word, idx) => {
							const percent = (idx + 1) / wordList.length;
							const opacity =
								scrollY >=
								percent * effectBound.rangeBound + effectBound.topBound
									? 1
									: 0;

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
	height: 200vh;
	position: relative;

	& > div {
		position: sticky;
		top: 0;
		height: 50%;
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
		font-size: 45px;
		font-weight: 600;
		line-height: 60px;
		text-align: center;

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
		max-width: 720px;
	}

	@media (min-width: 992px) {
		max-width: 960px;
	}

	@media (min-width: 1200px) {
		max-width: 1140px;
	}
`;
