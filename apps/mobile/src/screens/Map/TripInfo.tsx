import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import { useBouncedMapInsets, useCurrentTrip } from './shared';

export const TripInfo = () => {
	const { safeInsets } = useBouncedMapInsets();
	const { content } = useSnapshot(appState);
	const { distance, time, avgSpeed } = useCurrentTrip();

	const { top } = safeInsets;
	const { tripUnit } = content.screens.map;

	const containerStyle = [styles.innerContainer, { paddingTop: top }];

	return (
		<View style={styles.container}>
			<View style={containerStyle}>
				<View style={styles.distanceContainer}>
					<Text style={styles.distanceText}>{distance.toFixed(2)}</Text>
					<Text style={styles.descriptionText}>{tripUnit.distance}</Text>
				</View>

				<View style={styles.infoContainer}>
					<View style={styles.infoItemContainer}>
						<Text style={styles.infoText}>{time}</Text>
						<Text style={styles.descriptionText}>{tripUnit.time}</Text>
					</View>

					<View style={styles.infoItemContainer}>
						<Text style={styles.infoText}>{avgSpeed.toFixed(2)}</Text>
						<Text style={styles.descriptionText}>{tripUnit.speed}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default TripInfo;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	innerContainer: {
		padding: 20,
		backgroundColor: defaultTheme.bgLight,
		gap: 20,
	},
	distanceContainer: {
		position: 'relative',
	},
	backButton: {
		position: 'absolute',
	},
	distanceText: {
		fontSize: 48,
		lineHeight: 58,
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	infoText: {
		fontSize: 24,
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	descriptionText: {
		fontSize: 14,
		color: defaultTheme.textDark80,
		textAlign: 'center',
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 24,
	},
	infoItemContainer: {
		minWidth: 140,
	},
});
