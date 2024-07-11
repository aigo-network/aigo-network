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

	&:hover {
		cursor: pointer;
	}

	${({ $isOutline }) =>
		$isOutline
			? `
		background: #181717;
		border: solid 1px #bababa;
		`
			: `
		background: #141414;
		border: solid 1px #252d36;
		box-shadow: 0 4px 20px 2px rgba(0, 0, 0, 0.25);
	`}
`;

const Title = styled.span`
	font-size: 16px;
	line-height: 24px;
	color: #fdfdfd;

	@media (min-width: 992px) {
		font-size: 18px;
	}
`;
