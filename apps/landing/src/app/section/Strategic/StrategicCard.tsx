import styled from 'styled-components';

const StrategicCard = () => {
	return (
		<Container>
			<CardImage />
			<CardDetail>
				<DetailWrapper>
					<img src="/img/tada-logo-img.png" />
					<span>Ho Chi Minh City, Vietnam🇻🇳</span>
				</DetailWrapper>
				<DetailWrapper>
					<p>
						Lorem ipsum dolor sit amet consectetur. Non sed pulvinar libero
						feugiat fusce convallis fringilla arcu ipsum. Posuere sociis nisi
						duis vivamus bibendum magna ornare libero. Cursus nec vitae cursus
						ut felis. Gravida volutpat imperdiet et sed fermentum viverra
						ullamcorper morbi mauris.
					</p>
					<a href="#">Partnership announcement</a>
				</DetailWrapper>
			</CardDetail>
		</Container>
	);
};

export default StrategicCard;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 25px;
	border-radius: 30px;
	background: #1e1e1e;
	gap: 25px;

	@media (min-width: 992px) {
		flex-direction: row-reverse;
		align-items: flex-start;
	}
`;

const CardImage = styled.div`
	max-width: 300px;
	width: 100%;
	aspect-ratio: 1;
	margin: 0 auto;
	border-radius: inherit;
	overflow: hidden;
	background: url(/img/tada-img.png) no-repeat center;
	background-size: cover;

	@media (min-width: 992px) {
		flex: 1;
	}
`;

const CardDetail = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;

	@media (min-width: 992px) {
		flex: 2;
	}
`;

const DetailWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	& > img {
		width: 200px;
		height: auto;
	}

	& > span {
		font-size: 20px;
	}

	& > p {
		font-size: 20px;
	}

	& > a {
		display: inline-flex;
		font-size: 20px;
		color: var(--primary-color);
		text-decoration: none;
		opacity: 0.3;
	}
`;
