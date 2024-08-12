import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';

import HotItem, { itemWidth } from './HotItem';

const itemGap = 16;
const carouselWidth = itemWidth + itemGap;

const HotRewards: FC = () => {
	const scrollRef = useRef<ScrollView>(null);
	const [currentIndex, setCurrentIndex] = useState(2);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const onScrollEnd = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newIndex = Math.floor(nativeEvent.contentOffset.x / carouselWidth);
		if (newIndex > 4) {
			scrollRef.current?.scrollTo({
				x: 2 * carouselWidth,
				y: nativeEvent.contentOffset.y,
				animated: false,
			});

			setCurrentIndex(2);
		} else if (newIndex < 2) {
			scrollRef.current?.scrollTo({
				x: 4 * carouselWidth,
				y: nativeEvent.contentOffset.y,
				animated: false,
			});

			setCurrentIndex(4);
		} else {
			setCurrentIndex(newIndex);
		}
	};

	const autoScroll = (currentIndex: number) =>
		setTimeout(() => {
			let newIndex: number;

			if (currentIndex > 4) {
				scrollRef.current?.scrollTo({
					x: 2 * carouselWidth,
					y: 0,
					animated: false,
				});
				newIndex = 2 + 1;
			} else {
				newIndex = currentIndex + 1;
			}

			scrollRef.current?.scrollTo({
				x: newIndex * carouselWidth,
				y: 0,
				animated: true,
			});
			setCurrentIndex(newIndex);
		}, 5000);

	useEffect(() => {
		scrollRef.current?.scrollTo({
			x: currentIndex * carouselWidth,
			y: 0,
			animated: false,
		});
	}, []);

	useEffect(() => {
		clearTimeout(timeoutId);
		const timeout = autoScroll(currentIndex);

		setTimeoutId(timeout);

		return () => {
			clearTimeout(timeout);
		};
	}, [currentIndex]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hot rewards</Text>
			<ScrollView
				ref={scrollRef}
				horizontal
				snapToInterval={carouselWidth}
				decelerationRate="normal"
				contentContainerStyle={styles.scroll}
				onMomentumScrollEnd={onScrollEnd}
				onScrollBeginDrag={() => {
					clearTimeout(timeoutId);
				}}
				disableIntervalMomentum
			>
				<HotItem index={2} />
				<HotItem index={3} />
				<HotItem index={1} />
				<HotItem index={2} />
				<HotItem index={3} />
				<HotItem index={1} />
				<HotItem index={2} />
			</ScrollView>
		</View>
	);
};

export default HotRewards;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		marginTop: 24,
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
		paddingLeft: 16,
	},
	scroll: {
		gap: itemGap,
		paddingLeft: 16,
	},
});
