import type { FC } from 'react';
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Mask, Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

interface Props {
	active: boolean;
}

const Item: FC<Props> = ({ active }) => {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity
			onPress={() => {
				if (active) {
					navigate('RewardDetail', { redeemed: true });
				}
			}}
		>
			<View style={styles.container}>
				<Svg
					style={{ position: 'absolute' }}
					width="100%"
					height="100%"
					viewBox="0 0 343 112"
					fill="none"
				>
					<Mask id="path-1-inside-1_1063_93" fill="white">
						<Path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M20 0C8.9543 0 0 8.9543 0 20V92C0 103.046 8.9543 112 20 112H323C334.046 112 343 103.046 343 92V20C343 8.95431 334.046 0 323 0H104C104 1.5913 103.157 3.11742 101.657 4.24264C100.157 5.36786 98.1217 6 96 6C93.8783 6 91.8434 5.36786 90.3431 4.24264C88.8429 3.11742 88 1.5913 88 0H20ZM104 112C104 110.409 103.157 108.883 101.657 107.757C100.157 106.632 98.1217 106 96 106C93.8783 106 91.8434 106.632 90.3431 107.757C88.8429 108.883 88 110.409 88 112H96H104Z"
						/>
					</Mask>
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M20 0C8.9543 0 0 8.9543 0 20V92C0 103.046 8.9543 112 20 112H323C334.046 112 343 103.046 343 92V20C343 8.95431 334.046 0 323 0H104C104 1.5913 103.157 3.11742 101.657 4.24264C100.157 5.36786 98.1217 6 96 6C93.8783 6 91.8434 5.36786 90.3431 4.24264C88.8429 3.11742 88 1.5913 88 0H20ZM104 112C104 110.409 103.157 108.883 101.657 107.757C100.157 106.632 98.1217 106 96 106C93.8783 106 91.8434 106.632 90.3431 107.757C88.8429 108.883 88 110.409 88 112H96H104Z"
						fill="white"
					/>

					{Platform.OS === 'android' && (
						<Path
							d="M104 0V-1H103V0H104ZM101.657 4.24264L101.057 3.44264L101.057 3.44264L101.657 4.24264ZM96 6L96 5L96 6ZM88 0H89V-1H88V0ZM101.657 107.757L101.057 108.557L101.057 108.557L101.657 107.757ZM104 112V113H105V112H104ZM90.3431 107.757L90.9431 108.557L90.9431 108.557L90.3431 107.757ZM88 112H87V113H88V112ZM1 20C1 9.50659 9.50659 1 20 1V-1C8.40202 -1 -1 8.40202 -1 20H1ZM1 92V20H-1V92H1ZM20 111C9.50658 111 1 102.493 1 92H-1C-1 103.598 8.40201 113 20 113V111ZM323 111H20V113H323V111ZM342 92C342 102.493 333.493 111 323 111V113C334.598 113 344 103.598 344 92H342ZM342 20V92H344V20H342ZM323 1C333.493 1 342 9.50659 342 20H344C344 8.40202 334.598 -1 323 -1V1ZM104 1H323V-1H104V1ZM102.257 5.04264C103.958 3.76668 105 1.96458 105 0H103C103 1.21801 102.356 2.46816 101.057 3.44264L102.257 5.04264ZM96 7C98.3083 7 100.561 6.31447 102.257 5.04264L101.057 3.44264C99.752 4.42125 97.9351 5 96 5L96 7ZM89.7431 5.04264C91.4389 6.31447 93.6917 7 96 7L96 5C94.0649 5 92.248 4.42125 90.9431 3.44264L89.7431 5.04264ZM87 0C87 1.96458 88.0419 3.76668 89.7431 5.04264L90.9431 3.44264C89.6438 2.46816 89 1.21802 89 0H87ZM20 1H88V-1H20V1ZM101.057 108.557C102.356 109.532 103 110.782 103 112H105C105 110.035 103.958 108.233 102.257 106.957L101.057 108.557ZM96 107C97.9351 107 99.752 107.579 101.057 108.557L102.257 106.957C100.561 105.686 98.3083 105 96 105V107ZM90.9431 108.557C92.248 107.579 94.0649 107 96 107V105C93.6917 105 91.4389 105.686 89.7431 106.957L90.9431 108.557ZM89 112C89 110.782 89.6438 109.532 90.9431 108.557L89.7431 106.957C88.0419 108.233 87 110.035 87 112H89ZM96 111H88V113H96V111ZM104 111H96V113H104V111Z"
							fill={defaultTheme.textDark10}
							mask="url(#path-1-inside-1_1063_93)"
						/>
					)}
					<Path
						d="M96 24L96 88"
						stroke="black"
						strokeOpacity="0.2"
						strokeDasharray="4 4"
					/>
				</Svg>

				<View style={styles.contentContainer}>
					<View
						style={[
							styles.brandImageContainer,
							!active && styles.inactiveStyle,
						]}
					>
						<View style={{ position: 'relative' }}>
							<Image
								width={48}
								height={48}
								source={{ uri: 'https://picsum.photos/48/48' }}
							/>
						</View>
					</View>

					<View style={[styles.infoContainer, !active && styles.inactiveStyle]}>
						<Text style={styles.name}>
							Baskin Robbins Space Like Bonbon Blast
						</Text>
						<View style={styles.infoBelowContainer}>
							<Text style={styles.date}>Expire on 29 Aug 2014</Text>

							{active ? (
								<TouchableOpacity hitSlop={10}>
									<Text style={styles.buttonText}>Mark as used</Text>
								</TouchableOpacity>
							) : (
								<Text style={styles.inactiveText}>Used</Text>
							)}
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		aspectRatio: 343 / 112,
		shadowColor: '#303030',
		shadowRadius: 10,
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 5,
		},
	},
	contentContainer: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	brandImageContainer: {
		aspectRatio: 96 / 112,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		aspectRatio: 247 / 112,
		height: '100%',
		paddingVertical: 16,
		paddingHorizontal: 12,
		justifyContent: 'space-between',
	},
	name: {
		lineHeight: 20,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	infoBelowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	date: {
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: -0.3,
		color: defaultTheme.textDark70,
	},
	buttonText: {
		fontSize: 13,
		lineHeight: 15,
		fontWeight: '700',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	inactiveStyle: {
		opacity: 0.5,
	},
	inactiveText: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: '500',
		letterSpacing: -0.3,
		color: defaultTheme.textDark30,
	},
});
