import type { FC } from 'react';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Web3FarmingReferralCode } from '@aigo/api/sdk';
import { useSnapshot } from 'valtio';

import { appState } from '@/state/app';

const usedFilter = (code: Web3FarmingReferralCode | null) => {
	return code?.invitedId;
};

interface Props {
	isMobile?: boolean;
}

const ReferralHistory: FC<Props> = ({ isMobile }) => {
	const { web3FarmingProfile } = useSnapshot(appState);
	const usedCodes = web3FarmingProfile?.referralCodes?.filter(usedFilter) || [];

	return (
		<View style={styles.container}>
			<Text style={[styles.title, isMobile && styles.mobileTitle]}>
				REFERRAL HISTORY
			</Text>
			<View style={styles.innerContainer}>
				<View style={[styles.itemContainer]}>
					{!isMobile && (
						<Text
							style={[styles.firstColumn, styles.contentText, styles.titleText]}
							numberOfLines={1}
						>
							User ID
						</Text>
					)}
					<Text
						style={[styles.dateColumn, styles.contentText, styles.titleText]}
					>
						{isMobile ? 'Date Time' : 'Date & Time'}
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
									{!isMobile && (
										<Text
											numberOfLines={1}
											style={[styles.firstColumn, styles.contentText]}
										>
											{code?.invitedId}
										</Text>
									)}
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
		minWidth: 320,
		marginBottom: 32,
	},
	innerContainer: {
		flex: 1,
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
	mobileTitle: {
		textAlign: 'center',
	},
	itemsContainer: {
		flex: 1,
		maxHeight: 250,
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
	},
	dateColumn: {
		flex: 1,
	},
	rewardsColumn: {
		flex: 1,
		textAlign: 'right',
	},
	contentText: {
		fontSize: 15,
	},
	separateLine: {
		height: 1,
		backgroundColor: '#262626',
	},
	rewardsText: {
		color: '#81DDFB',
	},
});
