import type { FC } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { appActions, appState } from 'state/app';
import type { RootParamList } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import OnboardLayout from './OnboardLayout';

export const ProfileName: FC<
	StackScreenProps<RootParamList, 'OnboardName'>
> = ({ navigation }) => {
	const { profileName } = useSnapshot(appState);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				disabled={!profileName}
				onPress={() => {
					navigation.navigate('OnboardDescription');
				}}
				mainBtnText="Looks good :)"
				title="Name your profile"
				subTitle="Choose a nickname for your account"
				screenOrder={1}
			>
				<View style={styles.container}>
					<TextInput
						style={styles.input}
						placeholder="Your name"
						placeholderTextColor="#afb2ff"
						value={profileName}
						onChangeText={(name) => {
							appActions.setProfileName(name);
						}}
					/>
				</View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1 }} />
				</TouchableWithoutFeedback>
			</OnboardLayout>
		</KeyboardAvoidingView>
	);
};

export default ProfileName;

const styles = StyleSheet.create({
	keyboardContainer: {
		flex: 1,
	},
	container: {
		paddingHorizontal: 40,
		paddingTop: 70,
	},
	input: {
		textAlign: 'center',
		fontSize: 25,
	},
});
