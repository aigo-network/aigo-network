import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from 'screens/Login';
import ProfileName from 'screens/Onboard/ProfileName';

const Stack = createStackNavigator();

export const AppContainer: FC = () => {
	const { signedIn } = useSnapshot(appState);

	return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    animationEnabled: true,
                }}>
					<Stack.Group>
					{
						!signedIn ? (
							<Stack.Screen name='Login' component={LoginScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter}} />
						) : (
							<Stack.Group screenOptions={{headerShown: false}}>
								<Stack.Screen name='OnboardName' component={ProfileName} />
							</Stack.Group>
						)
					}
					</Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
	);
};

export default AppContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
