import { type FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Web3FarmingProfile } from '@aigo/api/sdk';
import Copy from '@aigo/components/icon/Copy';

import { clashDisplay } from '@/utils/style';

type Props = {
	farmingProfile: Web3FarmingProfile;
};

export const CopyAll: FC<Props> = ({ farmingProfile }) => {
	const [copied, setCopied] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const onPress = () => {
		const codes =
			farmingProfile.referralCodes?.map((c) => c?.code).join('\n') || '';
		navigator.clipboard.writeText(codes);

		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 4000);
	};

	return (
		<TouchableOpacity
			style={[styles.container, isHovered && styles.hover]}
			onPress={onPress}
			// @ts-ignore No overload matches this call
			onMouseEnter={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<Copy width={17} color={'#232529'} strokeWidth="1.5" />
			{copied ? (
				<Text style={styles.title}>Copied</Text>
			) : (
				<Text style={styles.title}>Copy All</Text>
			)}
		</TouchableOpacity>
	);
};

export default CopyAll;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor: '#81DDFB',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 16,
		justifyContent: 'center',
		gap: 8,
	},
	hover: {
		opacity: 0.8,
	},
	title: {
		fontSize: 16,
		color: '#232529',
		fontWeight: '600',
		textAlign: 'center',
		fontFamily: clashDisplay.style.fontFamily,
	},
});
