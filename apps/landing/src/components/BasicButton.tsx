import type { AnchorHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

import LeftArrow from './icon/LeftArrow';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	outline?: boolean;
	options?: 1 | 2;
};

const BasicButton: FC<Props> = ({
	title,
	outline = false,
	options = 1,
	...props
}) => {
	return (
		<Container $isOutline={outline} $options={options} {...props}>
			<Title $options={options}>{title}</Title>
			{options === 1 && (
				<RightArrow>
					<LeftArrow size={18} color="#34c3f4" />
				</RightArrow>
			)}
		</Container>
	);
};

export default BasicButton;

const Container = styled.a<{ $isOutline: boolean; $options: 1 | 2 }>`
	border-radius: 42px;
	display: flex;
	gap: 16px;
	align-items: center;
	transition: ease-out 0.3s;
	text-decoration: none;

	&:hover {
		cursor: pointer;
	}

	${({ $options }) =>
		$options === 1
			? `
			background: #202122;
			border: solid 1px #252d36;
			box-shadow: 0 1px 1px rgba(255, 255, 255, 0.05) inset, 0 4px 20px 2px rgba(0, 0, 0, 0.25);
			padding: 12px 8px;
			
			&:hover {
				padding: 12px 24px;
			}
			`
			: `
			background: #202122;
			border: solid 1px #252d36;
			box-shadow: 0 1px 1px rgba(255, 255, 255, 0.05) inset, 0 4px 20px 2px rgba(0, 0, 0, 0.25);
			padding: 12px 24px;
	`}
`;

const Title = styled.span<{ $options: 1 | 2 }>`
	font-size: 16px;
	font-weight: 500;
	line-height: 24px;
	transition: ease-out 0.3s;

	${({ $options }) =>
		$options === 1
			? `
		color: #34c3f4;
		position: relative;
		left: 16px;
		${Container}:hover & {
				left: 0;
			}
		`
			: `
		color: #fdfdfd;
			
		`}
`;

const RightArrow = styled.div`
	transform: rotate(180deg);
	position: relative;
	left: -10px;
	opacity: 0;
	transition: ease-out 0.3s;

	${Container}:hover & {
		left: 0;
		opacity: 1;
	}
`;
