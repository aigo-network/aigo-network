import type { FC, LegacyRef, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	title: string;
	subTitle: string;
	children: ReactNode;
	fullWidth?: boolean;
	innerRef?: LegacyRef<HTMLElement>;
}

const SectionLayout: FC<Props> = ({
	title,
	subTitle,
	children,
	fullWidth = false,
	innerRef,
}) => {
	return (
		<Container $fullWidth={fullWidth} ref={innerRef}>
			<SubTitle>{subTitle}</SubTitle>
			<Title>{title}</Title>
			<div>{children}</div>
		</Container>
	);
};

export default SectionLayout;

const Container = styled.section<{ $fullWidth: boolean }>`
	padding: 200px 0;

	& > div {
		margin: 0 auto;
		padding: 15px ${({ $fullWidth }) => ($fullWidth ? `0px` : `25px`)};
	}

	${({ $fullWidth }) => {
		return $fullWidth
			? ''
			: `@media (min-width: 576px) {
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
				}`;
	}}
`;

const SubTitle = styled.h4`
	font-family: var(--secondary-font);
	font-weight: 400;
	font-size: 18px;
	text-align: center;
	color: var(--secondary-color);
	margin-bottom: 20px;
`;

const Title = styled.h2`
	font-family: var(--secondary-font);
	font-weight: 600;
	font-size: 35px;
	text-align: center;
	margin-bottom: 15px;
	padding: 0 15px;

	@media (min-width: 992px) {
		font-size: 45px;
		margin-bottom: 50px;
	}
`;
