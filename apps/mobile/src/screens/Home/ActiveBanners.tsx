import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from 'react-native-reanimated';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { bannerMap } from './shared';

const AnimatedView = Animated.createAnimatedComponent(View);
const flexGap = 15;
const containerHeight = 150;

const ActiveBanners: FC = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [imageWidth, setImageWidth] = useState(0);
	const {
		remoteConfig: { activeBanners },
	} = useSnapshot(appState);
	const timeoutRef = useRef(setTimeout(() => {}, 5000));
	const containerRef = useRef<View>(null);

	const sharedActiveIndex = useSharedValue(0);
	const carouselWidth = useSharedValue(flexGap);

	const carouselStyle = useAnimatedStyle(() => {
		const offsetX = -sharedActiveIndex.value * carouselWidth.value;

		return {
			transform: [{ translateX: offsetX }],
		};
	}, [sharedActiveIndex]);

	const handleCarouselActiveIndex = () => {
		if (activeIndex === activeBanners.length - 1) {
			setActiveIndex(0);
		} else {
			setActiveIndex(activeIndex + 1);
		}
	};

	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		carouselWidth.value += nativeEvent.layout.width;
		setImageWidth(nativeEvent.layout.width);
	};

	useEffect(() => {
		timeoutRef.current = setTimeout(handleCarouselActiveIndex, 5000);

		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [activeIndex]);

	useEffect(() => {
		if (activeIndex === 0 && sharedActiveIndex.value !== 0) {
			const nextIndex = sharedActiveIndex.value + 1;
			sharedActiveIndex.value = withSequence(
				withTiming(nextIndex, { duration: 500 }),
				withTiming(0, { duration: 0 }),
			);
		} else {
			sharedActiveIndex.value = withTiming(activeIndex, { duration: 500 });
		}
	}, [activeIndex]);

	return (
		<View style={styles.container} onLayout={handleLayoutChange}>
			<View style={styles.viewport} ref={containerRef}>
				<AnimatedView style={[styles.carousel, carouselStyle]}>
					{activeBanners.concat(activeBanners).map((banner, idx) => {
						const imgSource = banner.imageUrl
							? { uri: banner.imageUrl }
							: bannerMap[banner.id];

						return (
							<TouchableOpacity
								key={idx}
								onPress={() => banner.url && Linking.openURL(banner.url)}
							>
								<Image
									style={[styles.banner, { width: imageWidth }]}
									source={imgSource}
								/>
							</TouchableOpacity>
						);
					})}
				</AnimatedView>
			</View>
		</View>
	);
};

export default ActiveBanners;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		borderRadius: 20,
		overflow: 'hidden',
		height: containerHeight,
	},
	viewport: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'red',
	},
	carousel: {
		flexDirection: 'row',
		gap: flexGap,
	},
	banner: {
		height: containerHeight,
		backgroundColor: 'red',
	},
});
