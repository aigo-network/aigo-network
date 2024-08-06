import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import { defaultTheme } from 'utils/global';
import { navigationRef } from 'utils/navigation';

type Props = {
	onPress?: () => void;
};

export const GoBack: FC<Props> = ({ onPress }) => {
	const handlePressGoBack = () => {
		navigationRef.navigate('Home');
		onPress?.();
	};

	return (
		<View style={styles.backContainer}>
			<TouchableOpacity style={styles.backButton} onPress={handlePressGoBack}>
				<LeftArrowIcon color={defaultTheme.textDark100} width={16} />
			</TouchableOpacity>
		</View>
	);
};

export default GoBack;

const styles = StyleSheet.create({
	backContainer: {
		position: 'absolute',
		top: 70,
		left: 16,
	},
	backButton: {
		backgroundColor: defaultTheme.bgLight,
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
