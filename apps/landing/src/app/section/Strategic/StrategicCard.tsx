import type { FC } from 'react';
import styled from 'styled-components';

// import BasicButton from '@/components/BasicButton';

interface Props {
	image: {
		desktopUrl: string;
		mobileUrl: string;
	};
	logoUrl: string;
	location: string;
	description: string;
	linkBtn?: string;
}

const StrategicCard: FC<Props> = ({
	image,
	logoUrl,
	location,
	description,
	// linkBtn = '#',
}) => {
	return (
		<Container>
			<CardImage $desktopUrl={image.desktopUrl} $mobileUrl={image.mobileUrl} />
			<CardDetail>
				<DetailWrapper>
					<img src={logoUrl} />
					<span>{location}</span>
				</DetailWrapper>
				<DetailWrapper>
					<p>{description}</p>
					{/* <BasicButton
						style={{ alignSelf: 'flex-start' }}
						title="Explore more"
						options={2}
						href={linkBtn}
						target="_blank"
					/> */}
					<ComingSoonText>Coming soon</ComingSoonText>
				</DetailWrapper>
			</CardDetail>
		</Container>
	);
};

export default StrategicCard;

const Container = styled.div`
	border-radius: 40px;
	background: #1e1e1e;
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding: 30px 20px;
	padding-bottom: 50px;
	min-width: 100%;
	min-height: 100%;
	scroll-snap-align: center;

	@media (min-width: 992px) {
		flex-direction: row-reverse;
		align-items: stretch;
		gap: 50px;
		padding: 45px;
	}
`;

const CardImage = styled.div<{ $desktopUrl: string; $mobileUrl: string }>`
	width: 100%;
	aspect-ratio: 1;
	margin: 0 auto;
	border-radius: 25px;
	overflow: hidden;
	background: url(${({ $mobileUrl }) => $mobileUrl}) no-repeat center;
	background-size: contain;

	@media (min-width: 992px) {
		flex: 1;
		border-radius: 30px;
		background-image: url(${({ $desktopUrl }) => $desktopUrl});
	}
`;

const CardDetail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 32px;

	@media (min-width: 992px) {
		flex: 1;
	}
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;

	& > img {
		max-height: 50px;
		width: auto;
		align-self: flex-start;
		object-fit: contain;
	}

	& > span {
		font-size: 16px;
	}

	& > p {
		font-size: 16px;
		line-height: 24px;
		max-width: 550px;
		color: #b8b8b8;
	}

	@media (min-width: 992px) {
		& > img {
			max-height: 70px;
			width: auto;
		}

		& > p {
			margin-bottom: 12px;
			max-width: 450px;
			font-size: 18px;
			line-height: 26px;
		}
	}
`;

const ComingSoonText = styled.span`
	color: rgba(253, 253, 253, 0.3);
	font-size: 16px;
	font-weight: 400;
`;
