import { useRef } from 'react';
import analytics from '@react-native-firebase/analytics';
import { useDebouncedCallback } from 'use-debounce';
import { navigationRef } from 'utils/navigation';

export const useNavigationConfig = () => {
	const routeNameRef = useRef<string>();

	const onNavigationReady = () => {
		routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
	};

	const onNavigationStateChange = useDebouncedCallback(async () => {
		const previousRouteName = routeNameRef.current;
		const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

		if (previousRouteName !== currentRouteName) {
			await analytics().logScreenView({
				screen_name: currentRouteName,
				screen_class: currentRouteName,
			});
		}

		routeNameRef.current = currentRouteName;
	}, 200);

	return {
		onNavigationReady,
		onNavigationStateChange,
	};
};
