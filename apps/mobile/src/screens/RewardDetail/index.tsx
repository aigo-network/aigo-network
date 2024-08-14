import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

const brandImageSize = 48;

const RewardDetail = () => {
	const { top } = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const [screenWidth, setScreenWidth] = useState(0);

	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		setScreenWidth(nativeEvent.layout.width);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContentContainer}
				onLayout={handleLayoutChange}
			>
				<Image
					width={screenWidth}
					height={screenWidth}
					source={{ uri: 'https://picsum.photos/300/300' }}
					resizeMode="cover"
				/>

				<View style={styles.upperContainer}>
					<View style={styles.brandContainer}>
						<Image
							width={brandImageSize}
							height={brandImageSize}
							resizeMode="contain"
							source={{ uri: 'https://picsum.photos/48/48' }}
						/>
						<View style={{ flex: 1 }}>
							<Text style={styles.brand}>Baskin Robbins</Text>
							<Text style={styles.rewardName}>
								Baskin Robbins Space Like Bonbon Blast
							</Text>
						</View>
					</View>

					<View style={styles.pointAndDateContainer}>
						<View style={styles.tagContainer}>
							<Text style={styles.tagTitle}>Points</Text>
							<Text style={styles.point}>950,000 GO</Text>
						</View>
						<View style={styles.tagContainer}>
							<Text style={styles.tagTitle}>Expire on</Text>
							<Text style={styles.date}>9 Aug 2024</Text>
						</View>
					</View>
				</View>

				<View style={styles.belowContainer}>
					<Text style={styles.normalText}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi,
						voluptas quibusdam! Quam dolores quas, esse beatae suscipit dolorem
						iure fugiat magni temporibus! Eos cum, cumque ipsum deleniti dolorum
						ab quaerat suscipit repellat veritatis, quas quia. At odit veritatis
						soluta magnam dolores, mollitia voluptas architecto facilis id quae
						veniam! Rerum, non.
					</Text>

					<Text style={[styles.normalText, styles.highlightText]}>
						{'\n'}
						Term & Condition:
					</Text>

					<Text style={styles.normalText}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
						tempore blanditiis quia sit eligendi eaque, explicabo beatae magnam
						consequuntur unde laboriosam facere? Repellat voluptatibus
						laudantium nisi deserunt corporis cumque fugiat doloribus quae, quam
						temporibus aperiam tempora sit quisquam impedit nobis suscipit
						soluta at tenetur ut doloremque ex totam, aliquam modi perferendis.
						Inventore pariatur quod, odit eos dolor suscipit porro animi in hic
						dolore doloremque beatae possimus maiores vel cum fuga ab rem
						molestiae nemo. Eius, vitae! Nisi ratione facilis sapiente dolores
						error architecto accusamus necessitatibus placeat, aperiam culpa
						neque expedita, quae repellat suscipit unde quibusdam earum qui.
						Exercitationem, incidunt aut.
					</Text>
				</View>
			</ScrollView>

			<TouchableOpacity
				style={[styles.backButton, { top: top + 20 }]}
				onPress={goBack}
			>
				<View style={styles.innerBackButton}>
					<LeftArrowIcon width={16} color={defaultTheme.textDark90} />
				</View>
			</TouchableOpacity>

			<View style={styles.redeemButtonWrapper}>
				<TouchableOpacity style={styles.redeemButton}>
					<Text style={styles.redeemText}>Redeem</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default RewardDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		backgroundColor: defaultTheme.bgLight,
	},
	scrollContentContainer: {
		paddingBottom: 120,
	},
	upperContainer: {
		paddingTop: 16,
		paddingBottom: 24,
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: defaultTheme.textDark10,
	},
	brandContainer: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	brand: {
		fontSize: 13,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark60,
	},
	rewardName: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	pointAndDateContainer: {
		marginTop: 16,
		flexDirection: 'row',
		gap: 14,
	},
	tagContainer: {
		flex: 1,
		padding: 12,
		gap: 8,
		borderRadius: 20,
		backgroundColor: defaultTheme.gray10,
	},
	tagTitle: {
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: -0.3,
		color: defaultTheme.textDark80,
	},
	point: {
		lineHeight: 16,
		fontWeight: '700',
		letterSpacing: -0.3,
		color: defaultTheme.cta100,
	},
	date: {
		lineHeight: 16,
		fontWeight: '500',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	belowContainer: {
		marginTop: 24,
	},
	normalText: {
		marginHorizontal: 16,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	highlightText: {
		fontWeight: '700',
	},
	backButton: {
		position: 'absolute',
		left: 16,
	},
	innerBackButton: {
		width: 32,
		height: 32,
		borderRadius: 20,
		backgroundColor: defaultTheme.bgLight,
		alignItems: 'center',
		justifyContent: 'center',
	},
	redeemButtonWrapper: {
		position: 'absolute',
		bottom: 40,
		left: 32,
		right: 32,
		backgroundColor: defaultTheme.bgLight,
		borderRadius: 50,
	},
	redeemButton: {
		paddingVertical: 20,
		borderRadius: 50,
		backgroundColor: defaultTheme.textDark90,
		elevation: 6,
		shadowColor: defaultTheme.textDark100,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 12,
		shadowOpacity: 0.3,
	},
	redeemText: {
		alignSelf: 'center',
		fontSize: 15,
		lineHeight: 18,
		fontWeight: '600',
	},
});
