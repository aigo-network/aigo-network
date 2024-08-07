import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import HomeScreen from 'screens/Home';
import MapScreen from 'screens/Map';
import ProfileScreen from 'screens/Profile';
import TripHistoryScreen from 'screens/TripHistory';
import type { BottomTabParamList } from 'utils/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface ScreenOptionsProps {
	route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
}

const BottomTab: FC = () => {
	const screenOptions = ({
		route,
	}: ScreenOptionsProps): BottomTabNavigationOptions => {
		const tabBarStyle: StyleProp<ViewStyle> = {};
		if (route.name == 'Map') {
			tabBarStyle['height'] = 0;
		}
		return {
			headerShown: false,
			tabBarStyle,
		};
	};

	return (
		<Tab.Navigator screenOptions={screenOptions}>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Reward" component={HomeScreen} />
			<Tab.Screen name="Map" component={MapScreen} />
			<Tab.Screen name="TripHistory" component={TripHistoryScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default BottomTab;
