import { UserDescription } from 'api/graphql';

import { appState } from './shared';

export type Onboarding = {
	name: string;
	city: string;
	descriptions: UserDescription[];
};

export const userDescriptions = () => {
	const descriptions =
		appState.content.screens.onboard.userDescriptions.descriptions;

	return [
		{
			label: descriptions.NyamNyamDriver,
			value: UserDescription.NyamNyamDriver,
		},
		{
			label: descriptions.CityExplorer,
			value: UserDescription.CityExplorer,
		},
		{
			label: descriptions.FitnessEnthusiast,
			value: UserDescription.FitnessEnthusiast,
		},
		{
			label: descriptions.Commuter,
			value: UserDescription.Commuter,
		},
		{
			label: descriptions.Traveler,
			value: UserDescription.Traveler,
		},
		{
			label: descriptions.CasualUser,
			value: UserDescription.CasualUser,
		},
	];
};
