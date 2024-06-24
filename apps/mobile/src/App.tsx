import { type FC, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import { ModalProvider } from 'empty-modal';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import OtpLoginScreen from 'screens/Login/OTPLogin';
import PhoneLoginScreen from 'screens/Login/PhoneLogin';
import MapScreen from 'screens/Map';
import CityName from 'screens/Onboard/CityName';
import ProfileName from 'screens/Onboard/ProfileName';
import UserDescription from 'screens/Onboard/UserDescription';
import ProfileScreen from 'screens/Profile';
import SplashScreen from 'screens/Splash';
import VerifyNNIDScreen from 'screens/VerifyNNID';
import VerifyOTPScreen from 'screens/VerifyOTP';
import VerifyPhoneNumberScreen from 'screens/VerifyPhoneNumber';
import type { RootStackParamList } from 'utils/navigation';

import 'utils/global';
import 'utils/auth';

const Stack = createStackNavigator<RootStackParamList>();

export const AppContainer: FC = () => {
	useEffect(() => {
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent');
			StatusBar.setTranslucent(true);
		}
	}, []);

	return (
		<SafeAreaProvider>
			<ModalProvider>
				<NavigationContainer>
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
									cardStyleInterpolator:
										CardStyleInterpolators.forFadeFromCenter,
								}}
							/>
							<Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
							<Stack.Screen name="OtpInput" component={OtpLoginScreen} />
						</Stack.Group>
						<Stack.Group screenOptions={{ headerShown: false }}>
							<Stack.Screen name="OnboardName" component={ProfileName} />
							<Stack.Screen
								name="OnboardDescription"
								component={UserDescription}
							/>
							<Stack.Screen name="OnboardCity" component={CityName} />
						</Stack.Group>

						<Stack.Group screenOptions={{ headerShown: false }}>
							<Stack.Screen name="Home" component={HomeScreen} />
							<Stack.Screen name="Profile" component={ProfileScreen} />
							<Stack.Screen name="Map" component={MapScreen} />
							<Stack.Screen name="VerifyNNID" component={VerifyNNIDScreen} />
							<Stack.Screen
								name="VerifyPhoneNumber"
								component={VerifyPhoneNumberScreen}
							/>
							<Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ModalProvider>
		</SafeAreaProvider>
	);
};

export default AppContainer;
