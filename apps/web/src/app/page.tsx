'use client';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ModalProvider } from 'empty-modal';

import '@/utils/auth';
import '@/utils/global';

import Banner from './section/Banner';
import Footer from './section/Footer';
import QuestBoard from './section/QuestBoard';

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
			<ScrollView style={styles.container}>
				<Banner isMobile={isMobile} />
				<QuestBoard isMobile={isMobile} />
				<Footer />
			</ScrollView>
		</ModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
	},
});
