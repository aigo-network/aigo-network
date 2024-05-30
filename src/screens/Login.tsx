import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { Button } from 'components/Button';
import AppIcon from 'components/icon/AppIcon';
import SafeContainer from 'components/SafeContainer';
import { appState } from 'state/app';
import type { SignInFunction } from 'utils/auth';
import { signInWithApple, signInWithGoogle } from 'utils/auth';
import { useSnapshot } from 'valtio';

export const LoginScreen = () => {
	const logInContent = useSnapshot(appState.content.screens.logIn);
	const { navigate } = useNavigation();
	const { version, buildNumber } = useSnapshot(appState);
	const backgroundSrc = require('assets/img/login/background-logo.png');
	const googleIconSrc = require('assets/img/login/google-logo.png');
	const appleIconSrc = require('assets/img/login/apple-logo.png');
	const phoneNumberSrc = require('assets/img/login/phone-number.png');
	const nyamNyamSrc = require('assets/img/login/nyam-nyam-logo.png');

	const handleSignIn = async (signIn: SignInFunction) => {
		try {
			const authUser = await signIn();
			if (!authUser) return;
			const { user } = await graphqlClient.getUserProfile();
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
			<Image source={backgroundSrc} style={styles.backgroundImage} />
			<SafeContainer style={styles.safeContainer}>
				<View>
					<View style={styles.logoImg}>
						<AppIcon />
					</View>
					<Text style={styles.welcome}>{logInContent.welcome}</Text>
					<Text style={styles.slogan}>{logInContent.slogan}</Text>
				</View>

				<View style={styles.btnGroup}>
					<Button
						prefix={<Image style={styles.googleIcon} source={googleIconSrc} />}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithGoogle)}
					>
						<Text style={styles.btnText}>{logInContent.googleButton}</Text>
					</Button>
					<Button
						prefix={<Image style={styles.appleIcon} source={appleIconSrc} />}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithApple)}
					>
						<Text style={styles.btnText}>{logInContent.appleButton}</Text>
					</Button>
					<Button
						prefix={
							<Image style={styles.phoneNumberIcon} source={phoneNumberSrc} />
						}
						suffix={<Image style={styles.nnIcon} source={nyamNyamSrc} />}
						style={styles.btn}
					>
						<Text style={styles.btnText}>{logInContent.phoneNumberButton}</Text>
					</Button>
				</View>
				<Text style={styles.version}>
					{logInContent.versionPrefix} {version} ({buildNumber})
				</Text>
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
		paddingHorizontal: 20,
	},
	slogan: {
		alignSelf: 'center',
		marginTop: 14,
		fontSize: 19,
		color: '#a0fa82',
		paddingHorizontal: 20,
	},
	btnGroup: {
		flex: 1,
		gap: 17,
		paddingHorizontal: 24,
		justifyContent: 'flex-end',
		paddingBottom: 50,
	},
	googleIcon: {
		width: 24,
		height: 24,
	},
	appleIcon: {
		width: 19,
		height: 24,
	},
	phoneNumberIcon: {
		width: 22,
		height: 22,
	},
	nnIcon: {
		width: 40,
		height: 24,
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
