export * from './deeplink';
export * from './linking';
import { createNavigationContainerRef } from '@react-navigation/native';

import type { RootStackParamList } from './linking';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
