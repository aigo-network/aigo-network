'use client';
import { Button, StyleSheet, View } from 'react-native';

import { signInWithGoogle } from './signIn';

export const SignIn = () => {
	return (
		<View style={styles.container}>
			<Button onPress={signInWithGoogle} title="Sign In" />
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		height: '100vh' as never,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
