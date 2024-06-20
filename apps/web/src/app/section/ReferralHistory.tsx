import { type FC, Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSnapshot } from 'valtio';

import cssStyle from '../page.module.css';

import { appState } from '@/state/app';

const ReferralHistory: FC = () => {
	const { web3FarmingProfile } = useSnapshot(appState);
	const usedCodes =
		web3FarmingProfile?.referralCodes?.filter((code) => code?.invitedId) || [];

	return (
		<div className={cssStyle.referralHistory}>
			<p className={cssStyle.title}>HISTORY REFERRAL</p>

			<View style={styles.container}>
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
										style={[styles.firstColumn, styles.contentText]}
										numberOfLines={1}
									>
										{code?.invitedId}
									</Text>
									<Text style={[styles.dateColumn, styles.contentText]}>
										{new Date(code?.invitedDate).toLocaleString()}
									</Text>
									<Text
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
		</div>
	);
};

export default ReferralHistory;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1b1b1b',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#262626',
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
	},
	titleText: {
		color: '#5e6063',
	},
	firstColumn: {
		width: 200,
	},
	dateColumn: {
		width: 180,
	},
	rewardsColumn: {
		width: 70,
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
