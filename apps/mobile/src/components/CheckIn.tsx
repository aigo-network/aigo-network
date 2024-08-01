import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIcon from '@aigo/components/icon/AppIcon';
import Tick from '@aigo/components/icon/Tick';
import X from '@aigo/components/icon/X';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export type CheckInStatus =
	| 'checkedIn'
	| 'missed'
	| 'today'
	| 'todayCheckedIn'
	| 'next';

type Props = {
	width: number;
	status: CheckInStatus;
	dayNumber: number;
	points: number;
};

export const CheckIn: FC<Props> = ({ width, status, points, dayNumber }) => {
	const { content } = useSnapshot(appState);
	const { today } = content.screens.home.dailyCheckInSection;

	return (
		<View style={[styles.container, { width }]}>
			<View
				style={[
					styles.boxContainer,
					{ backgroundColor: colorMap[status].bg },
					status === 'today' && styles.highlight,
				]}
			>
				<Text style={[styles.checkInReward, { color: colorMap[status].text }]}>
					+ {points}
				</Text>
				{status === 'checkedIn' || status === 'todayCheckedIn' ? (
					<View
						style={[{ backgroundColor: colorMap[status].iconBg }, styles.icon]}
					>
						<Tick width={24} color={colorMap[status].icon} />
					</View>
				) : status === 'missed' ? (
					<View
						style={[{ backgroundColor: colorMap[status].iconBg }, styles.icon]}
					>
						<X width={20} color={colorMap[status].icon} />
					</View>
				) : (
					<View
						style={[styles.icon, { backgroundColor: colorMap[status].iconBg }]}
					>
						<AppIcon color={defaultTheme.textLight} width={20} />
					</View>
				)}
			</View>
			<Text style={{ textAlign: 'center', color: colorMap[status].dayText }}>
				{status === 'today' ? today : `Day ${dayNumber}`}
			</Text>
		</View>
	);
};

export default CheckIn;

const styles = StyleSheet.create({
	container: {
		gap: 4,
	},
	boxContainer: {
		padding: 10,
		gap: 4,
		borderRadius: 8,
	},
	icon: {
		width: 34,
		height: 34,
		borderRadius: 17,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	highlight: {
		borderWidth: 0.5,
		borderColor: defaultTheme.cta100,
	},
	checkInReward: {
		textAlign: 'center',
	},
});

const colorMap = {
	checkedIn: {
		bg: defaultTheme.cta10,
		iconBg: defaultTheme.cta30,
		icon: defaultTheme.textLight,
		text: defaultTheme.cta30,
		dayText: defaultTheme.cta40,
	},
	missed: {
		bg: defaultTheme.gray20,
		iconBg: defaultTheme.textDark20,
		icon: defaultTheme.textLight,
		text: defaultTheme.textDark20,
		dayText: defaultTheme.textDark20,
	},
	today: {
		bg: defaultTheme.cta12,
		iconBg: defaultTheme.cta100,
		icon: defaultTheme.textLight,
		text: defaultTheme.cta100,
		dayText: defaultTheme.cta100,
	},
	todayCheckedIn: {
		bg: defaultTheme.cta10,
		iconBg: defaultTheme.cta30,
		icon: defaultTheme.textLight,
		text: defaultTheme.cta30,
		dayText: defaultTheme.cta40,
	},
	next: {
		bg: defaultTheme.gray20,
		iconBg: defaultTheme.textDark50,
		icon: defaultTheme.textLight,
		text: defaultTheme.textDark50,
		dayText: defaultTheme.textDark20,
	},
};
