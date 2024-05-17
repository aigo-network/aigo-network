import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AppIcon from 'components/AppIcon';
import SafeContainer from 'components/SafeContainer';
import { authPromise } from 'utils/auth';
import { config } from 'utils/config';

export const SplashScreen = () => {
	const { navigate } = useNavigation();
	const resolveAnimationRef = useRef(() => {});
	const animationRef = useRef(
		new Promise((resolve) => {
			resolveAnimationRef.current = resolve as never;
		}),
	);
	const IconFadeIn = FadeInUp.duration(600).withCallback(() => {
		runOnJS(resolveAnimationRef.current)();
	});

	useEffect(() => {
		const resolveAppInit = async () => {
			const [user] = await Promise.all([authPromise, animationRef.current]);
			if (!user) {
				navigate('Login');
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
				<Text style={styles.version}>Version {config.version}</Text>
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
