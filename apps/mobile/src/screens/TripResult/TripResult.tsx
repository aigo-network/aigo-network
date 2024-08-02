import type { FC } from 'react';
import { Fragment, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { graphqlClient } from '@aigo/api/graphql';
import type { Trip } from '@aigo/api/sdk';
import Gift from '@aigo/components/icon/Gift';
import SafeContainer from '@aigo/components/SafeContainer';
import { showStartTripBottomSheet } from 'modals/StartTrip';
import mustache from 'mustache';
import { appActions, appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useInspectingTrip } from 'utils/hooks/trips';
import { navigationRef } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import { showClaimTripPoint } from './shared';

type Props = {
	trip: Trip;
};

export const TripResult: FC<Props> = ({ trip }) => {
	const { content } = useSnapshot(appState);
	const [loading, setLoading] = useState(false);
	const { distance, time, avgSpeed } = useInspectingTrip(trip);

	const {
		pointsTitle,
		infoTitles,
		infoUnits,
		claim,
		sorryTitle,
		sorryMessage,
		tryAgain,
		backToHome,
	} = content.screens.tripResult;

	const inactive = !trip.GOPoints || trip.GOPoints === 0;

	const handlePressClaim = async () => {
		if (!trip.id) return;

		setLoading(true);
		await graphqlClient.claimTrip({ tripId: trip.id });
		await appActions.queryAndUpdateGOPoints();
		setLoading(false);

		showClaimTripPoint({ points: trip.GOPoints || 0 });
	};

	const handleTryAgain = () => {
		navigationRef.navigate('Map');
		showStartTripBottomSheet();
	};

	const handleBackToHome = () => {
		navigationRef.navigate('Home');
	};

	return (
		<SafeContainer style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={[styles.outerBg, inactive && styles.outerInactive]}>
					<View style={[styles.mainBg, inactive && styles.inactive]}>
						<View style={[styles.innerBg, inactive && styles.innerInactive]}>
							{inactive ? (
								<View style={styles.pointsNumberContainer}>
									<Text style={styles.sorryTitle}>{sorryTitle}</Text>
									<Text style={styles.sorryMessage}>{sorryMessage}</Text>
								</View>
							) : (
								<View style={styles.pointsNumberContainer}>
									<Text style={styles.pointsUnitText}>{pointsTitle}</Text>
									<Text style={styles.pointsNumber}>
										{trip.GOPoints || 0} GO
									</Text>
								</View>
							)}
						</View>
					</View>
				</View>

				<View style={styles.summaryContainer}>
					<View style={styles.summaryItemContainer}>
						<Text style={styles.title}>{infoTitles.distance}</Text>
						<Text style={styles.numberText}>
							{distance} <Text style={styles.unitText}>{infoUnits.km}</Text>
						</Text>
					</View>

					<View style={styles.separateLine} />

					<View style={styles.summaryItemContainer}>
						<Text style={styles.title}>{infoTitles.duration}</Text>
						<Text style={styles.numberText}>
							{time} <Text style={styles.unitText}>{infoUnits.time}</Text>
						</Text>
					</View>

					<View style={styles.separateLine} />

					<View style={styles.summaryItemContainer}>
						<Text style={styles.title}>{infoTitles.avgSpeed}</Text>
						<Text style={styles.numberText}>
							{avgSpeed} <Text style={styles.unitText}>{infoUnits.speed}</Text>
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.claimContainer}>
				{inactive ? (
					<Fragment>
						<TouchableOpacity
							style={styles.startNewButton}
							onPress={handleTryAgain}
						>
							<Text style={styles.startNewText}>{tryAgain}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.backButton}
							onPress={handleBackToHome}
						>
							<Text style={styles.backText}>{backToHome}</Text>
						</TouchableOpacity>
					</Fragment>
				) : (
					<Fragment>
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
									{mustache.render(claim, { points: trip.GOPoints || 0 })}
								</Text>
							</TouchableOpacity>
						)}
					</Fragment>
				)}
			</View>
		</SafeContainer>
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
	outerBg: {
		width: '168%',
		aspectRatio: 1,
		left: '-34%',
		marginTop: '-26%',
		borderRadius: 400,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	outerInactive: {
		backgroundColor: defaultTheme.bgGray1,
	},
	mainBg: {
		width: '72%',
		aspectRatio: 1,
		borderRadius: 400,
		backgroundColor: defaultTheme.cta20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inactive: {
		backgroundColor: defaultTheme.bgGray2,
	},
	innerBg: {
		width: '78%',
		aspectRatio: 1,
		borderRadius: 400,
		backgroundColor: defaultTheme.cta40,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	innerInactive: {
		backgroundColor: defaultTheme.bgGray3,
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
	sorryTitle: {
		fontSize: 24,
		lineHeight: 40,
		fontWeight: '600',
		color: defaultTheme.textDark100,
		textAlign: 'center',
	},
	sorryMessage: {
		fontSize: 15,
		lineHeight: 24,
		fontWeight: '500',
		color: defaultTheme.textDark70,
		textAlign: 'center',
	},
	summaryContainer: {
		position: 'absolute',
		left: 16,
		right: 16,
		bottom: 0,
		backgroundColor: defaultTheme.bgLight,
		paddingVertical: 28,
		paddingHorizontal: 32,
		borderRadius: 20,
		gap: 24,

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
	startNewButton: {
		padding: 16,
		paddingVertical: 18,
		borderRadius: 46,
		backgroundColor: defaultTheme.textDark90,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startNewText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textLight,
	},
	backButton: {
		padding: 16,
		paddingVertical: 18,
		borderRadius: 46,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textDark50,
	},
});
