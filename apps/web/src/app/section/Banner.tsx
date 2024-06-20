import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import Image from 'next/image';

import leftGrid from '../left-grid.svg';
import rightGrid from '../right-grid.svg';

import BlurBackground from '@/components/BlurBackground';
import Header from '@/components/Header';

interface Props {
	isMobile?: boolean;
}

const Banner: FC<Props> = ({ isMobile }) => {
	return (
		<View style={styles.container}>
			<Svg style={styles.bannerBackground} width="100%" height="344">
				<Defs>
					<LinearGradient id="background-banner" x1={0} y1={0} x2={1} y2={0}>
						<Stop offset={0} stopColor="#625bf6" stopOpacity={1} />
						<Stop offset={1} stopColor="#81ddfb" stopOpacity={1} />
					</LinearGradient>
				</Defs>
				<Rect width="100%" height="100%" fill="url(#background-banner)" />
			</Svg>
			<Image src={leftGrid} alt="left grid image" style={styles.leftGrid} />
			<Image src={rightGrid} alt="right grid image" style={styles.rightGrid} />
			<View style={styles.bannerTitleContainer}>
				<BlurBackground style={styles.subTitle}>
					<Text style={styles.subTitleText}>
						DECENTRALIZED MOBILITY DATA NETWORK
					</Text>
				</BlurBackground>
				<Text style={[styles.title, isMobile && styles.mobileTitle]}>
					Transform Your Mobility{'\n'}To Incentives
				</Text>
			</View>

			<Header style={[styles.headerContainer, styles.mobileHeaderContainer]} />
		</View>
	);
};

export default Banner;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		gap: 20,
	},
	bannerBackground: {
		position: 'absolute',
	},
	leftGrid: {
		position: 'absolute',
		height: '100%',
		width: 'auto',
	},
	rightGrid: {
		position: 'absolute',
		height: '100%',
		width: 'auto',
		right: 0,
	},
	headerContainer: {
		position: 'absolute',
		marginHorizontal: 48,
		paddingVertical: 12,
		top: 0,
		left: 0,
		right: 0,
	},
	mobileHeaderContainer: {
		marginHorizontal: 24,
	},
	bannerTitleContainer: {
		marginTop: 100,
		zIndex: 0,
		gap: 16,
		alignSelf: 'center',
	},
	subTitle: {
		alignSelf: 'center',
		borderRadius: 30,
		paddingHorizontal: 12,
		paddingVertical: 8,
		width: 'auto',
	},
	subTitleText: {
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 9,
		letterSpacing: 2,
		color: '#fff',
	},
	title: {
		textAlign: 'center',
		fontSize: 56,
		fontWeight: '500',
		lineHeight: 64,
		color: '#d4e0ff',
		paddingBottom: 75,
	},
	mobileTitle: {
		fontSize: 32,
		lineHeight: 38,
	},
});
