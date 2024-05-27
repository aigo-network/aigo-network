import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const Info = () => {
	const { infoTitle, defaultInfo } = useSnapshot(
		appState.content.screens.profile,
	);
	const { appUser } = useSnapshot(appState);

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
					<Text style={styles.fieldTitle}>{infoTitle.name}</Text>
					<Text style={styles.fieldValue}>
						{appUser?.email || defaultInfo.email}
					</Text>
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
			</View>
		</View>
	);
};

export default Info;

const styles = StyleSheet.create({
	container: {
		marginTop: 18,
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
