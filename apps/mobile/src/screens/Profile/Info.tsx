import { StyleSheet, Text, View } from 'react-native';
import { parsePhoneNumber } from 'libphonenumber-js';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import { formatEmail } from './shared';

export const Info = () => {
	const { content, appUser } = useSnapshot(appState);
	const { infoTitle, defaultInfo } = content.screens.profile;
	const parsedPhoneNumber = appUser?.phoneNumber
		? parsePhoneNumber(appUser?.phoneNumber)
		: undefined;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{infoTitle.account}</Text>
			<View style={styles.infoContainer}>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{infoTitle.name}</Text>
					<Text style={styles.fieldValue}>
						{appUser?.name || defaultInfo.name}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{infoTitle.email}</Text>
					<Text style={styles.fieldValue}>{formatEmail(appUser?.email)}</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{infoTitle.city}</Text>
					<Text style={styles.fieldValue}>
						{appUser?.city || defaultInfo.city}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{infoTitle.descriptions}</Text>
					<Text style={styles.fieldValue}>
						{appUser?.descriptions?.join(', ') || defaultInfo.description}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>{infoTitle.phoneNumber}</Text>
					<Text style={styles.fieldValue}>
						{parsedPhoneNumber?.format('INTERNATIONAL') ||
							defaultInfo.phoneNumber}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Info;

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
		gap: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: defaultTheme.textDark90,
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
		color: defaultTheme.textDark90,
	},
	fieldValue: {
		flex: 1,
		fontSize: 16,
		color: defaultTheme.textDark70,
		textAlign: 'right',
	},
});
