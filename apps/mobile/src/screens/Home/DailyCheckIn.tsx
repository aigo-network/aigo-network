import { useMemo, useRef, useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { DailyCheckIn as DailyCheckInType } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import { config } from '@aigo/config';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import type { CheckInStatus } from 'components/CheckIn';
import CheckIn from 'components/CheckIn';
import { appActions, appState } from 'state/app';
import { getThisWeekMonday } from 'utils/datetime';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import { sharedStyles, showCheckInPoint } from './shared';

const DAYS_PER_WEEK = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const DailyCheckIn = () => {
	const scrollViewRef = useRef<ScrollView>(null);
	const [loading, setLoading] = useState(false);
	const { content, appUser } = useSnapshot(appState);
	const homeContent = content.screens.home;
	const todayCheckIn = appUser?.dailyMissions?.checkIn;
	const points = config.activity.DailyCheckIn.points;

	const latest7DaysCheckIns: (DailyCheckInType | null)[] = useMemo(() => {
		const thisWeekMonday = getThisWeekMonday();
		const checkIns = [
			...(appUser?.dailyMissions?.latest7DaysCheckIn || []),
		].filter((checkin) => {
			const checkInDay = Math.floor(
				new Date(checkin?.date).getTime() / MS_PER_DAY,
			);
			return checkInDay >= Math.floor(thisWeekMonday.getTime() / MS_PER_DAY);
		});
		const mergedCheckIns: (DailyCheckInType | null)[] = Array.from(
			{ length: DAYS_PER_WEEK },
			(_, index) => ({
				completed: false,
				date: new Date(
					thisWeekMonday.setDate(thisWeekMonday.getDate() + index),
				),
			}),
		);

		// mock today check-in if no today checkedIn found
		if (
			checkIns.length > 0 &&
			checkIns[checkIns.length - 1]?.date !== todayCheckIn?.date
		) {
			if (todayCheckIn) checkIns.push(todayCheckIn);
		}

		for (let i = 0; i < checkIns.length; i++) {
			const indexFromMonday =
				new Date(checkIns[i]?.date).getDay() -
				(thisWeekMonday.getDay() as never);
			mergedCheckIns[indexFromMonday] = checkIns[i];
			if (i === checkIns.length - 1) break;
		}

		const currentDateIndex = mergedCheckIns.findIndex((mergedCheckIn) => {
			const checkInDay = Math.floor(
				new Date(mergedCheckIn?.date).getTime() / MS_PER_DAY,
			);
			const today = Math.floor(new Date().getTime() / MS_PER_DAY);
			return checkInDay === today;
		});
		scrollViewRef.current?.scrollTo({
			x: currentDateIndex * (checkInWidth + 4),
		});

		return mergedCheckIns;
	}, [appUser?.dailyMissions?.checkIn]);

	const handleCheckIn = async () => {
		try {
			setLoading(true);
			const { checkIn } = await graphqlClient.checkIn();
			const { user } = await graphqlClient.getUserWitDailyMissions();
			if (user) appActions.setAppUser(user);
			if (checkIn) appActions.updateCheckIn(checkIn);
			if (checkIn?.completed) showCheckInPoint();
			analytics().logEvent('daily_check_in');
		} catch (error) {
			crashlytics().recordError(error as Error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>
					{homeContent.dailyCheckInSection.title}
				</Text>
			</View>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				snapToInterval={checkInWidth + 4}
				style={styles.checkInsContainer}
				contentContainerStyle={styles.checkInsContentContainer}
				showsHorizontalScrollIndicator={false}
			>
				{latest7DaysCheckIns.map((c, i) => {
					let status: CheckInStatus = 'next';
					if (c) {
						if (c.date === todayCheckIn?.date) {
							if (c.completed) {
								status = 'todayCheckedIn';
							} else {
								status = 'today';
							}
						} else if (!c.completed) status = 'missed';
						else status = 'checkedIn';
					}

					return (
						<CheckIn
							key={i}
							points={points}
							width={checkInWidth}
							status={status}
							dayNumber={i + 1}
						/>
					);
				})}
			</ScrollView>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
			) : (
				<TouchableOpacity
					style={[
						styles.checkInButton,
						todayCheckIn?.completed && styles.disableCheckInButton,
					]}
					onPress={handleCheckIn}
					disabled={!!todayCheckIn?.completed}
					hitSlop={14}
				>
					<Text style={styles.buttonTitle}>
						{homeContent.dailyCheckInSection.checkInButton}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default DailyCheckIn;

const checkInWidth = 66;
const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	loadingContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkInsContainer: {
		flexDirection: 'row',
	},
	checkInsContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	checkInButton: {
		padding: 8,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: defaultTheme.cta100,
		alignItems: 'center',
	},
	disableCheckInButton: {
		backgroundColor: defaultTheme.textDark20,
	},
	buttonTitle: {
		fontSize: 13,
	},
});
