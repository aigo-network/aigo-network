import { type FC, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '@aigo/components/Avatar';
import type { User as FirebaseUser } from 'firebase/auth';
import dynamic from 'next/dynamic';

import BlurBackground from './BlurBackground';

import Button from '@/components/Button';
import { signInWithTwitter } from '@/utils/auth';

const DynamicLoading = dynamic(
	() => import('@aigo/components/LoadingContainer'),
);

interface Props {
	user?: FirebaseUser;
	isAuthLoading?: boolean;
	points?: number;
}

export const SignInBundle: FC<Props> = ({ user, isAuthLoading, points }) => {
	const handlePress = () => {
		if (user) {
			return;
		} else {
			signInWithTwitter();
		}
	};

	return (
		<Fragment>
			{!user?.uid ? (
				<Button
					style={[styles.container, styles.buttonContainer]}
					onPress={handlePress}
				>
					<DynamicLoading isLoading={isAuthLoading}>
						<Text style={[styles.buttonText, { color: '#000' }]}>Sign In</Text>
					</DynamicLoading>
				</Button>
			) : (
				<BlurBackground style={styles.container}>
					<Avatar
						withName
						imageUrl={user.photoURL}
						displayTextStyle={styles.lightText}
						displayText={user.displayName || user.email}
					/>
					<View style={styles.separateLine} />
					<View>
						<Text style={styles.lightText}>{points || 0} GO</Text>
					</View>
				</BlurBackground>
			)}
		</Fragment>
	);
};

export default SignInBundle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 12,
		paddingHorizontal: 20,
		gap: 12,
	},
	buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	separateLine: {
		height: 14,
		borderLeftWidth: 1.5,
		borderLeftColor: '#fff',
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 24,
	},
	lightText: {
		color: '#fff',
		fontSize: 17,
		lineHeight: 24,
	},
});
