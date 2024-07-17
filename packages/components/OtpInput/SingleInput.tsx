import type { FC } from 'react';
import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	activeIndex: number;
	index: number;
	value?: string;
	style?: ViewStyle;
	isError?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const SingleInput: FC<Props> = ({
	activeIndex,
	index,
	value = '',
	style,
	isError = false,
}) => {
	const active = activeIndex === index;
	const insertedValue = !!value;
	const cursorOpacity = useSharedValue(0);
	const cursorAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: cursorOpacity.value,
		};
	}, [cursorOpacity]);

	useEffect(() => {
		if (active) {
			cursorOpacity.value = withRepeat(
				withSequence(
					withDelay(0, withTiming(1, { duration: 0 })),
					withDelay(500, withTiming(0, { duration: 0 })),
					withDelay(500, withTiming(1, { duration: 0 })),
				),
				-1,
				true,
			);
		} else {
			cursorOpacity.value = 0;
		}
	}, [active]);

	return (
		<View
			style={[
				styles.container,
				style,
				insertedValue && styles.highlightContainer,
				isError && styles.errorContainer,
			]}
		>
			{active && !insertedValue ? (
				<AnimatedView style={[styles.cursor, cursorAnimatedStyle]} />
			) : (
				<Text style={styles.text}>{value}</Text>
			)}
		</View>
	);
};

export default SingleInput;

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, .3)',
		flex: 1,
		height: 60,
		justifyContent: 'center',
	},
	highlightContainer: {
		borderColor: '#fff',
	},
	errorContainer: {
		borderColor: '#ff2400',
	},
	cursor: {
		alignSelf: 'center',
		marginVertical: 10,
		borderLeftColor: '#fff',
		borderLeftWidth: 1,
		flex: 1,
	},
	text: {
		alignSelf: 'center',
		fontSize: 20,
		fontWeight: '500',
	},
});
