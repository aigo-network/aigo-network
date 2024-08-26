import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Motorbike from '@aigo/components/icon/Motorbike';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export const StartTrip = () => {
	const { bottom } = useSafeAreaInsets();
	const { content } = useSnapshot(appState);
	const { reset } = useNavigation();
	const homeContent = content.screens.home;

	const handleOpenMap = () => {
		reset({ routes: [{ name: 'BottomTab', params: { screen: 'Map' } }] });
	};

	const containerStyle = [
		styles.container,
		{ bottom: Platform.OS === 'android' ? 30 : bottom },
	];

	return (
		<View style={containerStyle}>
			<View style={styles.buttonBackground}>
				<TouchableOpacity
					style={styles.openButton}
					activeOpacity={0.5}
					onPress={handleOpenMap}
				>
					<Motorbike />
					<Text style={styles.openButtonTitle}>{homeContent.mainButton}</Text>
				</TouchableOpacity>
			</View>
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
	buttonBackground: {
		borderRadius: 46,
		backgroundColor: defaultTheme.bgLight,
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
		shadowColor: defaultTheme.textDark100,
		shadowOpacity: 0.32,
		shadowRadius: 12,
		elevation: 8,
	},
	openButtonTitle: {
		fontSize: 16,
		fontWeight: '600',
	},
});
