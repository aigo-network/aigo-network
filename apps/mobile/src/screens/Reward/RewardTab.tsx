import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Line, Svg } from 'react-native-svg';
import CoinStack from '@aigo/components/icon/CoinStack';
import Ticket from '@aigo/components/icon/Ticket';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

const RewardTab = () => {
	const { navigate } = useNavigation();
	const { content, appUser, remoteConfig } = useSnapshot(appState);
	const { balance, myReward, redeemed } = content.screens.reward.rewardTab;
	const { isSupportedRegion } = remoteConfig.rewardFeature;

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.tabWrapper}
				onPress={() => navigate('RewardsBalance')}
				disabled={!isSupportedRegion}
			>
				<View style={styles.tab}>
					<CoinStack />
					<View style={styles.tabInfo}>
						<Text style={styles.tabTitle}>
							{appUser?.GOPoints?.toLocaleString()} GO
						</Text>
						<Text style={styles.tabSubText}>{balance}</Text>
					</View>
				</View>
			</TouchableOpacity>
			<Svg width="2" height="44" viewBox="0 0 2 44" fill="none">
				<Line x1="1" x2="1" y2="44" stroke="#D8DADC" strokeDasharray="2 2" />
			</Svg>
			<TouchableOpacity
				style={styles.tabWrapper}
				onPress={() => navigate('MyRewards')}
				disabled={!isSupportedRegion}
			>
				<View style={styles.tab}>
					<Ticket width={22} />
					<View style={styles.tabInfo}>
						<Text style={styles.tabTitle}>{myReward}</Text>
						<Text style={styles.tabSubText}>{redeemed}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default RewardTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 20,
		marginHorizontal: 16,
		borderRadius: 20,
		backgroundColor: defaultTheme.bgLight,
		shadowColor: defaultTheme.textDark60,
		shadowOpacity: 0.15,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		elevation: 6,
	},
	tabWrapper: {
		flex: 1,
	},
	tab: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flex: 1,
		paddingHorizontal: 12,
	},
	tabInfo: {
		gap: 4,
	},
	tabTitle: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '700',
		color: defaultTheme.textDark90,
	},
	tabSubText: {
		fontSize: 13,
		lineHeight: 15,
		fontWeight: '500',
		color: defaultTheme.textDark70,
	},
});
