import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

type Props = {
	title?: string;
};

export const ScreenHeader: FC<Props> = ({ title }) => {
	const { goBack } = useNavigation();

	return (
		<View style={styles.titleContainer}>
			<TouchableOpacity style={styles.backButton} hitSlop={14} onPress={goBack}>
				<LeftArrowIcon color={defaultTheme.textDark90} width={16} />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

export default ScreenHeader;

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: defaultTheme.textDark90,
	},
	backButton: {
		padding: 10,
	},
});
