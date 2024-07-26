import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import type { TouchableWithoutFeedbackProps } from 'react-native';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export interface Props extends TouchableWithoutFeedbackProps {
	prefix?: ReactNode;
	suffix?: ReactNode;
	loading?: boolean;
	loadingColor?: string;
}

export const Button: FC<Props> = ({
	prefix,
	suffix,
	loading = false,
	loadingColor = '#ffffff',
	...props
}) => {
	return (
		<Fragment>
			{loading ? (
				<ActivityIndicator color={loadingColor} />
			) : (
				<TouchableOpacity {...props} style={[styles.container, props.style]}>
					{prefix}
					{props.children}
					{suffix}
				</TouchableOpacity>
			)}
		</Fragment>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
});
