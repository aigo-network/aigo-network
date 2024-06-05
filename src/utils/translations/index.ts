import en from './en.json';
import kr from './kr.json';

export const translations: Record<LangKey, Content> = { en, kr };

export type LangKey = 'en' | 'kr';

export type Content = {
	language: string;
	modal: {
		yes: string;
		no: string;
		confirmLogOutMessage: string;
		confirmDeleteAccountMessage: string;
		invite: {
			title: string;
			description: string;
			referral: string;
			messagePrefix: string;
			messageSuffix: string;
			codeTitle: string;
			shareButton: string;
		};
		earnPoints: {
			messagePrefix: string;
			completedOnboardingMessage: string;
		};
	};
	screens: {
		splash: {
			versionPrefix: string;
		};
		logIn: {
			welcome: string;
			slogan: string;
			phoneNumberButton: string;
			appleButton: string;
			googleButton: string;
			versionPrefix: string;
		};
		onboard: {
			name: {
				title: string;
				description: string;
				continueButton: string;
			};
			city: {
				title: string;
				description: string;
				continueButton: string;
				searchPlaceholder: string;
				emptySearchTitle: string;
				emptySearchMessage: string;
			};
			userDescriptions: {
				title: string;
				description: string;
				continueButton: string;
				descriptions: {
					NyamNyamDriver: string;
					CityExplorer: string;
					FitnessEnthusiast: string;
					Commuter: string;
					Traveler: string;
					CasualUser: string;
				};
			};
			updateProfileError: string;
		};
		home: {
			headerSection: {
				welcomePrefix: string;
				balanceTitle: string;
			};
			socialSection: {
				title: string;
				followTwitterButton: string;
				joinTelegramButton: string;
			};
			inviteSection: {
				title: string;
				referral: string;
				referralCountSuffix: string;
				descriptionPrefix: string;
				descriptionSuffix: string;
				inviteButton: string;
			};
			dailyCheckInSection: {
				title: string;
				checkInButton: string;
			};
		};
		profile: {
			title: string;
			unknownUsername: string;
			totalBalanceTitle: string;
			viewHistoryButton: string;
			infoTitle: {
				account: string;
				name: string;
				email: string;
				city: string;
				descriptions: string;
				phoneNumber: string;
			};
			defaultInfo: {
				name: string;
				email: string;
				city: string;
				description: string;
				phoneNumber: string;
			};
			partnerSection: {
				partner: string;
				partnerName: string;
				descriptionPrefix: string;
				reward: string;
				descriptionSuffix: string;
			};
			settingSection: {
				setting: string;
				language: string;
			};
			referralSection: {
				title: string;
				descriptionPrefix: string;
				descriptionSuffix: string;
				enterCodePlaceholder: string;
				invalidCodeError: string;
				verifyButton: string;
			};
			footerSection: {
				title: string;
				logOutButton: string;
				deleteAccountButton: string;
				versionPrefix: string;
			};
		};
		nnidVerify: {
			title: string;
			enterNNID: string;
			subText: string;
			errorMessage: string;
		};
	};
};
