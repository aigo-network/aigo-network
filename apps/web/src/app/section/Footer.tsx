import { StyleSheet, Text, View } from 'react-native';
import { useSnapshot } from 'valtio';

import { appState } from '@/state/app';

export const Footer = () => {
	const { version } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<Text style={styles.versionText}>
				Powered by AiGO Network · version@{version}
			</Text>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
		marginBottom: 24,
	},
	versionText: {
		fontSize: 13,
		textAlign: 'center',
		color: '#707174',
	},
});
