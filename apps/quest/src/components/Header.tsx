import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppIcon from '@aigo/components/icon/AppIcon';
import Image from 'next/image';
import Link from 'next/link';
import { useSnapshot } from 'valtio';

import BlurBackground from './BlurBackground';
import Button from './Button';
import SignInBundle from './SignInBundle';

import { appState } from '@/state/app';

type Props = {
	isMobile?: boolean;
	style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
};

const Header: FC<Props> = ({ style, isMobile }) => {
	const { authUser, isAuthLoading } = useSnapshot(appState);

	return (
		<View style={[styles.container, style]}>
			<View style={[styles.innerContainer, isMobile && styles.mobileInner]}>
				<Link href="https://aigo.network" target="_blank">
					<TouchableOpacity style={styles.logo}>
						<AppIcon width={52} />
						{!isMobile && <Text style={styles.logoTxt}>AiGO</Text>}
					</TouchableOpacity>
				</Link>
				<View
					style={[
						styles.rightContainer,
						isMobile && styles.rightContainerMobile,
					]}
				>
					<Link href="https://x.com/AIGO_network" target="_blank">
						<Button>
							<BlurBackground style={styles.socialIcon}>
								<Image
									src="/x-icon.png"
									alt="Twitter or X icon"
									width={22}
									height={20}
								/>
							</BlurBackground>
						</Button>
					</Link>
					<Link href="https://t.me/aigocommunity" target={'_blank'}>
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
					<SignInBundle
						user={authUser}
						isAuthLoading={isAuthLoading}
						isMobile={isMobile}
					/>
				</View>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {},
	innerContainer: {
		width: '100%',
		maxWidth: 1280,
		marginHorizontal: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 18,
	},
	mobileInner: {
		paddingHorizontal: 12,
	},
	pointsText: {
		fontSize: 20,
		fontWeight: '500',
	},
	pointsContainer: {
		paddingHorizontal: 20,
		borderRadius: 12,
	},
	logo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	logoTxt: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		fontWeight: '500',
		fontSize: 36,
	},
	rightContainer: {
		flexDirection: 'row',
		gap: 12,
	},
	rightContainerMobile: {
		gap: 8,
	},
	socialIcon: {
		flex: 1,
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
		borderLeftWidth: 1.5,
		borderLeftColor: '#fff',
		marginVertical: 10,
	},
});
