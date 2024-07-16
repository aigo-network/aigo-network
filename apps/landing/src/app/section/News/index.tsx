import type { FC } from 'react';
import styled from 'styled-components';

import NewsGroup from './NewsGroup';
import SignUp from './SignUp';

import SectionLayout from '@/components/SectionLayout';

export const News: FC = () => {
	return (
		<SectionLayout title="News, insights and more" subTitle="News">
			<Container>
				<NewsGroup />
				<SignUp />
			</Container>
		</SectionLayout>
	);
};

export default News;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 40px;
`;
