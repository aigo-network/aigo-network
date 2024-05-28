import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { Button } from 'components/Button';
import AppIcon from 'components/icon/AppIcon';
import SafeContainer from 'components/SafeContainer';
import { appActions, appState } from 'state/app';
import type { SignInFunction } from 'utils/auth';
import { signInWithApple, signInWithGoogle } from 'utils/auth';
import { useSnapshot } from 'valtio';

export const LoginScreen = () => {
	const { navigate } = useNavigation();
	const { version, buildNumber, content } = useSnapshot(appState);
	const logInContent = content.screens.logIn;
	const backgroundSrc = require('assets/img/login/background-logo.png');
	const googleIconSrc = require('assets/img/login/google-logo.png');
	const appleIconSrc = require('assets/img/login/apple-logo.png');

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
				<View style={styles.headingContainer}>
					<TouchableOpacity onPress={() => appActions.showLanguageSelection()}>
						<Text>{content.language}</Text>
					</TouchableOpacity>
				</View>
				<View>
					<View style={styles.logoImg}>
						<AppIcon />
					</View>
					<Text style={styles.welcome}>{logInContent.welcome}</Text>
					<Text style={styles.slogan}>{logInContent.slogan}</Text>
				</View>
				<View style={styles.btnGroup}>
					<Button
						prefix={<Image source={googleIconSrc} />}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithGoogle)}
					>
						<Text style={styles.btnText}>{logInContent.googleButton}</Text>
					</Button>
					<Button
						prefix={<Image source={appleIconSrc} />}
						style={styles.btn}
						onPress={() => handleSignIn(signInWithApple)}
					>
						<Text style={styles.btnText}>{logInContent.appleButton}</Text>
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
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
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
