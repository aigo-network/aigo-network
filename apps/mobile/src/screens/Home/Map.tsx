import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { sharedStyles } from './shared';

export const Map = () => {
	const { content } = useSnapshot(appState);
	const { navigate } = useNavigation();
	const homeContent = content.screens.home;
	const handleOpenMap = () => {
		navigate('Map');
	};

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>{homeContent.mapSection.title}</Text>
				<TouchableOpacity style={styles.openButton} onPress={handleOpenMap}>
					<Text>{homeContent.mapSection.openButton}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	openButton: {
		padding: 8,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: '#6740FF',
	},
});
