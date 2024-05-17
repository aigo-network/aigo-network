import { Image, StyleSheet, Text, View } from 'react-native';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Button } from 'components/Button';
import AppIcon from 'components/icon/AppIcon';
import SafeContainer from 'components/SafeContainer';
import { appActions } from 'state/app';
import { handleSignInApple, handleSignInGoogle } from 'utils/auth';
import { config } from 'utils/config';

export const LoginScreen = () => {
	const handleSignIn = async (
		callback: () => Promise<FirebaseAuthTypes.User>,
	) => {
		const user = await callback();
		appActions.setUser(user);
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
						onPress={() => handleSignIn(handleSignInGoogle)}
					>
						<Text style={styles.btnText}>Log in with Google</Text>
					</Button>
					<Button
						prefix={
							<Image source={require('assets/img/login/apple-logo.png')} />
						}
						style={styles.btn}
						onPress={() => handleSignIn(handleSignInApple)}
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
	},
	version: {
		textAlign: 'center',
	},
});
