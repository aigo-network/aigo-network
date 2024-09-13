import type { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ModalProvider } from 'empty-modal';
import { useAppConfigure } from 'utils/hooks/app';
import { useDeepLinkHandler } from 'utils/hooks/deeplink';
import { useNavigationConfig } from 'utils/hooks/navigation';
import { useNotifications } from 'utils/hooks/notification';
import { linking } from 'utils/navigation';
import { navigationRef } from 'utils/navigation';

import 'utils/shim';
import 'utils/global';
import 'utils/auth';
import 'utils/mapbox';
import 'utils/geolocation';
import 'utils/errors';

import ApplicationStack from './stack';

if (__DEV__) {
	require('../ReactotronConfig');
}

export const AppContainer: FC = () => {
	const { onNavigationReady, onNavigationStateChange } = useNavigationConfig();
	useAppConfigure();
	useNotifications();
	useDeepLinkHandler();
	// useAppState(handleAppStateChangeForBackgroundGPS);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView>
				<ModalProvider>
					<NavigationContainer
						linking={linking}
						ref={navigationRef}
						onReady={onNavigationReady}
						onStateChange={onNavigationStateChange}
					>
						<ApplicationStack />
					</NavigationContainer>
				</ModalProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

export default AppContainer;
