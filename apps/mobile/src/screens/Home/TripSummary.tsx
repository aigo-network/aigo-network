import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Clock from '@aigo/components/icon/Clock';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
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

	const { title, infoTitle, infoUnit } = content.screens.home.tripSummary;

	const filteredTodayTrips = useMemo(() => {
		const today = new Date().toLocaleDateString();
		return trips.filter((trip) => {
			return (
				new Date(trip.startTime).toLocaleDateString() === today &&
				(trip.status === 'FINISHED' || trip.status === 'CLAIMED')
			);
		});
	}, [trips]);

	const { totalDistance, totalTimeInMs } =
		useInspectingTrips(filteredTodayTrips);

	const totalTimeInMinutes = useMemo(() => {
		const minutes = totalTimeInMs / (60 * 1000);
		return minutes.toPrecision(2);
	}, [totalTimeInMs]);

	const openTripHistory = () => {
		navigate('TripHistory');
	};

	return (
		<TouchableOpacity onPress={openTripHistory}>
			<View style={[sharedStyles.container, styles.container]}>
				<View style={styles.iconWrapper}>
					<LeftArrowIcon width={16} color={defaultTheme.textDark70} />
				</View>
				<Text style={sharedStyles.title}>{title}</Text>
				<View style={styles.contentContainer}>
					<View style={styles.statisticContainer}>
						<View style={styles.statisticTitleContainer}>
							<Motorbike width={14} color={defaultTheme.textDark50} />
							<Text style={styles.statisticTitle}>{infoTitle.distance}</Text>
						</View>
						<Text style={styles.numberText}>{totalDistance}</Text>
						<Text style={styles.unitText}>{infoUnit.distance}</Text>
					</View>
					<View style={styles.statisticContainer}>
						<View style={styles.statisticTitleContainer}>
							<Clock width={10} color={defaultTheme.textDark50} />
							<Text style={styles.statisticTitle}>{infoTitle.time}</Text>
						</View>
						<Text style={styles.numberText}>{totalTimeInMinutes}</Text>
						<Text style={styles.unitText}>{infoUnit.time}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default TripSummary;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		position: 'relative',
	},
	iconWrapper: {
		position: 'absolute',
		top: 18,
		right: 15,
		transform: [{ rotate: '135deg' }],
	},
	contentContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	statisticContainer: {
		alignItems: 'center',
		flex: 1,
		backgroundColor: defaultTheme.gray20,
		borderRadius: 15,
		paddingVertical: 12,
	},
	statisticTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	statisticTitle: {
		fontSize: 13,
		lineHeight: 18,
		color: defaultTheme.textDark50,
	},
	numberText: {
		fontFamily: 'DMSans',
		fontSize: 26,
		fontWeight: '700',
		lineHeight: 32,
		color: defaultTheme.textDark80,
	},
	unitText: {
		fontSize: 13,
		color: defaultTheme.textDark50,
	},
});
