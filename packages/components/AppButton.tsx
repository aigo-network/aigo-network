import type { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import type { Props as OriginalButtonProps } from './Button';
import Button from './Button';

type Props = OriginalButtonProps & {
	title: string;
};

export const AppButton: FC<Props> = ({ title, ...props }) => {
	return (
		<Button style={styles.container} {...props}>
			<Text style={styles.title}>{title}</Text>
		</Button>
	);
};

export default AppButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#714CFE',
		paddingVertical: 12,
		borderRadius: 50,
	},
	title: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 24,
		textAlign: 'center',
	},
});
