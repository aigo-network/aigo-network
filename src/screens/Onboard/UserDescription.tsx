import type { FC } from 'react';
import { useState } from 'react';
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
	const { title, description, continueButton } = useSnapshot(
		appState.content.screens.onboard.userDescriptions,
	);
	const [itemWidth, setItemWidth] = useState(0);
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
			title={title}
			subTitle={description}
			mainBtnText={continueButton}
		>
			<View
				style={styles.container}
				onLayout={({ nativeEvent }) => {
					const availableSpace = nativeEvent.layout.width - (25 * 2 + 15);
					setItemWidth(Math.floor(availableSpace / 2));
				}}
			>
				{userDescriptions()?.map((item, index) => {
					return (
						<DescriptionCard
							key={index}
							item={item}
							selectedList={descriptions || []}
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
