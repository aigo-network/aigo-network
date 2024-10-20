import type { FC } from 'react';
import styled from 'styled-components';

import BasicButton from '@/components/BasicButton';
import { clashDisplay, poppins } from '@/utils/styles';

interface Props {
	title: string;
	tag: string;
	detail: {
		title: string;
		text: string;
	};
	image: string;
	button?: {
		link: string;
		title: string;
	};
	comingSoon?: boolean;
}

const EcosystemCard: FC<Props> = ({
	title,
	tag,
	detail,
	image,
	button,
	comingSoon = false,
}) => {
	const [prefixTitle, suffixTitle] = title.split(' ');
	const [firstDetailTitle, secondDetailTitle] = detail.title.split('/');
	const [firstDetailText, secondDetailText] = detail.text.split('/');

	return (
		<Container>
			<InnerContainer>
				<BackgroundContainer>
					<CardImage>
						<img src={image} />
					</CardImage>
					<CardContent>
						<Title>
							{prefixTitle}
							<span>{suffixTitle}</span>
						</Title>
						<DetailGroup>
							<TagContainer>
								<Tag>
									<span>{tag}</span>
									<div />
								</Tag>
								{comingSoon && <span>Coming soon</span>}
							</TagContainer>
							<DetailTitle>
								{firstDetailTitle}
								<br />
								{secondDetailTitle}
							</DetailTitle>
							<DetailText>
								{firstDetailText}
								<br /> {secondDetailText}
							</DetailText>
							{button && (
								<BasicButton
									style={{ alignSelf: 'flex-start' }}
									outline
									title={button.title}
									href={button.link}
									target="_blank"
								/>
							)}
						</DetailGroup>
					</CardContent>
				</BackgroundContainer>
			</InnerContainer>
		</Container>
	);
};

export default EcosystemCard;

const Container = styled.div`
	position: relative;
	z-index: 1;
	flex: 1;
	transition: transform ease-out 0.3s;

	&:before {
		content: '';
		position: absolute;
		top: -3px;
		right: 60%;
		opacity: 0;
		height: 200px;
		width: 200px;
		border-radius: 100px;
		z-index: -1;
		background: rgba(13, 114, 243, 0.8);
		transition:
			right ease-out 0.4s,
			opacity ease-out 0.4s;

		box-shadow: 0 -10px 20px 20px rgba(13, 114, 243, 0.1);
	}

	&:hover {
		transform: scale(1.01);
		&:before {
			right: 10%;
			opacity: 1;
		}
	}

	@media (min-width: 576px) {
		&:first-child {
			min-width: calc(var(--max-width-mobile-horizontal) - 50px);
		}
	}

	@media (min-width: 768px) {
		&:first-child {
			min-width: calc(var(--max-width-tablet) - 50px);
		}
	}

	@media (min-width: 992px) {
		&:first-child {
			min-width: calc(var(--max-width-laptop) - 50px);
		}
	}

	@media (min-width: 1200px) {
		&:first-child {
			min-width: calc(var(--max-width-desktop) - 50px);
		}
	}
`;

const InnerContainer = styled.div`
	width: 100%;
	height: 100%;
	border: solid 1px rgba(255, 255, 255, 0.1);
	border-radius: 20px;
	background: #181717;
`;

const BackgroundContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 25px 20px;
	background: url(/img/ecosystem-card-bg-img.png) no-repeat top left;
	background-size: cover;
	gap: 25px;

	${Container}:first-child & {
		flex-direction: column-reverse;
	}

	@media (min-width: 992px) {
		padding: 38px;
		gap: 40px;
		${Container}:first-child & {
			flex-direction: row-reverse;
			padding: 0 60px;
		}
	}
`;

const CardImage = styled.div`
	flex: 1;
	display: flex;
	align-items: flex-end;

	${Container}:first-child & {
		margin-top: -25px;
		transform: translateY(25px);
	}

	img {
		width: 100%;
		object-fit: contain;
	}

	@media (min-width: 992px) {
		${Container}:first-child & {
			transform: none;
		}
	}
`;

const CardContent = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	gap: 35px;

	@media (min-width: 992px) {
		gap: 60px;
		${Container} & {
			padding: 50px 0;
			justify-content: space-evenly;
		}
	}
`;

const Title = styled.p`
	font-family: ${poppins.style.fontFamily};
	font-size: 28px;
	font-weight: 600;

	span {
		font-family: ${clashDisplay.style.fontFamily};
		font-weight: 200;
		color: rgba(253, 253, 253, 0.8);
	}

	@media (min-width: 992px) {
		font-size: 38px;
	}
`;

const DetailGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const TagContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;

	& > span {
		font-size: 14px;
		font-weight: 500;
		color: rgba(223, 223, 223, 0.2);
		font-style: italic;
	}
`;

const Tag = styled.div`
	display: flex;
	align-self: flex-start;
	gap: 16px;
	padding: 8px 16px;
	border: solid 1px rgba(52, 195, 244, 0.8);
	border-radius: 40px;

	span {
		color: var(--secondary-color);
		font-size: 12px;
		font-weight: 400;
	}

	div {
		width: 6px;
		aspect-ratio: 1;
		border-radius: 6px;
		background: var(--secondary-color);
		align-self: center;
	}

	@media (min-width: 992px) {
		span {
			font-size: 16px;
		}
	}
`;

const DetailTitle = styled.span`
	font-family: var(--secondary-font);
	font-size: 24px;
	font-weight: 500;

	@media (min-width: 992px) {
		font-size: 30px;
	}
`;

const DetailText = styled.p`
	font-size: 14px;
	line-height: 18px;
	color: #b8b8b8;
	max-width: 500px;

	@media (min-width: 992px) {
		font-size: 18px;
		line-height: 24px;
	}
`;
