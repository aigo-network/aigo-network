import { type FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

type Props = {
	length: number;
	current: number;
};

export const ProgressBar: FC<Props> = ({ current, length }) => {
	const arr = new Array(length).fill(0);
	const focusWidth = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: withTiming(focusWidth.value, { duration: 600 }),
		};
	});

	useEffect(() => {
		focusWidth.value = 60;
	}, [current]);

	return (
		<View style={styles.container}>
			{arr.map((_, index) => {
				return (
					<Animated.View
						style={
							current === index
								? [styles.focus, animatedStyle]
								: styles.collapse
						}
						key={index}
					/>
				);
			})}
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
	focus: {
		width: 12,
		height: 10,
		borderRadius: 32,
		backgroundColor: '#fff',
	},
	collapse: {
		width: 12,
		height: 8,
		borderRadius: 32,
		backgroundColor: '#FFFFFF4D',
	},
});
