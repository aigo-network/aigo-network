import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { graphqlClient } from '@aigo/api/graphql';
import { Button } from '@aigo/components/Button';
import SafeContainer from '@aigo/components/SafeContainer';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { showLanguageSelection } from 'modals/index';
import { appState } from 'state/app';
import type { SignInFunction } from 'utils/auth';
import { signInWithApple, signInWithGoogle } from 'utils/auth';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export const LoginScreen = () => {
	const { navigate, reset } = useNavigation();
	const { version, buildNumber, buildHash, content, remoteConfig } =
		useSnapshot(appState);
	const logInContent = content.screens.logIn;
	const backgroundSrc = require('assets/img/login/aigo-ride-logo-light.png');
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
				reset({
					routes: [{ name: 'BottomTab', params: { screen: 'Home' } }],
				});
			} else {
				reset({
					routes: [{ name: 'OnboardName' }],
				});
			}
		} catch (error) {
			crashlytics().recordError(error as Error);
			console.log(error);
		}
	};

	const handlePhoneSignIn = () => {
		navigate('PhoneLogin');
	};

	return (
		<View style={styles.container}>
			<SafeContainer style={styles.safeContainer}>
				<View style={styles.headingContainer}>
					<TouchableOpacity onPress={() => showLanguageSelection()}>
						<Text style={{ color: defaultTheme.textDark90 }}>
							{content.language}
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Image
						source={backgroundSrc}
						style={styles.logoImage}
						resizeMode="contain"
					/>
					{/* <Text style={styles.welcome}>{logInContent.welcome}</Text> */}
					<Text style={styles.slogan}>{logInContent.slogan}</Text>
				</View>

				<View style={styles.bottomGroup}>
					<View style={styles.btnGroup}>
						<Button
							prefix={
								<Image style={styles.googleIcon} source={googleIconSrc} />
							}
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
							suffix={
								remoteConfig.nyamNyamCampaignActivated && (
									<Image style={styles.nnIcon} source={nyamNyamSrc} />
								)
							}
							style={styles.btn}
							onPress={handlePhoneSignIn}
						>
							<Text style={styles.btnText}>
								{logInContent.phoneNumberButton}
							</Text>
						</Button>
					</View>
					<Text style={styles.version}>
						{logInContent.versionPrefix} {version} ({buildNumber} {buildHash})
					</Text>
				</View>
			</SafeContainer>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	safeContainer: {
		justifyContent: 'space-between',
	},
	headingContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		justifyContent: 'flex-end',
	},
	logoImage: {
		alignSelf: 'center',
		height: 165,
		width: 200,
	},
	welcome: {
		fontWeight: '600',
		fontSize: 42,
		textAlign: 'center',
		paddingHorizontal: 24,
	},
	slogan: {
		paddingHorizontal: 24,
		alignSelf: 'center',
		marginTop: 14,
		fontSize: 16,
		color: defaultTheme.textDark80,
	},
	bottomGroup: {
		gap: 20,
	},
	btnGroup: {
		gap: 17,
		paddingHorizontal: 24,
		justifyContent: 'flex-end',
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
		backgroundColor: defaultTheme.gray20,
		borderRadius: 50,
	},
	btnText: {
		textAlign: 'center',
		fontSize: 20,
		color: defaultTheme.textDark90,
	},
	version: {
		textAlign: 'center',
		color: defaultTheme.textDark90,
	},
});
