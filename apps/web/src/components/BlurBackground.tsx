import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';

interface Props {
	children: ReactNode;
	style?: ViewStyle;
}

const BlurBackground: FC<Props> = ({ children, style }) => {
	return (
		<ImageBackground style={[styles.container, style]} blurRadius={128}>
			{children}
		</ImageBackground>
	);
};

export default BlurBackground;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
		width: '100%',
		height: '100%',
	},
});
