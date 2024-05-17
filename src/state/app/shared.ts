import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { proxy } from 'valtio';

interface AppState {
	counter: number;
	signedIn: boolean;
	user?: FirebaseAuthTypes.User;
	profileName: string;
}

export const appState = proxy<AppState>({
	counter: 0,
	signedIn: false,
	user: undefined,
	profileName: '',
});
