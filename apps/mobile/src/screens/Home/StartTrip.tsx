import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Motorbike from '@aigo/components/icon/Motorbike';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export const StartTrip = () => {
	const { bottom } = useSafeAreaInsets();
	const { content } = useSnapshot(appState);
	const { navigate } = useNavigation();
	const homeContent = content.screens.home;

	const handleOpenMap = () => {
		navigate('Map');
		showStartTripBottomSheet();
	};

	const containerStyle = [styles.container, { bottom }];

	return (
		<View style={containerStyle}>
			<TouchableOpacity style={styles.openButton} onPress={handleOpenMap}>
				<Motorbike />
				<Text style={styles.openButtonTitle}>
					{homeContent.startTrip.openButton}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default StartTrip;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 28,
		right: 28,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	openButton: {
		padding: 16,
		paddingVertical: 18,
		borderRadius: 46,
		backgroundColor: defaultTheme.textDark90,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 14,
		shadowColor: '#000000',
		shadowOpacity: 0.32,
		shadowRadius: 12,
		elevation: 8,
	},
	openButtonTitle: {
		fontSize: 16,
		fontWeight: '600',
	},
});
