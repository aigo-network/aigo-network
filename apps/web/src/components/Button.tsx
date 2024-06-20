import type { FC, ReactNode } from 'react';
import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

interface Props extends TouchableOpacityProps {
	children: ReactNode;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({ children, loading = false, style, ...props }) => {
	if (loading) {
		return <ActivityIndicator style={styles.loadingIndicator} />;
	} else {
		return (
			<TouchableOpacity style={[styles.container, style]} {...props}>
				{children}
			</TouchableOpacity>
		);
	}
};

export default Button;

const styles = StyleSheet.create({
	container: {
		height: 48,
		borderRadius: 12,
	},
	loadingIndicator: {
		height: 48,
	},
});
