import { useRef, useState } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Social = () => {
	const containerRef = useRef(null);
	const [imageWidth, setImageWidth] = useState(0);
	const imageHeight = (imageWidth * 424) / 770;
	const imageSize = {
		width: imageWidth,
		height: imageHeight,
	};

	const handlePressFollowTwitter = () => {
		Linking.openURL('https://x.com/AIGO_Network');
	};

	const handlePressJoinTelegram = () => {
		Linking.openURL('https://t.me/aigo_network');
	};

	return (
		<View
			ref={containerRef}
			style={styles.container}
			onLayout={(e) => {
				setImageWidth(e.nativeEvent.layout.width / 2 - 20);
			}}
		>
			<View style={styles.titleContainer}>
				<Image
					style={styles.icon}
					source={require('assets/img/game-controller.png')}
				/>
				<Text style={styles.title}>Stay updated with us</Text>
			</View>

			<View style={styles.imageContainer}>
				<TouchableOpacity onPress={handlePressFollowTwitter}>
					<Image
						style={[styles.socialImage, imageSize]}
						source={require('assets/img/follow-twitter-bg.png')}
					/>
					<Text style={styles.socialText}>Follow Twitter</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handlePressJoinTelegram}>
					<Image
						style={[styles.socialImage, imageSize]}
						source={require('assets/img/join-telegram-bg.png')}
					/>
					<Text style={styles.socialText}>Join Telegram</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Social;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 18,
		paddingBottom: 22,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2,
		gap: 14,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	icon: {
		width: 26,
		height: 26,
	},
	title: {
		color: '#000',
		fontSize: 17,
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	socialImage: {
		width: 40,
		height: 30,
		aspectRatio: 770 / 424,
	},
	socialText: {
		position: 'absolute',
		fontSize: 16,
		top: 14,
		left: 12,
	},
});
