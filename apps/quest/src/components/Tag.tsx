import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
	disabled?: boolean;
	onPress?: () => void;
	onHover?: (isHovered: boolean) => void;
}

const Container = styled.div<{ $disabled?: boolean }>`
	display: flex;
	outline: 1px solid rgba(255, 255, 255, 0.1);
	transition: ease-out 0.3s;
	transition-property: outline, background-color, box-shadow, cursor;
	border-radius: 12px;

	${({ $disabled = false }) =>
		!$disabled &&
		`
		&:hover {
			cursor: pointer;
			background-color: rgba(129, 221, 251, 0.05);
			outline: 2px solid rgba(129, 221, 251, 0.15);
			box-shadow: inset 0 0 15px 2px rgba(129, 221, 251, 0.5);
		}

		&:active {
			opacity: 0.5;
		}
	`}
`;

const Tag: FC<Props> = ({ children, disabled, onPress, onHover }) => {
	return (
		<Container
			$disabled={disabled}
			onClick={onPress}
			onMouseEnter={() => onHover?.(true)}
			onMouseOut={() => onHover?.(false)}
		>
			{children}
		</Container>
	);
};

export default Tag;
