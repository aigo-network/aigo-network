import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import Image from 'next/image';

import cssStyles from '../page.module.css';

import Button from '@/components/Button';

const ReferralCode: FC = () => (
	<div className={cssStyles.referralCode}>
		<span className={cssStyles.title}>YOUR REFERRAL</span>
		<div className={cssStyles.grid}>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className={cssStyles.codeCell}>
					<p>AiGO - 12345</p>
				</div>
			))}
			<div className={cssStyles.codeCell}>
				<p> </p>
			</div>
			<div className={cssStyles.btnCell}>
				{/* <div style={{ height: 48, margin: 12, backgroundColor: '#35363a', width: '100%' }}>
					
				</div> */}
				<Button style={styles.copyBtn}>
					<Image src="/copy-ic.svg" alt="Copy icon" width={24} height={24} />
					<Text style={styles.copyTxt}>Copied Code</Text>
				</Button>
			</div>
		</div>
	</div>
);

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
