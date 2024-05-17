import { UserDescription } from 'api/graphql';

export type Onboarding = {
	name: string;
	city: string;
	descriptions: UserDescription[];
};

export const userDescriptions = [
	{
		label: 'Nyam Nyam Driver',
		value: UserDescription.NyamNyamDriver,
	},
	{
		label: 'City Explorer',
		value: UserDescription.CityExplorer,
	},
	{
		label: 'Fitness Enthusiast',
		value: UserDescription.FitnessEnthusiast,
	},
	{
		label: 'Commuter',
		value: UserDescription.Commuter,
	},
	{
		label: 'Traveler',
		value: UserDescription.Traveler,
	},
	{
		label: 'Casual user',
		value: UserDescription.CasualUser,
	},
];
