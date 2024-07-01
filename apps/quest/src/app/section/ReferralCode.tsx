import { type FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import Button from '@/components/Button';
import { appState } from '@/state/app';

interface Props {
	isMobile?: boolean;
}

export const ReferralCode: FC<Props> = ({ isMobile }) => {
	const [copied, setCopied] = useState(false);
	const { web3FarmingProfile } = useSnapshot(appState);
	const codes = web3FarmingProfile?.referralCodes || [];

	const handleCopyCode = () => {
		Clipboard.setString(codes.map((c) => c?.code).join('\n'));
		setCopied(true);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.title, isMobile && styles.mobileTitle]}>
				YOUR REFERRAL
			</Text>
			<View style={styles.innerContainer}>
				<View style={styles.gridContainer}>
					{codes.concat({ id: 'dump', code: '' }).map((code) => {
						return (
							<View key={code?.id} style={styles.cellContainer}>
								<Text
									style={[
										styles.codeText,
										!!code?.invitedId && styles.invitedCodeText,
									]}
								>
									{code?.code}
									{code?.invitedId ? ' (Used)' : ''}
								</Text>
							</View>
						);
					})}
				</View>
				<View style={styles.commandContainer}>
					<Button style={styles.buttonContainer} onPress={handleCopyCode}>
						<Image src="/copy-ic.svg" alt="Copy icon" width={24} height={24} />
						<Text style={styles.buttonText}>
							{copied ? 'Copied Code' : 'Copy Code'}
						</Text>
					</Button>
				</View>
			</View>
		</View>
	);
};

export default ReferralCode;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minWidth: 320,
		marginBottom: 32,
	},
	title: {
		fontSize: 12,
		fontWeight: '600',
		color: '#5e6063',
	},
	mobileTitle: {
		textAlign: 'center',
	},
	innerContainer: {
		marginTop: 15,
		borderRadius: 8,
		backgroundColor: '#1b1b1b',
		minHeight: 230,
		borderWidth: 1,
		borderColor: '#262626',
		overflow: 'hidden',
	},
	gridContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginRight: -1,
	},
	cellContainer: {
		flexGrow: 1,
		flexBasis: 0,
		minWidth: 220,
		height: 52,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#262626',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	codeText: {
		fontSize: 15,
	},
	invitedCodeText: {
		color: '#707174',
	},
	commandContainer: {
		flexDirection: 'row',
		padding: 12,
	},
	buttonContainer: {
		backgroundColor: '#35363a',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#fff',
	},
});
