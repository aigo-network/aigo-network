import { type FC, Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { appState } from '@/state/app';

const usedFilter = (code: Web3FarmingReferralCode | null) => {
	return code?.invitedId;
};

const ReferralHistory: FC = () => {
	const { web3FarmingProfile } = useSnapshot(appState);
	const usedCodes = web3FarmingProfile?.referralCodes?.filter(usedFilter) || [];

	return (
		<View style={styles.container}>
			<Text style={styles.title}>REFERRAL HISTORY</Text>
			<View style={styles.innerContainer}>
				<View style={[styles.itemContainer]}>
					<Text
						style={[styles.firstColumn, styles.contentText, styles.titleText]}
						numberOfLines={1}
					>
						User ID
					</Text>
					<Text
						style={[styles.dateColumn, styles.contentText, styles.titleText]}
					>
						Date & Time
					</Text>
					<Text
						style={[styles.rewardsColumn, styles.contentText, styles.titleText]}
					>
						Rewards
					</Text>
				</View>
				<View style={styles.separateLine} />

				<ScrollView
					style={styles.itemsContainer}
					contentContainerStyle={styles.itemsContentContainer}
				>
					{usedCodes?.map((code) => {
						return (
							<Fragment key={code?.id}>
								<View style={styles.itemContainer} key={code?.id}>
									<Text
										numberOfLines={1}
										style={[styles.firstColumn, styles.contentText]}
									>
										{code?.invitedId}
									</Text>
									<Text
										numberOfLines={1}
										style={[styles.dateColumn, styles.contentText]}
									>
										{new Date(code?.invitedDate).toLocaleString()}
									</Text>
									<Text
										numberOfLines={1}
										style={[
											styles.rewardsColumn,
											styles.contentText,
											styles.rewardsText,
										]}
									>
										+{code?.referrerGOPoints} GO
									</Text>
								</View>

								<View style={styles.separateLine} />
							</Fragment>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
};

export default ReferralHistory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minWidth: 360,
	},
	innerContainer: {
		marginTop: 15,
		backgroundColor: '#1b1b1b',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#262626',
	},
	title: {
		fontSize: 12,
		fontWeight: '600',
		color: '#5e6063',
	},
	itemsContainer: {
		height: 134,
	},
	itemsContentContainer: {
		height: 134,
	},
	itemContainer: {
		flexDirection: 'row',
		gap: 30,
		paddingVertical: 12,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	titleText: {
		color: '#5e6063',
	},
	firstColumn: {
		flex: 1,
		// width: 200,
	},
	dateColumn: {
		flex: 1,
		// width: 180,
	},
	rewardsColumn: {
		flex: 1,
		// width: 70,
		textAlign: 'right',
	},
	contentText: {
		fontSize: 16,
	},
	separateLine: {
		height: 1,
		backgroundColor: '#262626',
	},
	rewardsText: {
		color: '#81DDFB',
	},
});
