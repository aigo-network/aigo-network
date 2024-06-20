import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, View } from 'react-native';

interface Props {
	style?: StyleProp<ViewStyle>;
	isLoading?: boolean;
	children?: ReactNode;
	LoadingIndicator?: FC;
	indicatorSize?: number;
	indicatorColor?: string;
}

export const LoadingContainer: FC<Props> = ({
	style,
	isLoading,
	children,
	LoadingIndicator = ActivityIndicator,
	indicatorSize = 20,
	indicatorColor = '#AAAAAA',
}) => {
	return (
		<View style={style}>
			{isLoading ? (
				<LoadingIndicator size={indicatorSize} color={indicatorColor} />
			) : (
				children
			)}
		</View>
	);
};

export default LoadingContainer;
