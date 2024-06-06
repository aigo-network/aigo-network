import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export let confirmation: FirebaseAuthTypes.ConfirmationResult;

export const setConfirmation = (
	confirmationResult: FirebaseAuthTypes.ConfirmationResult,
) => {
	confirmation = confirmationResult;
};
