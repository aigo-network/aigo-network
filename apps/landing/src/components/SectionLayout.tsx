import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	title: string;
	children: ReactNode;
}

const SectionLayout: FC<Props> = ({ title, children }) => {
	return (
		<Container>
			<Title>{title}</Title>
			<div>{children}</div>
		</Container>
	);
};

export default SectionLayout;

const Container = styled.section`
	padding: 40px 0;

	& > div {
		margin: 0 auto;
		padding: 15px 25px;
	}

	@media (min-width: 576px) {
		& > div {
			max-width: 540px;
		}
	}
	@media (min-width: 768px) {
		& > div {
			max-width: 720px;
		}
	}
	@media (min-width: 992px) {
		& > div {
			max-width: 960px;
		}
	}
	@media (min-width: 1200px) {
		& > div {
			max-width: 1140px;
		}
	}
`;

const Title = styled.h2`
	font-family: var(--secondary-font);
	font-weight: 600;
	font-size: 35px;
	text-align: center;
	margin-bottom: 20px;

	@media (min-width: 992px) {
		font-size: 45px;
		margin-bottom: 40px;
	}
`;
