import { type FC, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QrCode from 'react-native-qrcode-svg';
import { useSnapshot } from 'valtio';

import { getDownloadLinks } from './shared';

import { appState } from '@/state/app';
import { interTight } from '@/utils/style';

export const DesktopInner: FC = () => {
	const { user } = useSnapshot(appState);
	const qrRef = useRef<QrCode>();
	const [activeIndex, setActiveIndex] = useState(0);
	const downloadLinks = useMemo(() => getDownloadLinks(user as never), [user]);
	const activeLink = downloadLinks[activeIndex];

	const onButtonPress = (i: number) => {
		setActiveIndex(i);
		qrRef.current?.setState({ value: activeLink.storeUrl });
	};

	return (
		<View style={styles.container}>
			<View style={styles.qrContainer}>
				<View style={styles.qrInnerContainer}>
					<QrCode value={activeLink.storeUrl} size={200} />
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				{downloadLinks.map((item, i) => {
					const isActive = i === activeIndex;

					return (
						<TouchableOpacity
							key={item.title}
							style={[styles.buttonContainer, isActive && styles.activeButton]}
							onPress={() => onButtonPress(i)}
						>
							<Text style={styles.buttonText}>{item.title}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default DesktopInner;

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
	},
	qrContainer: {
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		paddingVertical: 24,
		borderRadius: 18,
	},
	qrInnerContainer: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	buttonsContainer: {
		marginTop: 24,
		flexDirection: 'row',
		gap: 18,
	},
	buttonContainer: {
		flex: 1,
		height: 48,
		borderRadius: 12,
		backgroundColor: '#f2f2f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeButton: {
		backgroundColor: '#81ddfb',
	},
	buttonText: {
		fontFamily: interTight.style.fontFamily,
		fontSize: 16,
	},
});
