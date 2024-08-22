import type { RewardInfo, RewardInstance } from '@aigo/api/sdk';
import type { ParamListBase } from '@react-navigation/native';

export enum RewardStatus {
	ACTIVE = 'Active',
	USED = 'Used',
	EXPIRED = 'Expired',
}

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
	BottomTab: SubNavigator<BottomTabParamList>;
	RewardDetail:
		| {
				redeemed?: boolean;
				status?: RewardStatus;
				rewardInfoId: RewardInfo['id'];
				rewardId?: RewardInstance['id'];
		  }
		| undefined;
	MyRewards: undefined;
	RewardsBalance: undefined;
};

export type BottomTabParamList = {
	Home: undefined;
	Reward: undefined;
	Map: undefined;
	TripHistory: undefined;
	Profile: undefined;
};

type SubNavigator<T extends ParamListBase> = {
	[K in keyof T]: { screen: K; params?: T[K] };
}[keyof T];

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
