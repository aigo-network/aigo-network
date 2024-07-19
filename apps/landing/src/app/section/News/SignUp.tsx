import type { FC } from 'react';
import styled from 'styled-components';

import BasicButton from '@/components/BasicButton';

export const SignUp: FC = () => {
	return (
		<Container>
			<SignUpText>Don&apos;t miss out from us!</SignUpText>
			<RightContainer>
				<InputGroup>
					<Input placeholder="Enter your email" />
					<InputButton options={2} title="Sign up" />
				</InputGroup>
			</RightContainer>
		</Container>
	);
};

export default SignUp;

const Container = styled.div`
	background: #1e1e1e;
	border-radius: 30px;

	@media (min-width: 992px) {
		padding: 15px 25px;
		display: flex;
		gap: 50px;
	}
`;

const SignUpText = styled.span`
	font-family: var(--secondary-font);
	color: var(--primary-color);
	font-size: 16px;

	@media (min-width: 992px) {
		flex: 1;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
		line-height: 60px;
	}
`;

const RightContainer = styled.div`
	@media (min-width: 992px) {
		flex: 2;
		display: flex;
	}
`;

const InputGroup = styled.div`
	@media (min-width: 992px) {
		border: solid 1px rgba(253, 253, 253, 0.3);
		border-radius: 10px;
		width: 500px;
		display: flex;
	}
`;

const Input = styled.input`
	height: 100%;
	background: transparent;
	outline: none;
	border: none;
	font-size: 18px;
	color: var(--primary-color);
	padding: 20px;
	flex: 1;
`;

const InputButton = styled(BasicButton)`
	border: none;
	border-left: solid 1px rgba(253, 253, 253, 0.3);
	border-radius: 10px;
	padding-left: 30px;
	padding-right: 30px;
	transition-duration: 0.1s;

	&:hover {
		cursor: pointer;
	}

	&:active {
		opacity: 0.3;
	}
`;
