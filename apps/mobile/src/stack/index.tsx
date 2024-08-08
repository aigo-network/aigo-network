import type { FC } from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from 'screens/Login';
import OTPLoginScreen from 'screens/Login/OTPLogin';
import PhoneLoginScreen from 'screens/Login/PhoneLogin';
import CityName from 'screens/Onboard/CityName';
import ProfileName from 'screens/Onboard/ProfileName';
import UserDescription from 'screens/Onboard/UserDescription';
import SplashScreen from 'screens/Splash';
import TripResultScreen from 'screens/TripResult';
import VerifyNNIDScreen from 'screens/VerifyNNID';
import VerifyOTPScreen from 'screens/VerifyOTP';
import VerifyPhoneNumberScreen from 'screens/VerifyPhoneNumber';
import type { RootStackParamList } from 'utils/navigation';

import BottomTabStack from './BottomTab';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationStack: FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animationEnabled: true,
			}}
		>
			<Stack.Screen
				name="Splash"
				component={SplashScreen}
				options={{
					cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
				}}
			/>

			<Stack.Group>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
					}}
				/>
				<Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
				<Stack.Screen name="OtpInput" component={OTPLoginScreen} />
			</Stack.Group>

			<Stack.Group screenOptions={{ headerShown: false }}>
				<Stack.Screen name="OnboardName" component={ProfileName} />
				<Stack.Screen name="OnboardDescription" component={UserDescription} />
				<Stack.Screen name="OnboardCity" component={CityName} />
			</Stack.Group>

			<Stack.Group screenOptions={{ headerShown: false }}>
				<Stack.Screen name="VerifyNNID" component={VerifyNNIDScreen} />
				<Stack.Screen
					name="VerifyPhoneNumber"
					component={VerifyPhoneNumberScreen}
				/>
				<Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
				<Stack.Screen name="TripResult" component={TripResultScreen} />
				<Stack.Screen
					name="BottomTab"
					component={BottomTabStack}
					options={{
						cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
};

export default ApplicationStack;
