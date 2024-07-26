import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CountDown from './CountDown';

import Header from '@/components/Header';
import { clashDisplay } from '@/utils/style';

interface Props {
	isMobile?: boolean;
}

const Banner: FC<Props> = ({ isMobile }) => {
	return (
		<View style={styles.container}>
			<View style={styles.bannerTitleContainer}>
				<Text style={[styles.title, isMobile && styles.mobileTitle]}>
					AiGO Quest Season 1
				</Text>
				<CountDown
					style={styles.countDown}
					date={new Date('2024-07-29T00:00:00.000Z')}
				/>
			</View>

			<Header isMobile={isMobile} style={styles.headerContainer} />
		</View>
	);
};

export default Banner;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		gap: 20,
	},
	headerContainer: {
		zIndex: 99,
		position: 'absolute',
		paddingVertical: 24,
		top: 0,
		left: 0,
		right: 0,
	},
	bannerTitleContainer: {
		marginTop: 130,
		zIndex: 0,
		gap: 14,
		alignSelf: 'center',
	},
	title: {
		paddingHorizontal: 24,
		textAlign: 'center',
		fontSize: 56,
		fontWeight: '600',
		lineHeight: 64,
		fontFamily: clashDisplay.style.fontFamily,
	},
	mobileTitle: {
		fontSize: 32,
		lineHeight: 38,
	},
	countDown: {
		marginBottom: 75,
		fontSize: 20,
		lineHeight: 28,
	},
});
