import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '@aigo/components/Avatar';
import ChevronDown from '@aigo/components/icon/ChevronDown';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Power from '@aigo/components/icon/Power';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import BlurBackground from './BlurBackground';

import Button from '@/components/Button';
import type { AuthUser } from '@/state/app';
import { logOut, signInWithTelegram, signInWithTwitter } from '@/utils/auth';

const DynamicLoading = dynamic(
	() => import('@aigo/components/LoadingContainer'),
);

interface Props {
	user?: AuthUser;
	isAuthLoading?: boolean;
	isMobile?: boolean;
}

export const SignInBundle: FC<Props> = ({ user, isAuthLoading, isMobile }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isTelegram, setIsTelegram] = useState(false);

	const handlePress = () => {
		// mockEncode();
		if (user) {
			return;
		} else if (isTelegram) {
			signInWithTelegram();
		} else {
			signInWithTwitter();
		}
	};

	const handlePressDisconnect = async () => {
		await logOut();
		setShowDropdown(false);
	};

	useEffect(() => {
		if (typeof window == 'object') {
			const url = new URL(window.location.href);
			const { hash } = url;
			if (hash.startsWith('#')) {
				const id = hash.substring(1);
				setIsTelegram(id.includes('telegram'));
			}
		}
	}, []);

	return (
		<Fragment>
			{!user?.uid ? (
				<Button style={styles.buttonContainer} onPress={handlePress}>
					<DynamicLoading isLoading={isAuthLoading}>
						<Text style={styles.buttonText}>Sign In with</Text>
						{isTelegram ? (
							<Image
								src="/dark-telegram-ic.svg"
								width={22}
								height={19}
								alt="Dark Telegram icon"
							/>
						) : (
							<Image
								src="/x-icon-dark.png"
								alt="Twitter or X icon"
								width={18}
								height={16}
							/>
						)}
					</DynamicLoading>
				</Button>
			) : (
				<TouchableOpacity
					hitSlop={34}
					activeOpacity={0.6}
					onPress={() => setShowDropdown((l) => !l)}
				>
					<BlurBackground style={styles.container}>
						<Avatar
							withName={!isMobile}
							imageUrl={user.imageUrl}
							displayTextStyle={styles.lightText}
							displayText={user.name}
						/>
						{showDropdown ? (
							<ChevronUp width={24} color={'#fff'} />
						) : (
							<ChevronDown width={24} color={'#fff'} />
						)}
						{showDropdown && (
							<View style={styles.dropdownContainer}>
								<View style={styles.innerContainer}>
									<TouchableOpacity
										style={styles.disconnectButton}
										onPress={handlePressDisconnect}
									>
										<Power width={24} strokeWidth="2.5" color={'#E15050'} />
										<Text style={styles.disconnectText}>Disconnect</Text>
									</TouchableOpacity>
								</View>
							</View>
						)}
					</BlurBackground>
				</TouchableOpacity>
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
		paddingHorizontal: 16,
		gap: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 24,
		gap: 8,
	},
	separateLine: {
		height: 14,
		borderLeftWidth: 1.5,
		borderLeftColor: '#fff',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '500',
		lineHeight: 24,
		color: '#000000',
	},
	lightText: {
		fontSize: 17,
		lineHeight: 24,
	},
	dropdownContainer: {
		position: 'absolute',
		top: 52,
		right: 0,
		width: 100,
		height: 70,
		borderRadius: 16,
		padding: 2,
		backgroundColor: '#FFFFFF29',
		borderWidth: 2,
		borderColor: '#FFFFFF33',
	},
	innerContainer: {
		flex: 1,
		borderRadius: 14,
		borderWidth: 2,
		backgroundColor: '#FFFFFF29',
		borderColor: '#FFFFFF33',
		justifyContent: 'center',
	},
	disconnectButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	disconnectText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#E15050',
	},
});
