import { type FC, useEffect, useState } from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

interface Props {
	date: Date;
	style?: StyleProp<TextStyle>;
}

const CountDown: FC<Props> = ({ date, style }) => {
	const [timeLeft, setTimeLeft] = useState({
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
	});
	const getTimeLeft = (date: Date) => {
		const timeLeft = date.getTime() - Date.now();
		const totalSeconds = Math.floor(timeLeft / 1000);
		const second = totalSeconds % 60;
		const totalMinutes = Math.floor(totalSeconds / 60);
		const minute = totalMinutes % 60;
		const totalHours = Math.floor(totalMinutes / 60);
		const hour = totalHours % 60;
		const day = Math.floor(totalHours / 24);
		return { day, hour, minute, second };
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft(date));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Text
			style={[styles.container, style]}
		>{`${timeLeft.day.toString().padStart(2, '0')}D : ${timeLeft.hour.toString().padStart(2, '0')}H : ${timeLeft.minute.toString().padStart(2, '0')}M : ${timeLeft.second.toString().padStart(2, '0')}S`}</Text>
	);
};

export default CountDown;

const styles = StyleSheet.create({
	container: {
		textAlign: 'center',
	},
});
