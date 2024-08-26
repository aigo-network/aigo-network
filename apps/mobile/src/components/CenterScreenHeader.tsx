import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

interface Props {
	title: string;
	style?: StyleProp<ViewStyle>;
}

const CenterScreenHeader: FC<Props> = ({ title, style }) => {
	const { goBack } = useNavigation();

	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity style={styles.backButton} hitSlop={10} onPress={goBack}>
				<LeftArrowIcon color={defaultTheme.textDark90} />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
			<View style={{ flex: 1 }} />
		</View>
	);
};

export default CenterScreenHeader;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
	backButton: {
		flex: 1,
	},
});
