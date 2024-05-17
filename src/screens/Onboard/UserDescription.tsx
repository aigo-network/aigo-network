import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import DescriptionCard from 'components/DescriptionCard';
import { appActions, appState } from 'state/app';
import type { RootParamList } from 'utils/navigation';

import OnboardLayout from './OnboardLayout';
import { useSnapshot } from 'valtio';

const userDescription = [
	{
		label: 'Nyam Nyam Driver',
		value: 'NyamNyamDriver',
	},
	{
		label: 'City Explorer',
		value: 'CityExplorer',
	},
	{
		label: 'Fitness Enthusiast',
		value: 'FitnessEnthusiast',
	},
	{
		label: 'Commuter',
		value: 'Commuter',
	},
	{
		label: 'Traveler',
		value: 'Traveler',
	},
	{
		label: 'Casual user',
		value: 'CasualUser',
	},
];

export const UserDescription: FC<
	StackScreenProps<RootParamList, 'OnboardDescription'>
> = ({ navigation }) => {
	const [itemWidth, setItemWidth] = useState(0);
	const {userDescription: selectedList} = useSnapshot(appState);
	const onItemPress = (newSelectedList: string[]) => {
		appActions.setUserDescription(newSelectedList);
	};
	const onContinuePress = () => {
		navigation.navigate('OnboardCity');
	};

	return (
		<OnboardLayout
			disabled={!selectedList.length}
			onPress={onContinuePress}
			title="What's best describe you"
			subTitle="You can choose multiple options"
			screenOrder={2}
		>
			<View
				style={styles.container}
				onLayout={({ nativeEvent }) => {
					const availableSpace = nativeEvent.layout.width - (25 * 2 + 15);
					setItemWidth(Math.floor(availableSpace / 2));
				}}
			>
				{userDescription.map((description) => {
					return (
						<DescriptionCard
							key={description.value}
							item={description}
							selectedList={selectedList}
							onPress={onItemPress}
							width={itemWidth}
						/>
					);
				})}
			</View>
		</OnboardLayout>
	);
};

export default UserDescription;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		flexWrap: 'wrap',
		gap: 15,
		paddingHorizontal: 25,
	},
});
