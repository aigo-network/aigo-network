import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Motorbike from '@aigo/components/icon/Motorbike';
import { useNavigation } from '@react-navigation/native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useInspectingTrips, useTrips } from 'utils/hooks/trips';
import { useSnapshot } from 'valtio';

import { sharedStyles } from './shared';

export const TripSummary = () => {
	const { navigate } = useNavigation();
	const { content } = useSnapshot(appState);
	const { trips } = useTrips();

	const { title, infoUnit } = content.screens.home.tripSummary;

	const filteredTodayTrips = useMemo(() => {
		const today = new Date().toLocaleDateString();
		return trips.filter((trip) => {
			return (
				new Date(trip.startTime).toLocaleDateString() === today &&
				(trip.status === 'FINISHED' || trip.status === 'CLAIMED')
			);
		});
	}, [trips]);

	const { totalDistance, totalTime, avgSpeed } =
		useInspectingTrips(filteredTodayTrips);

	const openTripHistory = () => {
		navigate('TripHistory');
	};

	return (
		<TouchableOpacity onPress={openTripHistory}>
			<View style={[sharedStyles.container, styles.container]}>
				<View style={styles.iconContainer}>
					<Motorbike width={28} color={defaultTheme.textDark80} />
				</View>

				<View style={styles.contentContainer}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.summaryContainer}>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{totalDistance}</Text>
							<Text style={styles.unitText}>{infoUnit.km}</Text>
						</View>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{totalTime}</Text>
							<Text style={styles.unitText}>{infoUnit.time}</Text>
						</View>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.numberText}>{avgSpeed}</Text>
							<Text style={styles.unitText}>{infoUnit.avgSpeed}</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default TripSummary;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	iconContainer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 1,
		gap: 10,
	},
	title: {
		fontSize: 16,
		lineHeight: 20,
		color: defaultTheme.textDark70,
	},
	summaryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	summaryItemContainer: {},
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
