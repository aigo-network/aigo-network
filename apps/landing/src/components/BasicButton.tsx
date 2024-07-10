import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	prefix?: ReactNode;
	suffix?: ReactNode;
	outline?: boolean;
};

const BasicButton: FC<Props> = ({
	prefix,
	suffix,
	title,
	outline = false,
	...props
}) => {
	return (
		<Container $isOutline={outline} {...props}>
			{prefix}
			<Title>{title}</Title>
			{suffix}
		</Container>
	);
};

export default BasicButton;

const Container = styled.button<{ $isOutline: boolean }>`
	padding: 15px 25px;
	border-radius: 12px;

	${({ $isOutline }) =>
		$isOutline
			? `
		background: #181717;
		border: solid 1px #bababa;
		`
			: `
		background: #2d3136;
		border: none;
		box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.05) inset;
	`}
`;

const Title = styled.span`
	font-size: 18px;
	font-weight: 500;
	line-height: 20px;
	color: #fdfdfd;
`;
