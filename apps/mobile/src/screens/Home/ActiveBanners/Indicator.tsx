import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Props {
	activeIndex: number;
	index: number;
	carouselLength: number;
}

const indicatorWidth = 8;

const Indicator: FC<Props> = ({ activeIndex, index, carouselLength }) => {
	const sharedActiveIndex = useSharedValue(activeIndex);
	const isFirstIndicator = index === 0;
	const isLastIndicator = index === carouselLength - 1;

	const indicatorStyle = useAnimatedStyle(() => {
		const leftLimit = isFirstIndicator ? carouselLength - 1 : index - 1;
		const rightLimit = isLastIndicator ? 0 : index + 1;
		const width = interpolate(
			sharedActiveIndex.value,
			[leftLimit, index, rightLimit],
			[indicatorWidth, 30, indicatorWidth],
			Extrapolation.CLAMP,
		);
		const backgroundColor = interpolateColor(
			sharedActiveIndex.value,
			[leftLimit, index, rightLimit],
			['rgba(255, 255, 255, 0.5)', '#fdfdfd', 'rgba(255, 255, 255, 0.5)'],
		);

		return { width, backgroundColor };
	}, [activeIndex]);

	useEffect(() => {
		sharedActiveIndex.value = withTiming(activeIndex, { duration: 500 });
	}, [activeIndex]);

	return <AnimatedView style={[styles.indicator, indicatorStyle]} />;
};

export default Indicator;

const styles = StyleSheet.create({
	indicator: {
		height: 4,
		borderRadius: 10,
		backgroundColor: 'red',
	},
});
