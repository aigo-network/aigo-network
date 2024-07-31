import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Trip } from '@aigo/api/sdk';
import Motorbike from '@aigo/components/icon/Motorbike';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useInspectingTrip } from 'utils/hooks/trips';
import { useSnapshot } from 'valtio';

type Props = {
	trip: Trip;
};

export const TripItem: FC<Props> = ({ trip }) => {
	const { content } = useSnapshot(appState);
	const { startPosition, distance, time, startTime, avgSpeed } =
		useInspectingTrip(trip);
	const { loadingLocation, infoUnit } = content.screens.tripHistory;

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Motorbike width={28} color={defaultTheme.textDark80} />
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.titleContainer}>
					<View style={styles.titleTextContainer}>
						<Text style={styles.startPositionText} numberOfLines={1}>
							{startPosition || loadingLocation}
						</Text>
						<Text style={styles.startTimeText}>
							{`${startTime.toLocaleDateString()} - ${startTime.toLocaleTimeString()}`}
						</Text>
					</View>
					<View style={styles.pointsContainer}>
						<Text style={styles.pointsText}>{trip.GOPoints || 0} GO</Text>
					</View>
				</View>

				<View style={styles.summaryContainer}>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{distance}</Text>
						<Text style={styles.unitText}>{infoUnit.km}</Text>
					</View>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{time}</Text>
						<Text style={styles.unitText}>{infoUnit.time}</Text>
					</View>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{avgSpeed}</Text>
						<Text style={styles.unitText}>{infoUnit.avgSpeed}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default TripItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: defaultTheme.gray10,
		paddingLeft: 16,
		paddingRight: 24,
		paddingTop: 18,
		paddingBottom: 18,
		borderRadius: 20,
		gap: 14,
	},
	iconContainer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 1,
		gap: 6,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	titleTextContainer: {
		flex: 1,
	},
	pointsContainer: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 24,
		backgroundColor: defaultTheme.cta100,
	},
	pointsText: {
		color: defaultTheme.textLight,
	},
	startPositionText: {
		fontSize: 16,
		lineHeight: 20,
		color: defaultTheme.textDark90,
	},
	startTimeText: {
		fontSize: 12,
		color: defaultTheme.textDark70,
	},
	summaryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 2,
	},
	summaryItemContainer: {
		minWidth: 68,
	},
	numberText: {
		fontSize: 20,
		fontWeight: '700',
		lineHeight: 24,
		color: defaultTheme.textDark90,
	},
	unitText: {
		fontSize: 12,
		color: defaultTheme.textDark70,
	},
});
