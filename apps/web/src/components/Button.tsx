import type { FC, ReactNode } from 'react';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props extends TouchableOpacityProps {
	children: ReactNode;
	style?: ViewStyle;
}

const Button: FC<Props> = ({ children, style, ...props }) => {
	return (
		<TouchableOpacity style={[styles.container, style]} {...props}>
			{children}
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		height: 48,
		borderRadius: 12,
	},
});
