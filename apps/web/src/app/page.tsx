'use client';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ModalProvider } from 'empty-modal';

import '@/utils/auth';
import '@/utils/global';

import Banner from './section/Banner';
import Footer from './section/Footer';
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
			<ImageBackground source={{ uri: '/background-img.png' }}>
				<LinearGradient
					colors={[
						'rgba(0, 0, 0, 0.65)',
						'rgba(0, 0, 0, 0.85)',
						'rgba(0, 0, 0, 1.0)',
					]}
				>
					<ScrollView style={styles.container}>
						<Banner isMobile={isMobile} />
						{/* <QuestBoard isMobile={isMobile} /> */}
						<ReferralBoard />
						<Footer />
					</ScrollView>
				</LinearGradient>
			</ImageBackground>
		</ModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
		// backgroundColor: '#121212',
	},
	background: {
		position: 'absolute',
		width: '100%',
		height: 'auto',
	},
	contentContainer: {
		height: '100%',
	},
});
