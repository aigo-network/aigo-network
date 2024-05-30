import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const Settings = () => {
	const { content } = useSnapshot(appState);
	const { settingSection } = content.screens.profile;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{settingSection.setting}</Text>
			<TouchableOpacity
				style={styles.infoContainer}
				onPress={appActions.showLanguageSelection}
			>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{settingSection.language}</Text>
					<Text style={styles.fieldValue}>{content.language}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		marginTop: 38,
		gap: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	infoContainer: {
		gap: 16,
	},
	fieldContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	fieldTitle: {
		fontSize: 16,
		color: '#000',
	},
	fieldValue: {
		flex: 1,
		fontSize: 16,
		color: '#6C6764',
		textAlign: 'right',
	},
});
