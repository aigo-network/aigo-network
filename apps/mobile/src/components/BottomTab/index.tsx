import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { defaultTheme } from 'utils/global';

import BottomItem from './Item';

const bottomHeight = 72;
const svgWidth = 520;

const AnimatedView = Animated.createAnimatedComponent(View);

const BottomTab: FC<BottomTabBarProps> = (props) => {
	const [containerWidth, setContainerWidth] = useState(0);
	const { state } = props;

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setContainerWidth(nativeEvent.layout.width);
	};

	const offsetY = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => {
		return {
			bottom: offsetY.value,
		};
	}, [offsetY]);

	useEffect(() => {
		const { index, routeNames } = state;
		if (routeNames[index] === 'Map') {
			offsetY.value = withTiming(-300, { duration: 700 });
		} else {
			offsetY.value = withTiming(0, { duration: 700 });
		}
	}, [state.index]);

	return (
		<AnimatedView style={[styles.container, animatedStyle]} onLayout={onLayout}>
			<View
				style={[
					styles.svgBackground,
					{
						transform: [{ translateX: -(svgWidth - containerWidth) / 2 }],
					},
				]}
			>
				<Svg
					width={svgWidth}
					height={bottomHeight}
					viewBox={`0 0 ${svgWidth} ${bottomHeight}`}
					fill="none"
					style={styles.svg}
				>
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M260 36C277.155 36 291.507 24.0008 295.122 7.93758C296.092 3.6271 299.582 0 304 0H512C516.418 0 520 3.58172 520 8V64C520 68.4183 516.418 72 512 72H8C3.58172 72 0 68.4183 0 64V8C0 3.58172 3.58172 0 8 0H216C220.418 0 223.908 3.6271 224.878 7.93758C228.493 24.0008 242.845 36 260 36Z"
						fill={defaultTheme.bgLight}
						strokeWidth={1}
						stroke={defaultTheme.gray20}
					/>
				</Svg>
			</View>
			<View style={styles.itemGroup}>
				{state.routes.map((route) => {
					const { key, name } = route;
					const { index, routeNames } = state;
					const isActive = routeNames[index] === name;

					return (
						<View key={key} style={styles.item}>
							<BottomItem name={name} isActive={isActive} />
						</View>
					);
				})}
			</View>
		</AnimatedView>
	);
};

export default BottomTab;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: bottomHeight,
		backgroundColor: 'transparent',
	},
	svgBackground: {
		position: 'absolute',
		width: svgWidth,
		opacity: 1,
	},
	svg: {
		shadowColor: defaultTheme.textDark90,
		shadowRadius: 4,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 1,
			width: 0,
		},
	},
	itemGroup: {
		flexDirection: 'row',
		height: bottomHeight,
		paddingHorizontal: 16,
	},
	item: {
		flex: 1,
	},
});
