import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type SignInFunction = () => Promise<FirebaseAuthTypes.User | undefined>;
