import type { FC } from 'react';
import { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { graphqlClient } from '@aigo/api/graphql';
import type { Trip } from '@aigo/api/sdk';
import Gift from '@aigo/components/icon/Gift';
import { appActions } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useInspectingTrip } from 'utils/hooks/trips';

import { showClaimTripPoint } from './shared';

type Props = {
	trip: Trip;
};

export const TripResult: FC<Props> = ({ trip }) => {
	const { bottom } = useSafeAreaInsets();
	const [loading, setLoading] = useState(false);
	const { distance, time, avgSpeed } = useInspectingTrip(trip);

	const handlePressClaim = async () => {
		if (!trip.id) return;

		setLoading(true);
		await graphqlClient.claimTrip({ tripId: trip.id });
		await appActions.queryAndUpdateGOPoints();
		setLoading(false);

		showClaimTripPoint({ points: trip.GOPoints || 1 });
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.innerContainer}>
				<View style={styles.infoContainer}>
					<View style={styles.pointsContainer}>
						<View style={styles.innerPointsContainer}>
							<View style={styles.pointsNumberContainer}>
								<Text style={styles.pointsUnitText}>You have earned</Text>
								<Text style={styles.pointsNumber}>{trip.GOPoints || 1} GO</Text>
							</View>
						</View>
					</View>

					<View style={styles.summaryContainer}>
						<View style={styles.summaryItemContainer}>
							<Text style={styles.title}>Distance</Text>
							<Text style={styles.numberText}>
								{distance} <Text style={styles.unitText}>km</Text>
							</Text>
						</View>

						<View style={styles.separateLine} />

						<View style={styles.summaryItemContainer}>
							<Text style={styles.title}>Duration</Text>
							<Text style={styles.numberText}>
								{time} <Text style={styles.unitText}>time</Text>
							</Text>
						</View>

						<View style={styles.separateLine} />

						<View style={styles.summaryItemContainer}>
							<Text style={styles.title}>Average Speed</Text>
							<Text style={styles.numberText}>
								{avgSpeed} <Text style={styles.unitText}>km/h</Text>
							</Text>
						</View>
					</View>
				</View>

				<View style={[styles.claimContainer, { marginBottom: bottom || 30 }]}>
					{loading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size={'large'} />
						</View>
					) : (
						<TouchableOpacity
							style={styles.claimButton}
							activeOpacity={0.8}
							onPress={handlePressClaim}
						>
							<Gift />
							<Text style={styles.claimText}>
								Claim {trip.GOPoints || 1} GO Point
							</Text>
						</TouchableOpacity>
					)}
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
	},
	innerContainer: {
		flex: 1,
	},
	infoContainer: {
		width: '100%',
	},
	pointsContainer: {
		width: '120%',
		aspectRatio: 1,
		left: '-10%',
		borderRadius: 400,
		position: 'relative',
		backgroundColor: defaultTheme.cta20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	innerPointsContainer: {
		width: '78%',
		aspectRatio: 1,
		borderRadius: 400,
		backgroundColor: defaultTheme.cta40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pointsNumberContainer: {
		position: 'relative',
		top: -30,
	},
	pointsNumber: {
		fontSize: 48,
		fontWeight: '800',
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	pointsUnitText: {
		fontSize: 16,
		lineHeight: 35,
		color: defaultTheme.textDark80,
		textAlign: 'center',
	},
	summaryContainer: {
		position: 'absolute',
		left: 16,
		right: 16,
		bottom: -60,
		backgroundColor: defaultTheme.bgLight,
		paddingVertical: 28,
		paddingHorizontal: 32,
		borderRadius: 20,
		gap: 18,

		elevation: 3,
		shadowColor: '#cacaca',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 10,
	},
	summaryItemContainer: {
		minWidth: 68,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 15,
		fontWeight: '500',
		color: defaultTheme.textDark60,
	},
	numberText: {
		fontSize: 28,
		fontWeight: '600',
		color: defaultTheme.textDark80,
	},
	unitText: {
		fontSize: 12,
		fontWeight: '600',
		color: defaultTheme.textDark60,
	},
	separateLine: {
		borderWidth: 1,
		borderColor: defaultTheme.gray20,
	},
	claimContainer: {
		marginTop: 'auto',
		paddingHorizontal: 16,
	},
	loadingContainer: {
		alignItems: 'center',
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
