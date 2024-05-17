import { type FC, useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	activeIndex: number;
	numberOfItems: number;
	style?: ViewStyle;
}

export const Indicator: FC<Props> = ({ activeIndex, numberOfItems, style }) => {
	const focusWidth = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: withTiming(focusWidth.value, { duration: 800 }),
		};
	});

	useEffect(() => {
		focusWidth.value = 46;
	}, []);

	return (
		<View style={[styles.container, style]}>
			{Array(numberOfItems)
				.fill(0)
				.map((_, idx) => {
					const isActive = idx + 1 === activeIndex;
					return (
						<Animated.View
							key={idx}
							style={
								isActive
									? [styles.activeIndicator, animatedStyle]
									: styles.inactiveIndicator
							}
						/>
					);
				})}
		</View>
	);
};

export default Indicator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	inactiveIndicator: {
		width: 12,
		height: 6,
		backgroundColor: '#969aff',
		borderRadius: 32,
	},
	activeIndicator: {
		height: 8,
		backgroundColor: '#fff',
		borderRadius: 32,
	},
});
