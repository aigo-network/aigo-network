import type { FC } from 'react';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from 'components/BottomTab';
import HomeScreen from 'screens/Home';
import MapScreen from 'screens/Map';
import ProfileScreen from 'screens/Profile';
import RewardScreen from 'screens/Reward';
import TripHistoryScreen from 'screens/TripHistory';
import type { BottomTabParamList } from 'utils/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabStack: FC = () => {
	const screenOptions = (): BottomTabNavigationOptions => {
		return {
			headerShown: false,
			// tabBarIcon: ({focused}) => {},
		};
	};

	return (
		<Tab.Navigator
			tabBar={(props) => <BottomTab {...props} />}
			screenOptions={screenOptions}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Reward" component={RewardScreen} />
			<Tab.Screen name="Map" component={MapScreen} />
			<Tab.Screen name="TripHistory" component={TripHistoryScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabStack;
