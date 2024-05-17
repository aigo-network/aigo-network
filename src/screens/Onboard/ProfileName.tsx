import { type FC, useState } from 'react';
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
import OnboardLayout from 'components/OnboardLayout';
import { appActions } from 'state/app';
import type { RootStackParamList } from 'utils/navigation';

export const ProfileName: FC<
	StackScreenProps<RootStackParamList, 'OnboardName'>
> = ({ navigation }) => {
	const [name, setName] = useState(auth().currentUser?.displayName || '');

	const handleContinue = () => {
		appActions.updateOnboarding({ name });
		navigation.navigate('OnboardDescription');
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				currentIndex={0}
				disabled={!name}
				onPress={handleContinue}
				mainBtnText="Looks good :)"
				title="Name your profile"
				subTitle="Choose a nickname for your account"
			>
				<View style={styles.container}>
					<TextInput
						style={styles.input}
						placeholder="Your name"
						placeholderTextColor="#afb2ff"
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
		fontSize: 30,
		fontWeight: '500',
	},
});
