import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRewardClassification } from 'utils/hooks/reward';

import Item from './Item';
import { sharedStyles } from './shared';

const PastRewards = () => {
	const { navigate } = useNavigation();
	const { nonActiveRedeemedReward } = useRewardClassification();

	const goToRewards = () => {
		navigate('BottomTab', { screen: 'Reward' });
	};

	return (
		<ScrollView
			style={sharedStyles.container}
			contentContainerStyle={sharedStyles.contentContainer}
		>
			{nonActiveRedeemedReward.map((reward) => (
				<Item
					key={reward.id}
					active={false}
					rewardId={reward.id || ''}
					rewardInfoId={reward.infoId || ''}
				/>
			))}
			{nonActiveRedeemedReward.length === 0 && (
				<View style={sharedStyles.emptyRewardContainer}>
					<Text style={sharedStyles.boldText}>No Rewards Redeemed</Text>
					<Text style={sharedStyles.normalText}>
						Start exchange GO points to get rewards now
					</Text>
					<TouchableOpacity
						style={sharedStyles.goToRewardsButton}
						hitSlop={10}
						onPress={goToRewards}
					>
						<Text style={sharedStyles.buttonText}>Go to AiGO Rewards</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
};

export default PastRewards;
