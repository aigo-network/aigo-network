import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export let phoneAuthConfirmation: FirebaseAuthTypes.PhoneAuthSnapshot;

export const setPhoneAuthConfirmation = (
	confirmation: FirebaseAuthTypes.PhoneAuthSnapshot,
) => {
	phoneAuthConfirmation = confirmation;
};
