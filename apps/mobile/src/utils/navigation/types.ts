export type RootStackParamList = {
	Splash: undefined;
	Open: undefined;
	Login: undefined;
	PhoneLogin: undefined;
	OtpInput: undefined;
	OnboardName: undefined;
	OnboardDescription: undefined;
	OnboardCity: undefined;
	VerifyNNID: undefined;
	VerifyPhoneNumber: undefined;
	VerifyOTP: undefined;
	TripResult: undefined;
	BottomTab: BottomTabParamList;
};

export type BottomTabParamList = {
	Home: undefined;
	Reward: undefined;
	Map: undefined;
	TripHistory: undefined;
	Profile: undefined;
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
