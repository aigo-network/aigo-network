import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

import Item from './Item';

const PastRewards = () => {
	const { navigate } = useNavigation();

	const goToRewards = () => {
		navigate('BottomTab', { screen: 'Reward' });
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
		>
			<Item active={false} />
			<View style={styles.emptyRewardContainer}>
				<Text style={styles.boldText}>No Rewards Redeemed</Text>
				<Text style={styles.normalText}>
					Start exchange GO points to get rewards now
				</Text>
				<TouchableOpacity
					style={styles.goToRewardsButton}
					hitSlop={10}
					onPress={goToRewards}
				>
					<Text style={styles.buttonText}>Go to AiGO Rewards</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default PastRewards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	contentContainer: {
		paddingTop: 24,
		paddingHorizontal: 16,
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
	goToRewardsButton: {
		marginTop: 50,
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '800',
		color: defaultTheme.cta100,
	},
});
