import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CenterScreenHeader from 'components/CenterScreenHeader';
import { defaultTheme } from 'utils/global';

import Item from './Item';

const RewardsBalanceScreen = () => {
	const { top, bottom } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingTop: top + 20 }]}>
			<CenterScreenHeader title={'Rewards balance'} style={styles.header} />
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={{ paddingBottom: bottom || 20 }}
			>
				<Item />

				<View style={styles.emptyRewardContainer}>
					<Text style={styles.boldText}>Nothing here yet</Text>
					<Text style={styles.normalText}>There is no recent activity</Text>
				</View>
			</ScrollView>
		</View>
	);
};

export default RewardsBalanceScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.bgLight,
		flex: 1,
	},
	header: {
		paddingBottom: 16,
	},
	scrollContainer: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	emptyRewardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 150,
	},
	boldText: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '700',
		color: defaultTheme.textDark80,
	},
	normalText: {
		marginTop: 10,
		fontSize: 16,
		lineHeight: 24,
		color: defaultTheme.textDark60,
		textAlign: 'center',
	},
});
