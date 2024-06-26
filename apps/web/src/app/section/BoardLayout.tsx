import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

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
		<View style={[styles.container, style]}>
			<Text style={styles.title}>{title}</Text>
			{subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
			{children}
		</View>
	);
};

export default BoardLayout;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#0a0a0a',
		borderWidth: 1,
		borderColor: '#363636',
		shadowColor: 'rgba(82, 199, 238, 0.3)',
		shadowRadius: 15,
		elevation: 6,
	},
	title: {
		marginTop: 32,
		alignSelf: 'center',
		color: '#fbfbfb',
		fontFamily: righteous.style.fontFamily,
		fontSize: 30,
		lineHeight: 28,
		textAlign: 'center',
	},
	subTitle: {
		marginTop: 8,
		alignSelf: 'center',
		fontSize: 18,
		lineHeight: 28,
		color: 'rgba(251, 251, 251, 0.5)',
		textAlign: 'center',
	},
});
