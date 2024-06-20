import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import Avatar from '@aigo/components/Avatar';
import type { User as FirebaseUser } from 'firebase/auth';
import dynamic from 'next/dynamic';

import Button from '@/components/Button';
import { signInWithTwitter } from '@/utils/auth';

const DynamicLoading = dynamic(
	() => import('@aigo/components/LoadingContainer'),
);

interface Props {
	user?: FirebaseUser;
	isAuthLoading?: boolean;
}

export const SignInBundle: FC<Props> = ({ user, isAuthLoading }) => {
	return (
		<Button style={styles.buttonContainer} onPress={signInWithTwitter}>
			<DynamicLoading isLoading={isAuthLoading}>
				{user?.uid ? (
					<Avatar
						withName
						imageUrl={user.photoURL}
						displayText={user.displayName || user.email}
					/>
				) : (
					<Text style={[styles.buttonText, { color: '#000' }]}>Sign In</Text>
				)}
			</DynamicLoading>
		</Button>
	);
};

export default SignInBundle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonContainer: {
		height: 48,
		minWidth: 144,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 24,
	},
});
