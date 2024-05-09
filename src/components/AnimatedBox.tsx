import { FC, useEffect } from 'react';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  size: number;
}

export const AnimatedBox: FC<Props> = ({ size }) => {
  const radius = useSharedValue(100);
  const rotation = useSharedValue(0);
  const containerStyle = useAnimatedStyle(() => {
	return {
	  width: size,
	  height: size,
	  borderRadius: radius.value,
	  backgroundColor: 'red',
	  transform: [{ rotate: `${rotation.value}deg` }],
	  marginTop: 32,
	}
  });

  useEffect(() => {
	radius.value = withTiming(8, { duration: 1000 })
	rotation.value = withSpring(Math.random() * 360, { damping: 10 });
  }, []);

  return (
	<Animated.View style={containerStyle} />
  );
};

export default AnimatedBox;
