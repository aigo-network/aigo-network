import { ScrollView, StyleSheet, View } from 'react-native';
import SafeContainer from '@aigo/components/SafeContainer';
import ScreenHeader from 'components/ScreenHeader';
import { defaultTheme } from 'utils/global';

export const TripHistoryScreen = () => {
	return (
		<View style={styles.container}>
			<SafeContainer>
				<ScreenHeader title="Trip History" />
				<ScrollView
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
				></ScrollView>
			</SafeContainer>
		</View>
	);
};

export default TripHistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: defaultTheme.bgLight,
	},
	scrollContainer: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
});
