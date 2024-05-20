import { type FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { config } from 'utils/config';

import Copy from './icon/Copy';
import Tick from './icon/Tick';
import X from './icon/X';
import { Button } from './Button';

type Props = {
	code: string;
	onPressClose?: () => void;
};

export const InviteCode: FC<Props> = ({ code, onPressClose }) => {
	const [copied, setCopied] = useState(false);
	const handlePressCopy = () => {
		Clipboard.setString(code);
		setCopied(true);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color={'#9F9F9F'} width={14} />
			</TouchableOpacity>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Invite your friends !</Text>
				<Text style={styles.description}>
					{'Click copy or Share button to \n'}
					<Text style={styles.description}>
						invite friends and receive{' '}
						<Text style={styles.pointText}>
							{config.activity.InviteFriend.points} GO/referral
						</Text>
					</Text>
				</Text>
			</View>
			<View style={styles.codeContainer}>
				<Text style={styles.codeTitle}>Invitation Code</Text>
				<View style={styles.copyCodeContainer}>
					<Text style={styles.codeText}>{code}</Text>

					{copied ? (
						<Tick color={'#2fbd00'} width={20} />
					) : (
						<TouchableOpacity
							style={styles.copyButton}
							hitSlop={14}
							onPress={handlePressCopy}
						>
							<Copy color={'#343434'} width={13} />
						</TouchableOpacity>
					)}
				</View>
			</View>

			<Button style={styles.shareButton} onPress={handlePressCopy}>
				<Text style={styles.shareButtonText}>Share with friends</Text>
			</Button>
		</View>
	);
};

export default InviteCode;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		minWidth: 360,
		padding: 30,
		paddingTop: 70,
		paddingBottom: 40,
		borderRadius: 20,
		gap: 30,
	},
	closeButton: {
		backgroundColor: '#F0F0F0',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	titleContainer: {
		gap: 24,
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: '600',
		color: '#000000',
	},
	description: {
		fontSize: 16,
		lineHeight: 22,
		color: '#000000',
		textAlign: 'center',
	},
	pointText: {
		color: '#714CFE',
	},
	codeContainer: {
		backgroundColor: '#F7F7F7',
		padding: 20,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
		marginHorizontal: 10,
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
		backgroundColor: '#E6E6E6',
	},
	codeText: {
		fontSize: 24,
		color: '#141414',
	},
	shareButton: {
		backgroundColor: '#a0fa82',
		paddingVertical: 15,
		borderRadius: 50,
	},
	shareButtonText: {
		fontWeight: '500',
		fontSize: 19,
		color: '#6740FF',
	},
});