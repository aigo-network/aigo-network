import { Image, StyleSheet, Text, View } from 'react-native';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { Button } from 'components/Button';
import AppIcon from 'components/icon/AppIcon';
import SafeContainer from 'components/SafeContainer';
import type { SignInFunction } from 'utils/auth';
import { signInWithApple, signInWithGoogle } from 'utils/auth';
import { config } from 'utils/config';

export const LoginScreen = () => {
	const { navigate } = useNavigation();

	const handleSignIn = async (signIn: SignInFunction) => {
		try {
			const authUser = await signIn();
			if (!authUser) return;
			const { user } = await graphqlClient.completeOnboarding();
			if (user?.completeOnboarding) {
				navigate('Home');
			} else {
				navigate('OnboardName');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('assets/img/login/background-logo.png')}
				style={styles.backgroundImage}
			/>
			<SafeContainer style={styles.safeContainer}>
				<View>
					<View style={styles.logoImg}>
						<AppIcon />
					</View>
					<Text style={styles.welcome}>{`Welcome to\nAiGO`}</Text>
					<Text style={styles.slogan}>
						{'Turns your everyday\nActions into rewards'}
					</Text>
				</View>
				<View style={styles.btnGroup}>
					<Button
						prefix={
							<Image source={require('assets/img/login/google-logo.png')} />
						}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithGoogle)}
					>
						<Text style={styles.btnText}>Log in with Google</Text>
					</Button>
					<Button
						prefix={
							<Image source={require('assets/img/login/apple-logo.png')} />
						}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithApple)}
					>
						<Text style={styles.btnText}>Log in with Apple</Text>
					</Button>
				</View>
				<Text style={styles.version}>Version {config.version}</Text>
			</SafeContainer>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6740ff',
	},
	backgroundImage: {
		position: 'absolute',
		bottom: 0,
		left: 200,
	},
	safeContainer: {
		justifyContent: 'space-between',
	},
	logoImg: {
		alignSelf: 'center',
		marginTop: 120,
		marginBottom: 24,
	},
	welcome: {
		fontWeight: '600',
		fontSize: 42,
		textAlign: 'center',
	},
	slogan: {
		alignSelf: 'center',
		marginTop: 14,
		fontSize: 19,
		color: '#a0fa82',
	},
	btnGroup: {
		flex: 1,
		gap: 17,
		paddingHorizontal: 40,
		justifyContent: 'flex-end',
		paddingBottom: 50,
	},
	btn: {
		paddingVertical: 15,
		backgroundColor: '#ededed',
		borderRadius: 50,
	},
	btnText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#000',
	},
	version: {
		textAlign: 'center',
	},
});
