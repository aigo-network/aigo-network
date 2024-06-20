import { type FC, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import cssStyles from '../page.module.css';

import Button from '@/components/Button';
import { appState } from '@/state/app';

const ReferralCode: FC = () => {
	const [copied, setCopied] = useState(false);
	const { web3FarmingProfile } = useSnapshot(appState);
	const codes = (web3FarmingProfile && web3FarmingProfile.referralCodes) || [];

	const handleCopyCode = () => {
		Clipboard.setString(codes.map((c) => c?.code).join('\n'));
		setCopied(true);
	};

	return (
		<div className={cssStyles.referralCode}>
			<span className={cssStyles.title}>YOUR REFERRAL</span>
			<div className={cssStyles.grid}>
				{codes.length > 0
					? codes.map((code) => {
							return (
								<div key={code?.id} className={cssStyles.codeCell}>
									<p>{code?.code}</p>
								</div>
							);
						})
					: Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className={cssStyles.codeCell}>
								<p>AiGO - 12345</p>
							</div>
						))}

				<div className={cssStyles.codeCell}>
					<p> </p>
				</div>

				<div className={cssStyles.btnCell}>
					<Button style={styles.copyBtn} onPress={handleCopyCode}>
						<Image src="/copy-ic.svg" alt="Copy icon" width={24} height={24} />
						<Text style={styles.copyTxt}>
							{copied ? 'Copied Code' : 'Copy Code'}
						</Text>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ReferralCode;

const styles = StyleSheet.create({
	copyBtn: {
		backgroundColor: '#35363a',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	copyTxt: {
		fontSize: 16,
		lineHeight: 24,
		color: '#fff',
	},
});
