import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import OnboardLayout from 'components/OnboardLayout';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const ProfileName = () => {
	const { profileName } = useSnapshot(appState);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				disabled={!profileName}
				onPress={() => {}}
				mainBtnText="Looks good :)"
				title="Name your profile"
				subTitle="Choose a nickname for your account"
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
		fontFamily: 'Gabarito',
		color: '#fff',
	},
});
