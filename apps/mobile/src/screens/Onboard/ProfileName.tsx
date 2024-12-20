import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import type { StackScreenProps } from '@react-navigation/stack';
import { appActions, appState } from 'state/app';
import { getDefaultUserInfoFromStorage } from 'state/app/userInfo';
import { defaultTheme } from 'utils/global';
import type { RootStackParamList } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import OnboardLayout from './OnboardLayout';

export const ProfileName: FC<
	StackScreenProps<RootStackParamList, 'OnboardName'>
> = ({ navigation }) => {
	const [name, setName] = useState(auth().currentUser?.displayName || '');
	const { content } = useSnapshot(appState);
	const { title, description, continueButton, inputPlaceholder } =
		content.screens.onboard.name;

	const handleContinue = () => {
		appActions.updateOnboarding({ name });
		navigation.navigate('OnboardDescription');
	};

	useEffect(() => {
		const loadDefaultUserInfo = async () => {
			const userInfo = await getDefaultUserInfoFromStorage();
			setName(userInfo.displayName);
		};
		if (!name) loadDefaultUserInfo();
	}, []);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				currentIndex={1}
				disabled={!name}
				onPress={handleContinue}
				mainBtnText={continueButton}
				title={title}
				subTitle={description}
			>
				<View style={styles.container}>
					<TextInput
						style={styles.input}
						placeholder={inputPlaceholder}
						placeholderTextColor={defaultTheme.textDark30}
						value={name}
						onChangeText={setName}
						autoFocus
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
		fontSize: 24,
	},
});
