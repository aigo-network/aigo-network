import type { FC } from 'react';
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	showConfirmRedemption,
	showSuccessRedemption,
} from 'modals/RewardModals';
import { appState } from 'state/app';
import { rewardState } from 'state/reward';
import { defaultTheme } from 'utils/global';
import type { RootStackParamList } from 'utils/navigation';
import { RewardStatus } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import Description from './Description';
import RewardTicket from './RewardTicket';

const brandImageSize = 48;

const RewardDetailScreen: FC = () => {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const { params } = useRoute<RouteProp<RootStackParamList, 'RewardDetail'>>();
	const [screenWidth, setScreenWidth] = useState(0);
	const { rewards } = useSnapshot(rewardState);
	const reward = rewards?.[params?.rewardId || ''];
	const [rewardDescription, termAndCondition] = (
		reward?.description || ''
	).split('_*_');
	const { content } = useSnapshot(appState);
	const { expired, points, redeemButton, markUsedButton } =
		content.screens.reward.rewardsDetail;
	const isExpired = params?.status === RewardStatus.EXPIRED;

	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		setScreenWidth(nativeEvent.layout.width);
	};

	const onRedeemPress = () => {
		showConfirmRedemption({
			rewardName: 'Baskin Robbin',
			points: 100,
			onConfirm: () => {
				showSuccessRedemption({ rewardName: 'Baskin Robbin' });
			},
		});
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContentContainer}
				onLayout={handleLayoutChange}
			>
				<Image
					width={screenWidth}
					height={screenWidth}
					source={{ uri: reward?.images?.[0] || '' }}
					resizeMode="cover"
				/>

				<View
					style={[
						styles.upperContainer,
						!params?.redeemed && styles.separateStyle,
						isExpired && styles.expiredStyle,
					]}
				>
					<View style={styles.brandContainer}>
						<Image
							width={brandImageSize}
							height={brandImageSize}
							resizeMode="contain"
							source={{ uri: reward?.brandImage || '' }}
						/>
						<View style={{ flex: 1 }}>
							<Text style={styles.brand}>{reward?.brand}</Text>
							<View>
								<Text style={styles.rewardName}>{reward?.name}</Text>
							</View>
						</View>
					</View>

					{params?.redeemed && (
						<RewardTicket
							rewardStatus={params?.status || RewardStatus.ACTIVE}
						/>
					)}

					<View style={styles.pointAndDateContainer}>
						<View style={styles.tagContainer}>
							<Text style={styles.tagTitle}>{points}</Text>
							<View style={styles.pointContainer}>
								<Text
									style={[
										styles.point,
										params?.redeemed && { color: defaultTheme.textDark90 },
									]}
								>
									{reward?.discount
										? (reward?.points || 0) * (1 - reward.discount / 100)
										: reward?.points}{' '}
									GO
								</Text>
								{!!reward?.discount && (
									<Text style={styles.discount}>{reward?.points}</Text>
								)}
							</View>
						</View>
						<View style={styles.tagContainer}>
							<Text style={styles.tagTitle}>{expired}</Text>
							<Text style={styles.date}>
								{new Date(reward?.expiredDate).toLocaleDateString()}
							</Text>
						</View>
					</View>
				</View>

				{!params?.redeemed && (
					<Description
						rewardDescription={rewardDescription}
						termAndConditions={termAndCondition}
					/>
				)}
			</ScrollView>

			<TouchableOpacity
				style={[styles.backButton, { top: top + 20 }]}
				onPress={goBack}
			>
				<View style={styles.innerBackButton}>
					<LeftArrowIcon width={16} color={defaultTheme.textDark90} />
				</View>
			</TouchableOpacity>

			<View style={styles.redeemButtonWrapper}>
				{params?.redeemed ? (
					<TouchableOpacity style={styles.redeemButton}>
						<Text style={styles.redeemText}>{markUsedButton}</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.redeemButton} onPress={onRedeemPress}>
						<Text style={styles.redeemText}>{redeemButton}</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default RewardDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		backgroundColor: defaultTheme.bgLight,
	},
	scrollContentContainer: {
		paddingBottom: 120,
	},
	upperContainer: {
		paddingTop: 16,
		paddingBottom: 24,
		marginHorizontal: 16,
	},
	separateStyle: {
		borderBottomWidth: 1,
		borderBottomColor: defaultTheme.textDark10,
	},
	brandContainer: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	brand: {
		fontSize: 13,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark60,
	},
	rewardName: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	pointAndDateContainer: {
		marginTop: 16,
		flexDirection: 'row',
		gap: 14,
	},
	tagContainer: {
		flex: 1,
		padding: 12,
		gap: 8,
		borderRadius: 20,
		backgroundColor: defaultTheme.gray10,
	},
	tagTitle: {
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: -0.3,
		color: defaultTheme.textDark80,
	},
	pointContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		gap: 4,
	},
	point: {
		lineHeight: 16,
		fontWeight: '700',
		letterSpacing: -0.3,
		color: defaultTheme.cta100,
	},
	discount: {
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: -0.3,
		color: defaultTheme.textDark30,
		textDecorationLine: 'line-through',
	},
	date: {
		lineHeight: 16,
		fontWeight: '500',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	belowContainer: {
		marginTop: 24,
	},
	normalText: {
		marginHorizontal: 16,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	highlightText: {
		fontWeight: '700',
	},
	backButton: {
		position: 'absolute',
		left: 16,
	},
	innerBackButton: {
		width: 32,
		height: 32,
		borderRadius: 20,
		backgroundColor: defaultTheme.bgLight,
		alignItems: 'center',
		justifyContent: 'center',
	},
	redeemButtonWrapper: {
		position: 'absolute',
		bottom: 40,
		left: 32,
		right: 32,
		backgroundColor: defaultTheme.bgLight,
		borderRadius: 50,
	},
	redeemButton: {
		paddingVertical: 20,
		borderRadius: 50,
		backgroundColor: defaultTheme.textDark90,
		elevation: 6,
		shadowColor: defaultTheme.textDark100,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 12,
		shadowOpacity: 0.3,
	},
	redeemText: {
		alignSelf: 'center',
		fontSize: 15,
		lineHeight: 18,
		fontWeight: '600',
	},
	expiredStyle: {
		opacity: 0.5,
	},
});
