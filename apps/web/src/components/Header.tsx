import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from 'next/image';
import Link from 'next/link';

import BlurBackground from './BlurBackground';
import Button from './Button';

import { signInWithTwitter } from '@/utils/auth';

interface Props {
	style?: ViewStyle;
}

const Header: FC<Props> = ({ style }) => {
	return (
		<View style={[styles.container, style]}>
			<Link href="https:\\aigo.network" target="_blank">
				<TouchableOpacity>
					<Text style={styles.logo}>AiGO</Text>
				</TouchableOpacity>
			</Link>
			<View style={styles.rightContainer}>
				<Link href="">
					<Button>
						<BlurBackground style={styles.socialIcon}>
							<Image
								src="/twitter-ic.svg"
								alt="Twitter or X icon"
								width={22}
								height={20}
							/>
						</BlurBackground>
					</Button>
				</Link>
				<Link href="">
					<Button>
						<BlurBackground style={styles.socialIcon}>
							<Image
								src="/telegram-ic.svg"
								alt="Telegram icon"
								width={22}
								height={19}
							/>
						</BlurBackground>
					</Button>
				</Link>
				{/* <Button> */}
				{/* 	<BlurBackground style={styles.downloadBtn}> */}
				{/* 		<Text style={styles.downloadText}>Download AiGO</Text> */}
				{/* 	</BlurBackground> */}
				{/* </Button> */}
				<View style={styles.separateLine} />
				<Button style={styles.signInBtn} onPress={signInWithTwitter}>
					<Text style={[styles.downloadText, { color: '#000' }]}>Sign In</Text>
				</Button>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontWeight: '500',
		fontSize: 36,
		color: '#d4e0ff',
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	socialIcon: {
		width: 48,
		borderRadius: 12,
	},
	downloadBtn: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 12,
	},
	downloadText: {
		color: '#fff',
		fontSize: 16,
		lineHeight: 24,
	},
	separateLine: {
		borderLeftWidth: 1,
		borderLeftColor: '#fff',
		height: 24,
	},
	signInBtn: {
		paddingHorizontal: 48,
		paddingVertical: 12,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
});
