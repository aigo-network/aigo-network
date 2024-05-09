import { FC, useEffect } from 'react';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';

interface Props {
  size: number;
}

export const AnimatedBox: FC<Props> = ({ size }) => {
  const radius = useSharedValue(18);
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
	radius.value = withSpring(size / 2, { damping: 20 })
	rotation.value = withSpring(Math.random() * 360 - 180, { damping: 15 });
  }, []);

  return (
	<Animated.View style={containerStyle} />
  );
};

export default AnimatedBox;
