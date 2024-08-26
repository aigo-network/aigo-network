import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRewardClassification } from 'utils/hooks/reward';

import Item from './Item';
import { sharedStyles } from './shared';

const ActiveRewards = () => {
	const { navigate } = useNavigation();
	const { activeRedeemedReward } = useRewardClassification();

	const goToRewards = () => {
		navigate('BottomTab', { screen: 'Reward' });
	};

	return (
		<ScrollView
			style={sharedStyles.container}
			contentContainerStyle={sharedStyles.contentContainer}
		>
			{activeRedeemedReward.map((reward) => (
				<Item
					key={reward.id}
					active={true}
					rewardId={reward.id || ''}
					rewardInfoId={reward.infoId || ''}
				/>
			))}
			{activeRedeemedReward.length === 0 && (
				<View style={sharedStyles.emptyRewardContainer}>
					<Text style={sharedStyles.boldText}>Ready to Earn Rewards?</Text>
					<Text style={sharedStyles.normalText}>
						You don’t have any rewards yet. Start unlocking exclusive benefits
						and rewards with your GO Points now.
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

export default ActiveRewards;
