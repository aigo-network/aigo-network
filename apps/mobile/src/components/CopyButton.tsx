import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Copy from '@aigo/components/icon/Copy';
import Tick from '@aigo/components/icon/Tick';
import Clipboard from '@react-native-clipboard/clipboard';
import { defaultTheme } from 'utils/global';

type Props = {
	value: string;
};

export const CopyButton: FC<Props> = ({ value }) => {
	const [copied, setCopied] = useState(false);

	const handleCopyPress = () => {
		Clipboard.setString(value);
		setCopied(true);
	};

	return (
		<TouchableOpacity
			style={styles.copyButton}
			hitSlop={14}
			onPress={handleCopyPress}
		>
			{copied ? (
				<Tick color={defaultTheme.cta100} width={18} />
			) : (
				<Copy color={defaultTheme.textDark90} width={14} />
			)}
		</TouchableOpacity>
	);
};

export default CopyButton;

const styles = StyleSheet.create({
	copyButton: {
		width: 28,
		height: 28,
		borderRadius: 16,
		backgroundColor: defaultTheme.gray10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
