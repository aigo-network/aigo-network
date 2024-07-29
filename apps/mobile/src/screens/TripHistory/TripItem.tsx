import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Trip } from '@aigo/api/sdk';
import Motorbike from '@aigo/components/icon/Motorbike';
import * as turf from '@turf/turf';
import { formatTimeDiffToHMS } from 'utils/datetime';
import { defaultTheme } from 'utils/global';
import { queryReverseGeocode } from 'utils/mapbox';

type Props = {
	trip: Trip;
};

export const TripItem: FC<Props> = ({ trip }) => {
	const [startPosition, setStartPosition] = useState('Loading Location');
	const startTime = new Date(trip.createdAt);
	const endTime = new Date(trip.updatedAt);
	const time = useMemo(() => {
		const time = formatTimeDiffToHMS(endTime, startTime);
		if (time.startsWith('00:')) return time.replace('00:', '');
		return time;
	}, []);

	const route = useMemo(() => {
		return JSON.parse(trip.route) as GeoJSON.LineString;
	}, [trip.route]);

	const distance = useMemo(() => {
		if (!route) return 0;
		if (route.coordinates.length < 2) return 0;

		const line = turf.lineString(route.coordinates);
		const length = turf.length(line, { units: 'kilometers' });

		return length.toPrecision(2);
	}, [route]);

	const avgSpeed = useMemo(() => {
		const ms = endTime.valueOf() - startTime.valueOf();
		const h = ms / (60 * 60 * 1000);
		if (h === 0) return 0;
		return (Number(distance) / h).toPrecision(2);
	}, [distance]);

	useEffect(() => {
		if (!route || route.coordinates.length < 1) return;
		const handleStartLocation = async () => {
			const [longitude, latitude] = route.coordinates[0];
			const reversedGeocodeRes = await queryReverseGeocode(longitude, latitude);

			setStartPosition(
				reversedGeocodeRes.body.features[0].place_name || 'Unknown',
			);
		};
		handleStartLocation();
	}, [route]);

	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Motorbike width={28} color={defaultTheme.textDark80} />
			</View>

			<View style={styles.contentContainer}>
				<Text style={styles.startPositionText} numberOfLines={1}>
					{startPosition}
				</Text>
				<Text style={styles.startTimeText}>
					{`${startTime.toLocaleDateString()} - ${startTime.toLocaleTimeString()}`}
				</Text>
				<View style={styles.summaryContainer}>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{distance}</Text>
						<Text style={styles.unitText}>km</Text>
					</View>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{time}</Text>
						<Text style={styles.unitText}>Time</Text>
					</View>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.numberText}>{avgSpeed}</Text>
						<Text style={styles.unitText}>Avg Speed (km/h)</Text>
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
		paddingBottom: 22,
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
	startPositionText: {
		fontSize: 16,
		lineHeight: 20,
		color: defaultTheme.textDark70,
	},
	startTimeText: {
		fontSize: 12,
		color: defaultTheme.textDark70,
	},
	summaryContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
