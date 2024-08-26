import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
	ActivityIndicator,
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
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useRewardDetail } from 'utils/hooks/reward';
import type { RootStackParamList } from 'utils/navigation';
import { RewardStatus } from 'utils/reward';
import { useSnapshot } from 'valtio';

import Description from './Description';
import { handleMarkUsedPress, handleRedeemPress } from './internal';
import PointsAndDate from './PointsAndDate';
import Ticket from './Ticket';
import Title from './Title';

const RewardDetailScreen: FC = () => {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const { params } = useRoute<RouteProp<RootStackParamList, 'RewardDetail'>>();
	const [screenWidth, setScreenWidth] = useState(0);
	const [loading, setLoading] = useState(false);
	const [rewardStatus, setRewardStatus] = useState(RewardStatus.ACTIVE);
	const { rewardInfo, reward } = useRewardDetail({
		rewardInfoId: params?.rewardInfoId || '',
		redeemedRewardId: params?.rewardId || '',
	});

	const { content } = useSnapshot(appState);
	const { redeemButton, markUsedButton } = content.screens.reward.rewardsDetail;
	const [rewardDescription, termAndCondition] = (
		rewardInfo?.description || ''
	).split('_*_');
	const isExpired = new Date(rewardInfo?.expiredDate) < new Date();
	const isUsed = reward?.used || false;
	const isActive = !isExpired && !isUsed;

	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		setScreenWidth(nativeEvent.layout.width);
	};

	const onRedeemPress = () => {
		setLoading(true);

		const calculatedPoints =
			(rewardInfo?.points || 0) -
			((rewardInfo?.points || 0) * (rewardInfo?.discount || 0)) / 100;
		handleRedeemPress(
			params?.rewardInfoId || '',
			rewardInfo?.name || '',
			calculatedPoints,
			() => setLoading(false),
		);
	};

	const onMarkUsedPress = () => {
		setLoading(true);

		handleMarkUsedPress(params?.rewardId || '', () => setLoading(false));
	};

	useEffect(() => {
		if (isExpired) {
			setRewardStatus(RewardStatus.EXPIRED);
		} else if (isUsed) {
			setRewardStatus(RewardStatus.USED);
		}
	}, [reward]);

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
					source={{ uri: rewardInfo?.images?.[0] || '' }}
					resizeMode="cover"
				/>

				<View
					style={[
						styles.upperContainer,
						!params?.redeemed && styles.separateStyle,
						isExpired && styles.expiredStyle,
					]}
				>
					<Title
						brandImage={rewardInfo?.brandImage || ''}
						brand={rewardInfo?.brand || ''}
						name={rewardInfo?.name || ''}
					/>

					{params?.redeemed && (
						<Ticket
							rewardId={params.rewardId || ''}
							rewardStatus={rewardStatus}
						/>
					)}

					<PointsAndDate
						isRedeemed={params?.redeemed}
						rewardInfo={rewardInfo as never}
					/>
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

			<View
				style={[
					styles.floatButtonWrapper,
					!isActive && styles.hiddenFloatButton,
				]}
			>
				{loading ? (
					<ActivityIndicator size={30} />
				) : params?.redeemed ? (
					<TouchableOpacity
						style={styles.floatButton}
						onPress={onMarkUsedPress}
						disabled={!isActive}
					>
						<Text style={styles.redeemText}>{markUsedButton}</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.floatButton} onPress={onRedeemPress}>
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
	floatButtonWrapper: {
		position: 'absolute',
		bottom: 40,
		left: 32,
		right: 32,
		backgroundColor: defaultTheme.bgLight,
		borderRadius: 50,
	},
	hiddenFloatButton: {
		opacity: 0,
	},
	floatButton: {
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
