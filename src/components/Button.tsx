import type { FC, ReactNode } from 'react';
import type { TouchableWithoutFeedbackProps } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props extends TouchableWithoutFeedbackProps {
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const Button: FC<Props> = ({ prefix, suffix, ...props }) => {
	return (
		<TouchableOpacity {...props} style={[styles.container, props.style]}>
			{prefix}
			{props.children}
			{suffix}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
});
