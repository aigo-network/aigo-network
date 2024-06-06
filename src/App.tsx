import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import { ModalProvider } from 'empty-modal';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import OtpInputScreen from 'screens/Login/OtpLogin';
import PhoneLoginScreen from 'screens/Login/PhoneLogin';
import CityName from 'screens/Onboard/CityName';
import ProfileName from 'screens/Onboard/ProfileName';
import UserDescription from 'screens/Onboard/UserDescription';
import ProfileScreen from 'screens/Profile';
import SplashScreen from 'screens/Splash';
import VerifyNNIDScreen from 'screens/VerifyNNID';
import VerifyPhoneNumberScreen from 'screens/VerifyPhoneNumber';
import type { RootStackParamList } from 'utils/navigation';

import 'utils/global';
import 'utils/auth';

const Stack = createStackNavigator<RootStackParamList>();

export const AppContainer: FC = () => {
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
							<Stack.Screen name="OtpInput" component={OtpInputScreen} />
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
							<Stack.Screen name="VerifyNNID" component={VerifyNNIDScreen} />
							<Stack.Screen
								name="VerifyPhoneNumber"
								component={VerifyPhoneNumberScreen}
							/>
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ModalProvider>
		</SafeAreaProvider>
	);
};

export default AppContainer;
