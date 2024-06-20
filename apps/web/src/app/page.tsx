'use client';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ModalProvider } from 'empty-modal';

import '@/utils/auth';
import '@/utils/global';

import Banner from './section/Banner';
import QuestBoard from './section/QuestBoard';

export default function Home() {
	const [, setRender] = useState({});

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
	}, []);

	return (
		<ModalProvider>
			<ScrollView style={styles.container}>
				<Banner />
				<QuestBoard />
			</ScrollView>
		</ModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
	},
});
