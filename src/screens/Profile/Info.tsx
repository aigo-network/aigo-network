import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

export const Info = () => {
	const { appUser } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Account Information</Text>
			<View style={styles.infoContainer}>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>Name</Text>
					<Text style={styles.fieldValue}>{appUser?.name || 'Anonymous'}</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>Email</Text>
					<Text style={styles.fieldValue}>
						{appUser?.email || 'anonymous@aigo.network'}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>City</Text>
					<Text style={styles.fieldValue}>{appUser?.city || 'AiGO City'}</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.fieldTitle}>Descriptions</Text>
					<Text style={styles.fieldValue}>
						{appUser?.descriptions?.join(', ') || 'AiGO lover'}
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
		fontSize: 16,
		color: '#6C6764',
	},
});
