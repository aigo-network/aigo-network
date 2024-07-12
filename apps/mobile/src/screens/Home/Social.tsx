import { useRef, useState } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { sharedStyles } from './shared';

export const Social = () => {
	const { content } = useSnapshot(appState);
	const homeContent = content.screens.home;
	const containerRef = useRef(null);
	const [imageWidth, setImageWidth] = useState(0);
	const imageHeight = (imageWidth * 424) / 770;
	const imageSize = {
		width: imageWidth,
		height: imageHeight,
	};

	const handlePressFollowTwitter = () => {
		Linking.openURL('https://x.com/AIGO_Network');
		analytics().logEvent('channel_interaction', { channel: 'twitter' });
	};

	const handlePressJoinTelegram = () => {
		Linking.openURL('https://t.me/aigo_network');
		analytics().logEvent('channel_interaction', { channel: 'telegram' });
	};

	return (
		<View
			ref={containerRef}
			style={sharedStyles.container}
			onLayout={(e) => {
				setImageWidth(e.nativeEvent.layout.width / 2 - 20);
			}}
		>
			<View style={styles.titleContainer}>
				<Image
					style={styles.icon}
					source={require('assets/img/game-controller.png')}
				/>
				<Text style={styles.title}>{homeContent.socialSection.title}</Text>
			</View>

			<View style={styles.imageContainer}>
				<TouchableOpacity onPress={handlePressFollowTwitter}>
					<Image
						style={[styles.socialImage, imageSize]}
						source={require('assets/img/follow-twitter-bg.png')}
					/>
					<Text style={styles.socialText}>
						{homeContent.socialSection.followTwitterButton}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handlePressJoinTelegram}>
					<Image
						style={[styles.socialImage, imageSize]}
						source={require('assets/img/join-telegram-bg.png')}
					/>
					<Text style={styles.socialText}>
						{homeContent.socialSection.joinTelegramButton}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Social;

const styles = StyleSheet.create({
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
