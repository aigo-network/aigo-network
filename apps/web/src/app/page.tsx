'use client';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);
export default function Home() {
	const [, setRender] = useState({});

	const offset = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: withTiming(offset.value) }],
		};
	}, [offset]);

	useEffect(() => {
		const interval = setInterval(() => {
			offset.value = offset.value === 0 ? 200 : 0;
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
	}, []);

	return (
		<AnimatedView style={[{ alignItems: 'center' }, animatedStyle]}>
			<Text style={{ fontSize: 50, fontWeight: '900', color: '#fff' }}>
				Hello World
			</Text>
		</AnimatedView>
	);
}
