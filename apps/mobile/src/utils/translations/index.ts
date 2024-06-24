import en from './en.json';
import kr from './kr.json';

export const translations: Record<LangKey, Content> = { en, kr };

export type LangKey = 'en' | 'kr';

export type Content = {
	language: string;
	modal: {
		yes: string;
		no: string;
		cancel: string;
		confirm: string;
		confirmLogOutMessage: string;
		confirmDeleteAccountMessage: string;
		invite: {
			title: string;
			description: string;
			referral: string;
			message: string;
			codeTitle: string;
			shareButton: string;
		};
		earnPoints: {
			messagePrefix: string;
			completedOnboardingMessage: string;
		};
		citySelection: {
			title: string;
			placeholder: string;
			cancelButton: string;
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
			phoneNumberLogin: {
				login: string;
				subText: string;
				continueButton: string;
			};
			otpConfirm: {
				enterCode: string;
				subText: string;
				verifyButton: string;
				wrongCodeError: string;
				getCredentialsError: string;
				getProfileError: string;
			};
		};
		onboard: {
			name: {
				title: string;
				description: string;
				continueButton: string;
				inputPlaceholder: string;
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
				checkInDay: string;
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
				phoneNumberVerified: string;
				phoneNumberUnverified: string;
				NyamNyamIdVerified: string;
				NyamNyamIdUnverified: string;
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
			inputPlaceholder: string;
			continueButton: string;
		};
		phoneNumberVerify: {
			title: string;
			subText: string;
			continueButton: string;
			OTP: {
				title: string;
				subText: string;
				verifyButton: string;
				wrongCodeError: string;
				linkAccountError: string;
				updateAccountError: string;
				updateVerificationError: string;
			};
		};
	};
};
