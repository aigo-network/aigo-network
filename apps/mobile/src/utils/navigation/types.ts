export type RootStackParamList = {
	Splash: undefined;
	Open: undefined;
	Login: undefined;
	PhoneLogin: undefined;
	OtpInput: undefined;
	OnboardName: undefined;
	OnboardDescription: undefined;
	OnboardCity: undefined;
	Home: undefined;
	Profile: undefined;
	VerifyNNID: undefined;
	VerifyPhoneNumber: undefined;
	VerifyOTP: undefined;
	Map: undefined;
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
