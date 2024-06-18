'use client';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import '../utils/auth';

import Banner from './section/Banner';

export default function Home() {
	const [, setRender] = useState({});

	useEffect(function updateState() {
		//  This effect makes reanimated work
		setRender({});
	}, []);

	return (
		<View style={styles.container}>
			<Banner />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#04080b',
	},
});
