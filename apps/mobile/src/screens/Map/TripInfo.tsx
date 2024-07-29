import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChevronLeft from '@aigo/components/icon/ChevronLeft';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

import { useBouncedMapInsets, useCurrentTrip } from './shared';

export const TripInfo = () => {
	const { goBack } = useNavigation();
	const { safeInsets } = useBouncedMapInsets();
	const { top } = safeInsets;
	const { distance, time, avgSpeed } = useCurrentTrip();

	const containerStyle = [styles.innerContainer, { paddingTop: top }];

	return (
		<View style={styles.container}>
			<View style={containerStyle}>
				<View style={styles.distanceContainer}>
					<Text style={styles.distanceText}>{distance.toPrecision(2)}</Text>
					<Text style={styles.descriptionText}>Distance (km)</Text>

					<TouchableOpacity
						style={styles.backButton}
						hitSlop={14}
						onPress={goBack}
					>
						<ChevronLeft
							width={28}
							color={defaultTheme.textDark20}
							strokeWidth="3"
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.infoContainer}>
					<View style={styles.infoItemContainer}>
						<Text style={styles.infoText}>{time}</Text>
						<Text style={styles.descriptionText}>Time</Text>
					</View>

					<View style={styles.infoItemContainer}>
						<Text style={styles.infoText}>{avgSpeed.toPrecision(2)}</Text>
						<Text style={styles.descriptionText}>Speed (km/h)</Text>
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
