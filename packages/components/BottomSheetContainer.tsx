import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	SlideInDown,
	SlideOutDown,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

export type Props = {
	style?: StyleProp<ViewStyle>;
	onClose?: () => void;
	closeOffset?: number;
	children?: ReactNode;
};

export const BottomSheetContainer: FC<Props> = ({
	style,
	onClose,
	closeOffset = 200,
	children,
}) => {
	const yOffset = useSharedValue<number>(0);

	const pan = Gesture.Pan()
		.onChange((event) => {
			if (yOffset.value + event.changeY > 0) yOffset.value += event.changeY;
		})
		.onFinalize(() => {
			if (yOffset.value > closeOffset && onClose) runOnJS(onClose)();
			else {
				yOffset.value = withTiming(0);
			}
		});

	const animatedStyles = useAnimatedStyle(() => {
		return { transform: [{ translateY: yOffset.value }] };
	});

	return (
		<GestureDetector gesture={pan}>
			<Animated.View
				style={[style, styles.container, animatedStyles]}
				entering={SlideInDown}
				exiting={SlideOutDown}
			>
				{children}
			</Animated.View>
		</GestureDetector>
	);
};

export default BottomSheetContainer;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});
