import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import DescriptionCard from 'components/DescriptionCard';
import { appActions, appState } from 'state/app';
import { userDescriptions } from 'state/app/types';
import type { RootStackParamList } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import OnboardLayout from './OnboardLayout';

export const UserDescription: FC<
	StackScreenProps<RootStackParamList, 'OnboardDescription'>
> = ({ navigation }) => {
	const {
		onboarding: { descriptions },
	} = useSnapshot(appState);

	const onItemPress = (newSelectedList: string[]) => {
		appActions.updateOnboarding({ descriptions: newSelectedList as never });
	};

	const onContinuePress = () => {
		navigation.navigate('OnboardCity');
	};

	return (
		<OnboardLayout
			currentIndex={2}
			disabled={!descriptions?.length}
			onPress={onContinuePress}
			title="What's best describe you"
			subTitle="You can choose multiple options"
		>
			<View style={styles.container}>
				{userDescriptions?.map((item, index) => {
					return (
						<DescriptionCard
							key={index}
							item={item}
							selectedList={descriptions || []}
							onPress={onItemPress}
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
		zIndex: 9,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		flexWrap: 'wrap',
		paddingHorizontal: 25,
	},
});
