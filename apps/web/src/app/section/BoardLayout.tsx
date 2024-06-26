import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { righteous } from '@/utils/style';

interface Props {
	children: ReactNode;
	title?: string;
	subTitle?: string;
	style?: StyleProp<ViewStyle>;
}

const BoardLayout: FC<Props> = ({
	children,
	title = 'Title',
	subTitle,
	style,
}) => {
	return (
		<LinearGradient
			colors={['#1e2124', '#060a0d']}
			style={[styles.container, style]}
		>
			<Text style={styles.title}>{title}</Text>
			{subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
			{children}
		</LinearGradient>
	);
};

export default BoardLayout;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	title: {
		marginTop: 32,
		alignSelf: 'center',
		color: '#fbfbfb',
		fontFamily: righteous.style.fontFamily,
		fontSize: 30,
		lineHeight: 40,
		textAlign: 'center',
	},
	subTitle: {
		marginTop: 8,
		alignSelf: 'center',
		fontSize: 12,
		fontWeight: '700',
		lineHeight: 18,
		letterSpacing: 12 * 0.06,
		color: '#707174',
		textAlign: 'center',
	},
});
