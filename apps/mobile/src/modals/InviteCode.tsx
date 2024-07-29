import type { FC } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import Copy from '@aigo/components/icon/Copy';
import Tick from '@aigo/components/icon/Tick';
import X from '@aigo/components/icon/X';
import Clipboard from '@react-native-clipboard/clipboard';
import analytics from '@react-native-firebase/analytics';
import { Button } from 'components/Button';
import { defaultTheme } from 'utils/global';

type Props = {
	points: number;
	title: string;
	description: string;
	codeTitle: string;
	code: string;
	referralText: string;
	shareMessage: string;
	shareButtonText: string;
	onPressClose?: () => void;
};

export const InviteCode: FC<Props> = ({
	points,
	title,
	description,
	// codeTitle,
	code,
	referralText,
	shareMessage,
	shareButtonText,
	onPressClose,
}) => {
	const [copied, setCopied] = useState(false);

	const handleSharePress = async () => {
		try {
			await Share.open({ message: shareMessage });
			analytics().logEvent('share_invitation_code');
		} catch (err) {
			console.log('Share exception', err);
		}
	};

	const handleCopyPress = () => {
		Clipboard.setString(code);
		setCopied(true);
		analytics().logEvent('copy_invitation_code');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color={defaultTheme.textDark90} width={14} />
			</TouchableOpacity>
			<Image
				style={styles.banner}
				source={require('/assets/img/more-money.png')}
			/>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>
					{description}{' '}
					<Text style={styles.pointText}>
						{points} GO/{referralText}
					</Text>
				</Text>
				<View style={styles.codeContainer}>
					{/* <Text style={styles.codeTitle}>{codeTitle}</Text> */}
					<View style={styles.copyCodeContainer}>
						<Text style={styles.codeText}>{code}</Text>

						{copied ? (
							<Tick color={'#2fbd00'} width={20} />
						) : (
							<TouchableOpacity
								style={styles.copyButton}
								hitSlop={14}
								onPress={handleCopyPress}
							>
								<Copy color={defaultTheme.textDark90} width={13} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>

			<Button style={styles.shareButton} onPress={handleSharePress}>
				<Text style={styles.shareButtonText}>{shareButtonText}</Text>
			</Button>
		</View>
	);
};

export default InviteCode;

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.bgLight,
		paddingHorizontal: 16,
		paddingVertical: 40,
		borderRadius: 20,
		gap: 40,
	},
	closeButton: {
		backgroundColor: defaultTheme.gray20,
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	contentContainer: {
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	banner: {
		height: 160,
		width: '100%',
		objectFit: 'contain',
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
	description: {
		fontSize: 16,
		lineHeight: 28,
		color: defaultTheme.textDark90,
		textAlign: 'center',
		marginTop: 8,
	},
	pointText: {
		color: defaultTheme.cta100,
	},
	codeContainer: {
		backgroundColor: defaultTheme.gray10,
		padding: 20,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		marginTop: 8,
		width: '100%',
	},
	codeTitle: {
		color: '#00000080',
	},
	copyCodeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	copyButton: {
		padding: 8,
		borderRadius: 10,
		backgroundColor: defaultTheme.gray20,
	},
	codeText: {
		fontSize: 18,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
	shareButton: {
		backgroundColor: defaultTheme.textDark90,
		paddingVertical: 15,
		borderRadius: 50,
	},
	shareButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textLight,
	},
});
