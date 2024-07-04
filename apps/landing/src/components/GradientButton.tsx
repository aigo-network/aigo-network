import type { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

// interface Props extends ButtonHTMLAttributes<HTMLButtonElement>

const GradientButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, title, ...props}) => {
	return (
		<Container {...props}>
			{title ? <span>{title}</span> : children}
		</Container>
	);
};

export default GradientButton;

const Container = styled.button`
	padding: 15px 25px;
	border: solid 1px;
	border-radius: 12px;
`;
