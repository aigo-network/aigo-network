import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import Image from 'next/image';

import leftGrid from '../left-grid.svg';
import rightGrid from '../right-grid.svg';

import BlurBackground from '@/components/BlurBackground';
import Header from '@/components/Header';

const Banner: FC = () => {
	return (
		<View style={styles.container}>
			<Svg style={styles.bannerBackground} width="100%" height="auto">
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
			<Header style={styles.headerContainer} />
			<View style={styles.bannerTitleContainer}>
				<BlurBackground style={styles.subTitle}>
					<Text style={styles.subTitleText}>
						DECENTRALIZED MOBILITY DATA NETWORK
					</Text>
				</BlurBackground>
				<Text style={styles.title}>
					{'Neque Porro Quisquam\nClorem Siz Ipsum.'}
				</Text>
			</View>
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
		marginHorizontal: 48,
		paddingVertical: 12,
	},
	bannerTitleContainer: {
		gap: 16,
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
});
