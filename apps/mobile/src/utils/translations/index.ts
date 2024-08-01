import en from './en.json';
import kr from './kr.json';
import vn from './vn.json';

export const translations: Record<LangKey, Content> = { en, kr, vn };

export type LangKey = 'en' | 'kr' | 'vn';

export type Content = {
	language: string;
	modal: {
		yes: string;
		no: string;
		cancel: string;
		confirm: string;
		confirmLogOutTitle: string;
		confirmLogOutMessage: string;
		confirmDeleteAccountTitle: string;
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
			title: string;
			messagePrefix: string;
			messageSuffix: string;
			completedOnboardingMessage: string;
		};
		citySelection: {
			title: string;
			placeholder: string;
			cancelButton: string;
		};
		startTripBottomSheet: {
			title: string;
			userTypeTitle: string;
			userTypes: string[];
			purposeTitle: string;
			purposes: string[];
			startButton: string;
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
			tripSummary: {
				title: string;
				infoTitle: {
					distance: string;
					time: string;
				};
				infoUnit: {
					distance: string;
					time: string;
					avgSpeed: string;
				};
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
			mainButton: string;
		};
		tripHistory: {
			title: string;
			loadingLocation: string;
			unknownLocation: string;
			infoUnit: {
				km: string;
				time: string;
				avgSpeed: string;
			};
		};
		tripResult: {
			pointsTitle: string;
			infoTitles: {
				distance: string;
				duration: string;
				avgSpeed: string;
			};
			infoUnits: {
				km: string;
				time: string;
				speed: string;
			};
			claim: string;
			startNewTrip: string;
			backToHome: string;
		};
		map: {
			tripUnit: {
				distance: string;
				time: string;
				speed: string;
			};
			startButton: string;
			endButton: string;
			confirmEnd: {
				title: string;
				confirm: string;
				cancel: string;
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
