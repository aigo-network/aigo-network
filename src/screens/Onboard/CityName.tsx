import { View } from 'react-native';

import OnboardLayout from './OnboardLayout';

export const CityName = () => {
	return (
		<OnboardLayout
			disabled
			onPress={() => {}}
			title="Name your city"
			subTitle="Mark yourself in your city to connect with pals"
			screenOrder={3}
		>
			<View></View>
		</OnboardLayout>
	);
};

export default CityName;
