import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CloseIcon from '@aigo/components/icon/X';
import { appActions } from 'state/app';
import type { LangKey } from 'utils/translations';
import { translations } from 'utils/translations';

interface Props {
	onClose: () => void;
}

export const LanguageSelectionModal: FC<Props> = ({ onClose }) => {
	const selectLanguage = (key: LangKey) => {
		appActions.setAppLanguage(key as LangKey);
		onClose();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onClose}
			>
				<CloseIcon color="#9F9F9F" width={14} />
			</TouchableOpacity>
			{Object.keys(translations).map((key) => {
				const translation = translations[key as LangKey];
				return (
					<TouchableOpacity
						key={key}
						onPress={() => selectLanguage(key as LangKey)}
					>
						<Text style={styles.message}>{translation.language}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default LanguageSelectionModal;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingHorizontal: 30,
		paddingTop: 60,
		paddingBottom: 40,
		borderRadius: 20,
		alignItems: 'center',
		gap: 20,
	},
	closeButton: {
		backgroundColor: '#F0F0F0',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	message: {
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
		alignSelf: 'center',
		color: '#000',
	},
});
