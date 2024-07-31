import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Trip } from '@aigo/api/sdk';
import { defaultTheme } from 'utils/global';
import { useInspectingTrip } from 'utils/hooks/trips';

type Props = {
	trip: Trip;
};

export const TripResult: FC<Props> = ({ trip }) => {
	const { distance, time, avgSpeed, startTime, endTime } =
		useInspectingTrip(trip);

	const st = startTime.toLocaleTimeString();
	const en = endTime.toLocaleTimeString();

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.innerContainer}>
				<View style={styles.pointsContainer}>
					<Text style={styles.pointsNumber}>{trip.GOPoints || 1}</Text>
					<Text style={styles.pointsUnitText}>GO points earned</Text>
				</View>

				<View style={styles.summaryContainer}>
					<Text style={styles.summaryTitle}>
						Today {st} - {en}
					</Text>
					<View style={styles.summaryInfoContainer}>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{distance}</Text>
							<Text style={styles.unitText}>km</Text>
						</View>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{time}</Text>
							<Text style={styles.unitText}>Duration</Text>
						</View>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{avgSpeed}</Text>
							<Text style={styles.unitText}>Speed (km/h)</Text>
						</View>
					</View>
				</View>

				<View style={styles.claimContainer}>
					<TouchableOpacity style={styles.claimButton} activeOpacity={0.8}>
						<Text style={styles.claimText}>
							Claim {trip.GOPoints || 1} GO Point
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default TripResult;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
		padding: 16,
	},
	innerContainer: {
		flex: 1,
	},
	pointsContainer: {
		height: 240,
		justifyContent: 'center',
		position: 'relative',
	},
	pointsNumber: {
		fontSize: 48,
		fontWeight: '800',
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	pointsUnitText: {
		fontSize: 16,
		color: defaultTheme.textDark80,
		textAlign: 'center',
	},
	summaryContainer: {
		backgroundColor: defaultTheme.gray10,
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderRadius: 20,
		gap: 18,
	},
	summaryTitle: {
		color: defaultTheme.textDark70,
		alignSelf: 'center',
	},
	summaryInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 2,
	},
	summaryItemContainer: {
		minWidth: 68,
	},
	numberText: {
		fontSize: 24,
		fontWeight: '700',
		color: defaultTheme.textDark90,
	},
	unitText: {
		fontSize: 12,
		color: defaultTheme.textDark70,
	},
	claimContainer: {
		marginTop: 'auto',
	},
	claimButton: {
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
	claimText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textLight,
	},
});
