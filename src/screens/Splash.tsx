import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AppIcon from 'components/icon/AppIcon';
import SafeContainer from 'components/SafeContainer';
import { appState } from 'state/app';
import { initAuthPromise } from 'utils/auth';
import { config } from 'utils/config';
import { useSnapshot } from 'valtio';

export const SplashScreen = () => {
	const splashContent = useSnapshot(appState.content.screens.splash);
	const { navigate } = useNavigation();
	const resolveAnimationRef = useRef(() => {});
	const animationRef = useRef(
		new Promise((resolve) => {
			resolveAnimationRef.current = resolve as never;
		}),
	);
	const IconFadeIn = FadeInDown.springify().withCallback(() => {
		runOnJS(resolveAnimationRef.current)();
	});

	useEffect(() => {
		const resolveAppInit = async () => {
			const [user] = await Promise.all([initAuthPromise, animationRef.current]);
			if (!user) {
				navigate('Login');
			} else if (!user.completeOnboarding) {
				navigate('OnboardName');
			} else {
				navigate('Home');
			}
		};

		resolveAppInit();
	}, []);

	return (
		<View style={styles.container}>
			<SafeContainer>
				<Animated.View entering={IconFadeIn} style={styles.iconContainer}>
					<AppIcon />
				</Animated.View>
				<Text style={styles.version}>
					{splashContent.versionPrefix} {config.version}
				</Text>
			</SafeContainer>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6740ff',
	},
	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	version: {
		textAlign: 'center',
	},
});
