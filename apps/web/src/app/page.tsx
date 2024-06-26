'use client';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ModalProvider } from 'empty-modal';

import '@/utils/auth';
import '@/utils/global';

import Banner from './section/Banner';
import Footer from './section/Footer';
import MissionBoard from './section/MissionBoard';
import ReferralBoard from './section/ReferralBoard';

import { useIsMobile } from '@/hooks/responsive';

export default function Home() {
	const isMobile = useIsMobile();
	const [, setRender] = useState({});

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
	}, []);

	return (
		<ModalProvider>
			<ImageBackground source={backgroundImgSrc}>
				<LinearGradient colors={backgroundGradients}>
					<ScrollView style={styles.container}>
						<Banner isMobile={isMobile} />
						{/* <QuestBoard isMobile={isMobile} /> */}
						<View style={styles.groupBoard}>
							<ReferralBoard />
							<MissionBoard />
						</View>
						<Footer />
					</ScrollView>
				</LinearGradient>
			</ImageBackground>
		</ModalProvider>
	);
}

const backgroundImgSrc = { uri: '/background-img.png' };
const backgroundGradients = [
	'rgba(0, 0, 0, 0.65)',
	'rgba(0, 0, 0, 0.85)',
	'rgba(0, 0, 0, 1.0)',
];

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: 'auto',
	},
	contentContainer: {
		height: '100%',
	},
	groupBoard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignSelf: 'center',
		justifyContent: 'center',
		gap: 24,
		maxWidth: 1250,
		paddingHorizontal: 25,
		width: '100%',
	},
});
