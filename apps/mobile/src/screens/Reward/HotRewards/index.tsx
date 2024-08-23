import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';
import { useRewardClassification } from 'utils/hooks/reward';

import HotItem, { itemWidth } from './HotItem';

const itemGap = 16;
const carouselWidth = itemWidth + itemGap;

const HotRewards: FC = () => {
	const scrollRef = useRef<ScrollView>(null);
	const { activeRewards } = useRewardClassification();
	const [currentIndex, setCurrentIndex] = useState(2);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

	const carouselList = [
		activeRewards?.[activeRewards?.length - 2],
		activeRewards?.[activeRewards?.length - 1],
		...(activeRewards as never),
		activeRewards?.[0],
		activeRewards?.[1],
	];

	const onScrollEnd = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const newIndex = Math.floor(nativeEvent.contentOffset.x / carouselWidth);
		if (newIndex > carouselList.length + 1) {
			scrollRef.current?.scrollTo({
				x: 2 * carouselWidth,
				y: nativeEvent.contentOffset.y,
				animated: false,
			});

			setCurrentIndex(2);
		} else if (newIndex < 2) {
			scrollRef.current?.scrollTo({
				x: (carouselList.length + 1) * carouselWidth,
				y: nativeEvent.contentOffset.y,
				animated: false,
			});

			setCurrentIndex(carouselList.length + 1);
		} else {
			setCurrentIndex(newIndex);
		}
	};

	const autoScroll = (currentIndex: number) =>
		setTimeout(() => {
			let newIndex: number;

			if (currentIndex > carouselList.length + 1) {
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
		console.log(JSON.stringify(carouselList, null, 2));
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
				{carouselList?.map((reward, index) => (
					<HotItem key={index} rewardInfo={reward as never} />
				))}
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
