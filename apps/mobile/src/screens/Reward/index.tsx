import type { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import HotRewards from './HotRewards';
import RewardTab from './RewardTab';

const RewardScreen: FC = () => {
	const { top } = useSafeAreaInsets();
	const { content } = useSnapshot(appState);
	const { screenTitle } = content.screens.reward;

	return (
		<View style={styles.container}>
			<Text style={[styles.header, { marginTop: top }]}>{screenTitle}</Text>
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContentContainer}
			>
				<View style={styles.scrollBackground} />
				<RewardTab />
				<HotRewards />
				{/* <View style={{height: 2000, backgroundColor: 'red'}} /> */}
			</ScrollView>
		</View>
	);
};

export default RewardScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#e1f3fd',
		gap: 20,
	},
	header: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: '600',
		color: defaultTheme.textDark90,
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	scrollContainer: {
		minHeight: '100%',
	},
	scrollContentContainer: {
		paddingTop: 10,
		paddingBottom: 350,
		// paddingHorizontal: 16,
		position: 'relative',
		minHeight: '100%',
	},
	scrollBackground: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 50,
		borderTopLeftRadius: 36,
		borderTopRightRadius: 36,
		backgroundColor: defaultTheme.bgLight,
	},
});
