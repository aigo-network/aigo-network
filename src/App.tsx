import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appState, appActions } from 'state/app';
import { useSnapshot } from 'valtio';
import AnimatedBox from 'components/AnimatedBox';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from 'screens/Login';

const Stack = createStackNavigator();

export const AppContainer: FC = () => {
	const { counter } = useSnapshot(appState)

	return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    animationEnabled: true,
                }}>

                    <Stack.Screen name='Login' component={LoginScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter}} />
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
