import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import ModalProvider from 'components/Modal/Provider';
import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import CityName from 'screens/Onboard/CityName';
import ProfileName from 'screens/Onboard/ProfileName';
import UserDescription from 'screens/Onboard/UserDescription';
import ProfileScreen from 'screens/Profile';
import SplashScreen from 'screens/Splash';
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
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
							}}
						/>
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
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ModalProvider>
		</SafeAreaProvider>
	);
};

export default AppContainer;
