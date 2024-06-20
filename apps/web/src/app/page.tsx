'use client';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ModalProvider } from 'empty-modal';

import '../utils/auth';

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
			<View style={styles.container}>
				<Banner />
				<QuestBoard />
			</View>
		</ModalProvider>
	);
}

const styles = StyleSheet.create({
	container: {},
});
