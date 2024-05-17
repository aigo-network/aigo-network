import type { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from 'screens/Login';
import CityName from 'screens/Onboard/CityName';
import ProfileName from 'screens/Onboard/ProfileName';
import UserDescription from 'screens/Onboard/UserDescription';
import { appState } from 'state/app';
import type { RootParamList } from 'utils/navigation';
import { useSnapshot } from 'valtio';

import 'utils/global';

const Stack = createStackNavigator<RootParamList>();

export const AppContainer: FC = () => {
	const { signedIn } = useSnapshot(appState);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						animationEnabled: true,
					}}
				>
					{!signedIn ? (
						<Stack.Screen
							name="Login"
							component={LoginScreen}
							options={{
								cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
							}}
						/>
					) : (
						<Stack.Group screenOptions={{ headerShown: false }}>
							<Stack.Screen name="OnboardName" component={ProfileName} />
							<Stack.Screen
								name="OnboardDescription"
								component={UserDescription}
							/>
							<Stack.Screen name="OnboardCity" component={CityName} />
						</Stack.Group>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default AppContainer;
