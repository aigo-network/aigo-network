import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { ActivityIndicator } from 'react-native';

interface Props {
	isLoading?: boolean;
	children?: ReactNode;
	LoadingIndicator?: FC;
	indicatorSize?: number;
	indicatorColor?: string;
}

export const LoadingContainer: FC<Props> = ({
	isLoading,
	children,
	LoadingIndicator = ActivityIndicator,
	indicatorSize = 20,
	indicatorColor = '#AAAAAA',
}) => {
	return (
		<Fragment>
			{isLoading ? (
				<LoadingIndicator size={indicatorSize} color={indicatorColor} />
			) : (
				children
			)}
		</Fragment>
	);
};

export default LoadingContainer;
