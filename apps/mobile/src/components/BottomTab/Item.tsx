import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActivityIcon from '@aigo/components/icon/Activity';
import HomeIcon from '@aigo/components/icon/Home';
import Motorbike from '@aigo/components/icon/Motorbike';
import ProfileIcon from '@aigo/components/icon/Profile';
import RewardIcon from '@aigo/components/icon/Reward';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

interface Props {
	name: string;
	isActive: boolean;
}

type ItemMap = Record<
	string,
	{
		label: string;
		Component: FC<{ width?: number; color?: string }>;
	}
>;

const iconMap: ItemMap = {
	Home: {
		label: 'Home',
		Component: HomeIcon,
	},
	Reward: {
		label: 'Reward',
		Component: RewardIcon,
	},
	Map: {
		label: 'Map',
		Component: HomeIcon,
	},
	TripHistory: {
		label: 'Activity',
		Component: ActivityIcon,
	},
	Profile: {
		label: 'Profile',
		Component: ProfileIcon,
	},
};

const BottomItem: FC<Props> = ({ name, isActive }) => {
	const { navigate, reset } = useNavigation();
	const handlePress = () => {
		navigate(name as never);
	};
	const handleNavigateMap = () => {
		reset({ routes: [{ name: 'BottomTab', params: { screen: name } }] });
	};
	const { label, Component } = iconMap[name];

	if (name === 'Map') {
		return (
			<TouchableOpacity hitSlop={extendedHitSlop} onPress={handleNavigateMap}>
				<View style={styles.container}>
					<View style={styles.mainButton}>
						<Motorbike width={28} />
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.container}>
				<Component
					width={18}
					color={isActive ? defaultTheme.textDark90 : defaultTheme.textDark40}
				/>
				<Text style={[styles.label, isActive && styles.activeLabel]}>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default BottomItem;

const extendedHitSlop = {
	top: 40, 
	bottom: 8,
	left: 8, 
	right: 8,
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		paddingTop: 12,
		gap: 4,
	},
	label: {
		fontSize: 10,
		fontWeight: '700',
		color: defaultTheme.textDark40,
	},
	activeLabel: {
		color: defaultTheme.textDark90,
	},
	mainButton: {
		width: 64,
		height: 64,
		backgroundColor: defaultTheme.cta100,
		transform: [{ translateY: -44 }],
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
