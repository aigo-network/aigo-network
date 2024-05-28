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
	const { content, onboarding } = useSnapshot(appState);
	const { descriptions } = onboarding;
	const { title, description, continueButton } =
		content.screens.onboard.userDescriptions;

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
			title={title}
			subTitle={description}
			mainBtnText={continueButton}
		>
			<View style={styles.container}>
				{userDescriptions()?.map((item, index) => {
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
