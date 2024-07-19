import type { RefObject } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

interface Props {
	innerRef: RefObject<HTMLDivElement>;
}

const NewsCard: FC<Props> = ({ innerRef }) => {
	return (
		<Container ref={innerRef}>
			<CardImage src="/img/news/cover.png" />
			<CardBottom>
				<CardTitle>
					<span>Jun 28, 2024</span>
					Everything you need to know about GO Point
				</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur. Commodo felis aliquam non
					tellus turpis. Est at neque adipiscing vitae integer id. In ut
					pharetra
				</CardDescription>
			</CardBottom>
		</Container>
	);
};

export default NewsCard;

const Container = styled.div`
	min-height: 100%;
	min-width: 100%;
	scroll-snap-align: center;
	transition: ease-out 0.3s;
	padding: 24px;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transition: ease-out 0.3s;
		z-index: -1;
		background: #1e1e1e;
		border-radius: 40px;
		opacity: 0;
	}

	&:hover {
		&:before {
			transform: scale(1.05);
			opacity: 1;
		}
	}

	@media (min-width: 768px) {
		min-width: 50%;
	}

	@media (min-width: 992px) {
		min-width: 33.33%;
	}
`;

const CardImage = styled.img`
	max-width: 100%;
`;

const CardBottom = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 24px;
`;

const CardTitle = styled.p`
	span {
		font-size: 16px;
		font-weight: 300;
		line-height: 20px;
		display: block;
	}

	font-family: var(--secondary-font);
	font-size: 20px;
	font-weight: 500;
	line-height: 28px;
`;

const CardDescription = styled.p`
	font-family: var(--secondary-font);
	font-size: 16px;
	line-height: 24px;
`;
