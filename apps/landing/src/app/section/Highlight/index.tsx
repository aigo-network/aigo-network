import styled from 'styled-components';

export const Highlight = () => {
	return (
		<Container>
			<TitleLink
				href="https://quest.aigo.network"
				target="_blank"
				rel="noreferrer"
			>
				🎁 <strong>Quest Season 2 is Live</strong> — Join now and accelerate
				your GO Points! 🎁
			</TitleLink>
		</Container>
	);
};

export default Highlight;

const Container = styled.div`
	background-color: #34c3f4;
	padding: 8px 20px;

	@media (min-width: 576px) {
		padding: 10px 20px;
	}
`;

const TitleLink = styled.a`
	font-size: 14px;
	line-height: 18px;
	text-align: center;
	text-decoration: none;
	color: #000000;
	display: block;

	@media (min-width: 576px) {
		font-size: 16px;
		line-height: 22px;
	}
`;
