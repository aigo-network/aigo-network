import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Telegram from '@aigo/components/icon/Telegram';
import Twitter from '@aigo/components/icon/Twitter';
import Link from 'next/link';

import BlurBackground from '@/components/BlurBackground';
import { clashDisplay } from '@/utils/style';

interface Props {
	isMobile?: boolean;
}

const ComingSoon: FC<Props> = ({ isMobile = false }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.title, isMobile && { fontSize: 60 }]}>
				Coming Soon
			</Text>
			<View style={styles.contentContainer}>
				<Text style={[styles.subTitle, isMobile && { fontSize: 16 }]}>
					Thank you to everyone who participated in Season 1.
				</Text>
				<Text style={[styles.subTitle, isMobile && { fontSize: 16 }]}>
					Season 2 will be launching soon. Stay updated with our latest news in
					the meantime:
				</Text>
			</View>
			<View style={styles.socialGroup}>
				<Link href="https://x.com/AIGO_network" target={'_blank'}>
					<TouchableOpacity style={styles.button}>
						<BlurBackground style={styles.innerButton}>
							<Twitter color="#fff" width={20} />
							<Text style={[styles.buttonText, isMobile && { fontSize: 16 }]}>
								Follow us on Twitter
							</Text>
						</BlurBackground>
					</TouchableOpacity>
				</Link>
				<Link href="https://t.me/aigocommunity" target={'_blank'}>
					<TouchableOpacity style={styles.button}>
						<BlurBackground style={styles.innerButton}>
							<Telegram color="#fff" width={20} />
							<Text style={[styles.buttonText, isMobile && { fontSize: 16 }]}>
								Join our Telegram channel
							</Text>
						</BlurBackground>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
};

export default ComingSoon;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100vh' as never,
		marginHorizontal: 16,
		gap: 24,
	},
	title: {
		color: '#fff',
		fontSize: 100,
		fontWeight: '500',
		fontFamily: clashDisplay.style.fontFamily,
		textAlign: 'center',
	},
	contentContainer: {
		alignSelf: 'center',
		gap: 15,
		maxWidth: 550,
	},
	subTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '300',
		textAlign: 'center',
	},
	socialGroup: {
		gap: 15,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	button: {
		width: 300,
	},
	innerButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		padding: 16,
		borderRadius: 16,
		flex: 1,
	},
	buttonText: {
		fontSize: 18,
	},
});
